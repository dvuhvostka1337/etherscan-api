import { IAccessList } from 'src/etherscan/interfaces/transaction';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Transaction {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    blockHash: string;

    @Column({ nullable: true })
    blockNumber: number;

    @Column({ nullable: true })
    from: string;

    @Column({ nullable: true })
    gas: string;

    @Column({ nullable: true })
    gasPrice: string;

    @Column({ nullable: true })
    maxFeePerGas: string;

    @Column({ nullable: true })
    maxPriorityFeePerGas: string;

    @Column({ nullable: true })
    hash: string;

    @Column({ nullable: true })
    input: string;

    @Column({ nullable: true })
    nonce: string;

    @Column({ nullable: true })
    to: string;

    @Column({ nullable: true })
    transactionIndex: string;

    @Column({ nullable: true })
    value: string;

    @Column({ nullable: true })
    type: string;

    @Column({ type: 'json', nullable: true })
    accessList: IAccessList;

    @Column({ nullable: true })
    chainId: string;

    @Column({ nullable: true })
    v: string;

    @Column({ nullable: true })
    r: string;

    @Column({ nullable: true })
    s: string;
}
