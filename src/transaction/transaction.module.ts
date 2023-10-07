import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from '../entities/transaction.entity';
import { TransactionService } from './transaction.service';

@Module({
    providers: [TransactionService],
    imports: [TypeOrmModule.forFeature([Transaction])],
    exports: [TypeOrmModule, TransactionService]
})
export class TransactionModule {}
