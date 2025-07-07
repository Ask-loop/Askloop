import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1751858605295 implements MigrationInterface {
  name = 'Migrations1751858605295';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "account" ("id" SERIAL NOT NULL, "provider" character varying NOT NULL, "providerAccountId" character varying NOT NULL, "userId" integer, CONSTRAINT "PK_54115ee388cdb6d86bb4bf5b2ea" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "users_stats" ("id" SERIAL NOT NULL, "questionsCount" integer NOT NULL DEFAULT '0', "tagsCount" integer NOT NULL DEFAULT '0', "answersCount" integer NOT NULL DEFAULT '0', "commentsCount" integer NOT NULL DEFAULT '0', "votesCount" integer NOT NULL DEFAULT '0', "reputation" integer NOT NULL DEFAULT '0', "badgeGold" integer NOT NULL DEFAULT '0', "badgeSilver" integer NOT NULL DEFAULT '0', "badgeBronze" integer NOT NULL DEFAULT '0', "lastActiveAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "REL_3d6cc217af2451426c44a30e67" UNIQUE ("userId"), CONSTRAINT "PK_44924448d5896c2364a4c6ddf75" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."activity_type_enum" AS ENUM('question', 'answer', 'comment', 'vote', 'edit', 'delete', 'accept', 'tag', 'follow', 'bookmark', 'share', 'report', 'badge', 'login', 'registration')`,
    );
    await queryRunner.query(
      `CREATE TABLE "activity" ("id" SERIAL NOT NULL, "type" "public"."activity_type_enum" NOT NULL, "metadata" jsonb, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "PK_24625a1d6b1b089c8ae206fe467" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`CREATE TYPE "public"."user_provider_enum" AS ENUM('google', 'github', 'email')`);
    await queryRunner.query(`CREATE TYPE "public"."user_role_enum" AS ENUM('user', 'admin')`);
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "password" character varying, "emailVerified" boolean NOT NULL DEFAULT false, "provider" "public"."user_provider_enum" NOT NULL DEFAULT 'email', "providerId" character varying, "picture" character varying, "firstName" character varying, "lastName" character varying, "about" character varying, "role" "public"."user_role_enum" NOT NULL DEFAULT 'user', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "statsId" integer, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "REL_79bb3ba7b87fbfdf3772c96fd8" UNIQUE ("statsId"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "question" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "slug" character varying NOT NULL, "body" text NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "UQ_d9d2b5a007854ecda23c6cbb8ac" UNIQUE ("slug"), CONSTRAINT "PK_21e5786aa0ea704ae185a79b2d5" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "tag" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying, "usageCount" integer NOT NULL DEFAULT '0', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "UQ_6a9775008add570dc3e5a0bab7b" UNIQUE ("name"), CONSTRAINT "PK_8e4052373c579afc1471f526760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "question_tags_tag" ("questionId" integer NOT NULL, "tagId" integer NOT NULL, CONSTRAINT "PK_91ee6aab8dabacfdc162a45e5d4" PRIMARY KEY ("questionId", "tagId"))`,
    );
    await queryRunner.query(`CREATE INDEX "IDX_fa1cf45c0ee075fd02b0009a0d" ON "question_tags_tag" ("questionId") `);
    await queryRunner.query(`CREATE INDEX "IDX_c92b89d6b96fe844dce95d4e4b" ON "question_tags_tag" ("tagId") `);
    await queryRunner.query(
      `ALTER TABLE "account" ADD CONSTRAINT "FK_60328bf27019ff5498c4b977421" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_stats" ADD CONSTRAINT "FK_3d6cc217af2451426c44a30e678" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "activity" ADD CONSTRAINT "FK_3571467bcbe021f66e2bdce96ea" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_79bb3ba7b87fbfdf3772c96fd87" FOREIGN KEY ("statsId") REFERENCES "users_stats"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "question" ADD CONSTRAINT "FK_80f29cc01d0bd1644e389cc13be" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "tag" ADD CONSTRAINT "FK_d0dc39ff83e384b4a097f47d3f5" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "question_tags_tag" ADD CONSTRAINT "FK_fa1cf45c0ee075fd02b0009a0d4" FOREIGN KEY ("questionId") REFERENCES "question"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "question_tags_tag" ADD CONSTRAINT "FK_c92b89d6b96fe844dce95d4e4bd" FOREIGN KEY ("tagId") REFERENCES "tag"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "question_tags_tag" DROP CONSTRAINT "FK_c92b89d6b96fe844dce95d4e4bd"`);
    await queryRunner.query(`ALTER TABLE "question_tags_tag" DROP CONSTRAINT "FK_fa1cf45c0ee075fd02b0009a0d4"`);
    await queryRunner.query(`ALTER TABLE "tag" DROP CONSTRAINT "FK_d0dc39ff83e384b4a097f47d3f5"`);
    await queryRunner.query(`ALTER TABLE "question" DROP CONSTRAINT "FK_80f29cc01d0bd1644e389cc13be"`);
    await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_79bb3ba7b87fbfdf3772c96fd87"`);
    await queryRunner.query(`ALTER TABLE "activity" DROP CONSTRAINT "FK_3571467bcbe021f66e2bdce96ea"`);
    await queryRunner.query(`ALTER TABLE "users_stats" DROP CONSTRAINT "FK_3d6cc217af2451426c44a30e678"`);
    await queryRunner.query(`ALTER TABLE "account" DROP CONSTRAINT "FK_60328bf27019ff5498c4b977421"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_c92b89d6b96fe844dce95d4e4b"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_fa1cf45c0ee075fd02b0009a0d"`);
    await queryRunner.query(`DROP TABLE "question_tags_tag"`);
    await queryRunner.query(`DROP TABLE "tag"`);
    await queryRunner.query(`DROP TABLE "question"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TYPE "public"."user_role_enum"`);
    await queryRunner.query(`DROP TYPE "public"."user_provider_enum"`);
    await queryRunner.query(`DROP TABLE "activity"`);
    await queryRunner.query(`DROP TYPE "public"."activity_type_enum"`);
    await queryRunner.query(`DROP TABLE "users_stats"`);
    await queryRunner.query(`DROP TABLE "account"`);
  }
}
