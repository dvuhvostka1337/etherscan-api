import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { ITransaction } from './interfaces/transaction';

@Injectable()
export class EtherscanService {
    constructor() {}
    private _transport = axios.create({
        baseURL: process.env.ETH_BASE_URL
    });

    getMaxKey = (obj: Record<string, bigint>): string => {
        const abs = (n: number | bigint) => (n < 0n ? -n : n);
        return Object.keys(obj).reduce((a, b) => (abs(obj[a]) > abs(obj[b]) ? a : b));
    };

    async getTransactionsByBlockNumber(blockNumber: number): Promise<ITransaction[]> {
        const transactions = await this._transport.get('', {
            params: {
                module: 'proxy',
                action: 'eth_getBlockByNumber',
                boolean: 'true',
                tag: blockNumber.toString(16),
                apiKey: process.env.ETH_API_KEY
            }
        });
        return transactions.data.result.transactions ?? [];
    }

    async getLastBlockNumber(): Promise<number> {
        const blockNumber = await this._transport.get('', {
            params: {
                module: 'proxy',
                action: 'eth_blockNumber'
            }
        });
        return blockNumber.data.result;
    }

    async getTransactionsByBlockPeriod(period: number, from?: number): Promise<ITransaction[]> {
        const offset = period;
        const startBlockNumber = from ? from + offset : await this.getLastBlockNumber();
        const transactionsArray: Array<ITransaction> = [];

        for (let i = 0; i < period; i++) {
            // Можно тащить здесь сохраненные транзакции из БД, если их нет, то идти в etherscan API, но не уверен, что это хорошая затея делать в цикле.
            // Оставлю как есть
            const txs = await this.getTransactionsByBlockNumber(startBlockNumber - i);
            transactionsArray.push(...txs);
        }
        return transactionsArray;
    }

    async findChangesInTxs(transactionsArray: ITransaction[]) {
        const addrList: Record<string, bigint> = {};

        for (const tx of transactionsArray) {
            if (tx.value != '0x0' && tx.value) {
                if (!addrList.hasOwnProperty(tx.from)) {
                    addrList[tx.from] = BigInt(0);
                    addrList[tx.to] = BigInt(0);
                }
                addrList[tx.from] = BigInt(addrList[tx.from]) - BigInt(parseInt(tx.value, 16));
                addrList[tx.to] = BigInt(addrList[tx.from]) - BigInt(parseInt(tx.value, 16));
            }
        }
        return addrList;
    }

    async getMostSupplyAddress(blockPeriod: number): Promise<string> {
        const transactionArray = await this.getTransactionsByBlockPeriod(blockPeriod);
        const addressList = await this.findChangesInTxs(transactionArray);
        const maxValueAddress = this.getMaxKey(addressList);
        return maxValueAddress;
    }
}
