import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1752328500095 implements MigrationInterface {
  name = 'Migrations1752328500095';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TYPE "public"."comments_type_enum" AS ENUM('question', 'answer')`);
    await queryRunner.query(
      `CREATE TABLE "comments" ("id" SERIAL NOT NULL, "body" text NOT NULL, "type" "public"."comments_type_enum", "questionId" integer NOT NULL, "userId" integer NOT NULL, "answerId" integer, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_8bf68bc960f2b69e818bdb90dcb" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`CREATE TYPE "public"."answer_votes_votetype_enum" AS ENUM('up', 'down')`);
    await queryRunner.query(
      `CREATE TABLE "answer_votes" ("id" SERIAL NOT NULL, "userId" integer NOT NULL, "answerId" integer NOT NULL, "voteType" "public"."answer_votes_votetype_enum" NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_7c0d88718e56e91ce473a76773e" UNIQUE ("userId", "answerId"), CONSTRAINT "PK_767f6bc508e4f2d6d08d65beb31" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "answers" ("id" SERIAL NOT NULL, "body" text NOT NULL, "isAccepted" boolean NOT NULL DEFAULT false, "score" integer NOT NULL DEFAULT '0', "upvotes" integer NOT NULL DEFAULT '0', "downvotes" integer NOT NULL DEFAULT '0', "questionId" integer NOT NULL, "userId" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_9c32cec6c71e06da0254f2226c6" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`CREATE INDEX "IDX_1ed39bb1a2088cea839e24e9ed" ON "answers" ("userId", "createdAt") `);
    await queryRunner.query(`CREATE INDEX "IDX_1595fed7e85d2cb6f70b3ba941" ON "answers" ("questionId", "createdAt") `);
    await queryRunner.query(`CREATE TYPE "public"."notifications_type_enum" AS ENUM('new_answer', 'new_comment', 'answer_accepted', 'vote_received', 'mention', 'system')`);
    await queryRunner.query(
      `CREATE TABLE "notifications" ("id" SERIAL NOT NULL, "userId" integer NOT NULL, "type" "public"."notifications_type_enum" NOT NULL, "title" text NOT NULL, "message" text NOT NULL, "data" json, "isRead" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_6a72c3c0f683f6462415e653c3a" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "comments" ADD CONSTRAINT "FK_7e8d7c49f218ebb14314fdb3749" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "comments" ADD CONSTRAINT "FK_8db2a234357898ee18a16f5d409" FOREIGN KEY ("questionId") REFERENCES "question"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "comments" ADD CONSTRAINT "FK_192a303f8641f3eef18568e2f45" FOREIGN KEY ("answerId") REFERENCES "answers"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "answer_votes" ADD CONSTRAINT "FK_3a9e5a77d85cc2daed4656a6ded" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "answer_votes" ADD CONSTRAINT "FK_d000391d3f93664a25350b85d42" FOREIGN KEY ("answerId") REFERENCES "answers"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "answers" ADD CONSTRAINT "FK_1bd66b7e0599333e61d2e3e1678" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "answers" ADD CONSTRAINT "FK_c38697a57844f52584abdb878d7" FOREIGN KEY ("questionId") REFERENCES "question"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "notifications" ADD CONSTRAINT "FK_692a909ee0fa9383e7859f9b406" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "notifications" DROP CONSTRAINT "FK_692a909ee0fa9383e7859f9b406"`);
    await queryRunner.query(`ALTER TABLE "answers" DROP CONSTRAINT "FK_c38697a57844f52584abdb878d7"`);
    await queryRunner.query(`ALTER TABLE "answers" DROP CONSTRAINT "FK_1bd66b7e0599333e61d2e3e1678"`);
    await queryRunner.query(`ALTER TABLE "answer_votes" DROP CONSTRAINT "FK_d000391d3f93664a25350b85d42"`);
    await queryRunner.query(`ALTER TABLE "answer_votes" DROP CONSTRAINT "FK_3a9e5a77d85cc2daed4656a6ded"`);
    await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_192a303f8641f3eef18568e2f45"`);
    await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_8db2a234357898ee18a16f5d409"`);
    await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_7e8d7c49f218ebb14314fdb3749"`);
    await queryRunner.query(`DROP TABLE "notifications"`);
    await queryRunner.query(`DROP TYPE "public"."notifications_type_enum"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_1595fed7e85d2cb6f70b3ba941"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_1ed39bb1a2088cea839e24e9ed"`);
    await queryRunner.query(`DROP TABLE "answers"`);
    await queryRunner.query(`DROP TABLE "answer_votes"`);
    await queryRunner.query(`DROP TYPE "public"."answer_votes_votetype_enum"`);
    await queryRunner.query(`DROP TABLE "comments"`);
    await queryRunner.query(`DROP TYPE "public"."comments_type_enum"`);
  }
}
