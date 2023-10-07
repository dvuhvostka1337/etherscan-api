import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { Transaction } from './entities/transaction.entity';
import { EtherscanModule } from './etherscan/etherscan.module';
import { CronModule } from './cron/cron.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT),
            username: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME,
            entities: [Transaction],
            synchronize: true
        }),
        EtherscanModule,
        CronModule
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}
