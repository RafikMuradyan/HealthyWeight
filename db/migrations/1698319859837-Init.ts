import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1698319859837 implements MigrationInterface {
    name = 'Init1698319859837'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "app_ratings" ("id" SERIAL NOT NULL, "rating" smallint NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, CONSTRAINT "PK_bdc715393f09fb7ba14793052c2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."user_profile_gender_enum" AS ENUM('Male', 'Female')`);
        await queryRunner.query(`CREATE TYPE "public"."user_profile_weightstatus_enum" AS ENUM('Normal', 'Overweight', 'Underweight')`);
        await queryRunner.query(`CREATE TABLE "user_profile" ("id" SERIAL NOT NULL, "age" smallint NOT NULL, "height" smallint NOT NULL, "gender" "public"."user_profile_gender_enum" NOT NULL, "weightStatus" "public"."user_profile_weightstatus_enum", "createdAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, CONSTRAINT "PK_f44d0cd18cfd80b0fed7806c3b7" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user_profile"`);
        await queryRunner.query(`DROP TYPE "public"."user_profile_weightstatus_enum"`);
        await queryRunner.query(`DROP TYPE "public"."user_profile_gender_enum"`);
        await queryRunner.query(`DROP TABLE "app_ratings"`);
    }

}
