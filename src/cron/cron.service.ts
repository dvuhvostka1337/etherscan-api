import { Injectable } from '@nestjs/common';
import { TransactionService } from 'src/transaction/transaction.service';
import { CronJob } from 'cron';
import { EtherscanService } from 'src/etherscan/etherscan.service';

@Injectable()
export class CronService {
    constructor(
        private transactionService: TransactionService,
        private etherscanService: EtherscanService
    ) {}
    blockOffset = 0;
    startBlock = Number(process.env.ETH_START_BLOCK);

    async saveTransactionsInfo() {
        console.log('started cron!');
        console.log('#StartBlock: ', this.startBlock);
        console.log('#blockOffset: ', this.blockOffset);
        let startFrom: number;
        const maxSavedBlockNumber = await this.transactionService.getMaximumBlockNumber();
        if (maxSavedBlockNumber) {
            switch (true) {
                case maxSavedBlockNumber < this.startBlock:
                    startFrom = this.startBlock;
                    break;
                case maxSavedBlockNumber <= this.blockOffset:
                    startFrom = this.blockOffset;
                    break;
                default:
                    startFrom = this.startBlock;
                    break;
            }
        } else {
            startFrom = this.blockOffset ? this.blockOffset : this.startBlock;
        }
        this.blockOffset = startFrom + 100;
        const transactionsArray = await this.etherscanService.getTransactionsByBlockPeriod(100, startFrom);
        const result = await this.transactionService.addTransactions(transactionsArray);
        console.log('saved!');
        return result;
    }

    saveTransactionsInfoJob() {
        return new CronJob('*/60 * * * * *', () => {
            this.saveTransactionsInfo();
        });
    }
}
