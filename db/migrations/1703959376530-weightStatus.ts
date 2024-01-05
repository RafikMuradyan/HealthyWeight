import { MigrationInterface, QueryRunner } from "typeorm";

export class WeightStatus1703959376530 implements MigrationInterface {
    name = 'WeightStatus1703959376530'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."user_profile_weightstatus_enum" RENAME TO "user_profile_weightstatus_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."user_profile_weightstatus_enum" AS ENUM('normal', 'overweight', 'underweight')`);
        await queryRunner.query(`ALTER TABLE "user_profile" ALTER COLUMN "weightStatus" TYPE "public"."user_profile_weightstatus_enum" USING "weightStatus"::"text"::"public"."user_profile_weightstatus_enum"`);
        await queryRunner.query(`DROP TYPE "public"."user_profile_weightstatus_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."user_profile_weightstatus_enum_old" AS ENUM('Normal', 'Overweight', 'Underweight')`);
        await queryRunner.query(`ALTER TABLE "user_profile" ALTER COLUMN "weightStatus" TYPE "public"."user_profile_weightstatus_enum_old" USING "weightStatus"::"text"::"public"."user_profile_weightstatus_enum_old"`);
        await queryRunner.query(`DROP TYPE "public"."user_profile_weightstatus_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."user_profile_weightstatus_enum_old" RENAME TO "user_profile_weightstatus_enum"`);
    }

}
