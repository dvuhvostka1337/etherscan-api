import { Module, OnModuleInit } from '@nestjs/common';
import { CronService } from './cron.service';
import { EtherscanModule } from 'src/etherscan/etherscan.module';
import { TransactionModule } from 'src/transaction/transaction.module';

@Module({
    providers: [CronService],
    imports: [EtherscanModule, TransactionModule]
})
export class CronModule implements OnModuleInit {
    constructor(private cronService: CronService) {}
    onModuleInit() {
        this.cronService.saveTransactionsInfoJob().start();
    }
}
