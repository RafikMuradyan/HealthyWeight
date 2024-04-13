import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateFeedbackTable1712138154149 implements MigrationInterface {
    name = 'CreateFeedbackTable1712138154149'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "feedbacks" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "content" text NOT NULL, CONSTRAINT "PK_79affc530fdd838a9f1e0cc30be" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "feedbacks"`);
    }

}
