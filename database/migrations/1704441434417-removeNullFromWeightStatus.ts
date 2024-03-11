import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveNullFromWeightStatus1704441434417 implements MigrationInterface {
    name = 'RemoveNullFromWeightStatus1704441434417'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_profile" ALTER COLUMN "weightStatus" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_profile" ALTER COLUMN "weightStatus" DROP NOT NULL`);
    }

}
