import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from 'src/entities/transaction.entity';
import { ITransaction } from 'src/etherscan/interfaces/transaction';
import { Repository } from 'typeorm';

@Injectable()
export class TransactionService {
    constructor(
        @InjectRepository(Transaction)
        private transactionRepository: Repository<Transaction>
    ) {}

    async findAll(): Promise<Transaction[]> {
        return this.transactionRepository.find();
    }

    async findAllByBlockNumber(blockNumber: number): Promise<Transaction[]> {
        return this.transactionRepository.find({ where: { blockNumber } });
    }

    async findOne(id: number): Promise<Transaction | null> {
        return this.transactionRepository.findOneBy({ id });
    }

    async addTransaction(transaction: ITransaction): Promise<Transaction> {
        const tx: Transaction = this.transactionRepository.create({
            ...transaction,
            blockNumber: parseInt(transaction.blockNumber, 16)
        });
        return this.transactionRepository.save(tx);
    }

    async addTransactions(transacions: ITransaction[]): Promise<Transaction[]> {
        const txs: Transaction[] = transacions.map((transaction) =>
            this.transactionRepository.create({ ...transaction, blockNumber: parseInt(transaction.blockNumber, 16) })
        );
        return this.transactionRepository.save(txs, { chunk: 1000 });
    }

    async remove(id: number): Promise<void> {
        await this.transactionRepository.delete(id);
    }

    async getMaximumBlockNumber(): Promise<number> {
        return this.transactionRepository.maximum('blockNumber');
    }
}
