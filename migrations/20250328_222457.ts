import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "articles_blocks_blog_content" CASCADE;
  DROP TABLE "articles_blocks_code" CASCADE;
  DROP TABLE "articles_blocks_media_block" CASCADE;
  DROP TABLE "_articles_v_blocks_blog_content" CASCADE;
  DROP TABLE "_articles_v_blocks_code" CASCADE;
  DROP TABLE "_articles_v_blocks_media_block" CASCADE;
  ALTER TABLE "articles" ADD COLUMN "content" jsonb;
  ALTER TABLE "_articles_v" ADD COLUMN "version_content" jsonb;
  DROP TYPE "public"."enum_articles_blocks_code_language";
  DROP TYPE "public"."enum__articles_v_blocks_code_language";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_articles_blocks_code_language" AS ENUM('none', 'c', 'js', 'ts', 'rust');
  CREATE TYPE "public"."enum__articles_v_blocks_code_language" AS ENUM('none', 'c', 'js', 'ts', 'rust');
  CREATE TABLE IF NOT EXISTS "articles_blocks_blog_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"rich_text" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "articles_blocks_code" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"language" "enum_articles_blocks_code_language" DEFAULT 'none',
  	"code" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "articles_blocks_media_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"caption" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_articles_v_blocks_blog_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"rich_text" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_articles_v_blocks_code" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"language" "enum__articles_v_blocks_code_language" DEFAULT 'none',
  	"code" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_articles_v_blocks_media_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"caption" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  DO $$ BEGIN
   ALTER TABLE "articles_blocks_blog_content" ADD CONSTRAINT "articles_blocks_blog_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "articles_blocks_code" ADD CONSTRAINT "articles_blocks_code_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "articles_blocks_media_block" ADD CONSTRAINT "articles_blocks_media_block_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "articles_blocks_media_block" ADD CONSTRAINT "articles_blocks_media_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_articles_v_blocks_blog_content" ADD CONSTRAINT "_articles_v_blocks_blog_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_articles_v_blocks_code" ADD CONSTRAINT "_articles_v_blocks_code_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_articles_v_blocks_media_block" ADD CONSTRAINT "_articles_v_blocks_media_block_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_articles_v_blocks_media_block" ADD CONSTRAINT "_articles_v_blocks_media_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "articles_blocks_blog_content_order_idx" ON "articles_blocks_blog_content" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "articles_blocks_blog_content_parent_id_idx" ON "articles_blocks_blog_content" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "articles_blocks_blog_content_path_idx" ON "articles_blocks_blog_content" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "articles_blocks_code_order_idx" ON "articles_blocks_code" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "articles_blocks_code_parent_id_idx" ON "articles_blocks_code" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "articles_blocks_code_path_idx" ON "articles_blocks_code" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "articles_blocks_media_block_order_idx" ON "articles_blocks_media_block" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "articles_blocks_media_block_parent_id_idx" ON "articles_blocks_media_block" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "articles_blocks_media_block_path_idx" ON "articles_blocks_media_block" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "articles_blocks_media_block_media_idx" ON "articles_blocks_media_block" USING btree ("media_id");
  CREATE INDEX IF NOT EXISTS "_articles_v_blocks_blog_content_order_idx" ON "_articles_v_blocks_blog_content" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_articles_v_blocks_blog_content_parent_id_idx" ON "_articles_v_blocks_blog_content" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_articles_v_blocks_blog_content_path_idx" ON "_articles_v_blocks_blog_content" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_articles_v_blocks_code_order_idx" ON "_articles_v_blocks_code" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_articles_v_blocks_code_parent_id_idx" ON "_articles_v_blocks_code" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_articles_v_blocks_code_path_idx" ON "_articles_v_blocks_code" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_articles_v_blocks_media_block_order_idx" ON "_articles_v_blocks_media_block" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_articles_v_blocks_media_block_parent_id_idx" ON "_articles_v_blocks_media_block" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_articles_v_blocks_media_block_path_idx" ON "_articles_v_blocks_media_block" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_articles_v_blocks_media_block_media_idx" ON "_articles_v_blocks_media_block" USING btree ("media_id");
  ALTER TABLE "articles" DROP COLUMN IF EXISTS "content";
  ALTER TABLE "_articles_v" DROP COLUMN IF EXISTS "version_content";`)
}
