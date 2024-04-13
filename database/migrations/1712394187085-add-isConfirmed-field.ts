import { MigrationInterface, QueryRunner } from "typeorm";

export class AddIsConfirmedField1712394187085 implements MigrationInterface {
    name = 'AddIsConfirmedField1712394187085'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "feedbacks" ADD "isConfirmed" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "feedbacks" DROP COLUMN "isConfirmed"`);
    }

}
