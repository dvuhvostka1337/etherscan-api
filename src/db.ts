import { ConfigModule } from '@nestjs/config';
import { Transaction } from './entities/transaction.entity';
import { DataSource } from 'typeorm';
import { Test1696700521552 } from './migrations/1696700521552-test';
ConfigModule.forRoot();

export default new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    entities: [Transaction],
    synchronize: true,
    migrations: [Test1696700521552]
});
