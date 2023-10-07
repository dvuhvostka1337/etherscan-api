import { MigrationInterface, QueryRunner } from "typeorm";

export class Test1696700521552 implements MigrationInterface {
    name = 'Test1696700521552'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "transaction" ("id" SERIAL NOT NULL, "blockHash" character varying, "blockNumber" integer, "from" character varying, "gas" character varying, "gasPrice" character varying, "maxFeePerGas" character varying, "maxPriorityFeePerGas" character varying, "hash" character varying, "input" character varying, "nonce" character varying, "to" character varying, "transactionIndex" character varying, "value" character varying, "type" character varying, "accessList" json, "chainId" character varying, "v" character varying, "r" character varying, "s" character varying, CONSTRAINT "PK_89eadb93a89810556e1cbcd6ab9" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "transaction"`);
    }

}
