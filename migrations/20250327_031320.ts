import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_articles_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__articles_v_blocks_code_language" AS ENUM('none', 'c', 'js', 'ts', 'rust');
  CREATE TYPE "public"."enum__articles_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_payload_jobs_log_task_slug" AS ENUM('inline', 'schedulePublish');
  CREATE TYPE "public"."enum_payload_jobs_log_state" AS ENUM('failed', 'succeeded');
  CREATE TYPE "public"."enum_payload_jobs_task_slug" AS ENUM('inline', 'schedulePublish');
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
  
  CREATE TABLE IF NOT EXISTS "_articles_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_published_at" timestamp(3) with time zone,
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_slug_lock" boolean DEFAULT true,
  	"version_description" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__articles_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE IF NOT EXISTS "payload_jobs_log" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"executed_at" timestamp(3) with time zone NOT NULL,
  	"completed_at" timestamp(3) with time zone NOT NULL,
  	"task_slug" "enum_payload_jobs_log_task_slug" NOT NULL,
  	"task_i_d" varchar NOT NULL,
  	"input" jsonb,
  	"output" jsonb,
  	"state" "enum_payload_jobs_log_state" NOT NULL,
  	"error" jsonb
  );
  
  CREATE TABLE IF NOT EXISTS "payload_jobs" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"input" jsonb,
  	"completed_at" timestamp(3) with time zone,
  	"total_tried" numeric DEFAULT 0,
  	"has_error" boolean DEFAULT false,
  	"error" jsonb,
  	"task_slug" "enum_payload_jobs_task_slug",
  	"queue" varchar DEFAULT 'default',
  	"wait_until" timestamp(3) with time zone,
  	"processing" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "articles_blocks_blog_content" ALTER COLUMN "rich_text" DROP NOT NULL;
  ALTER TABLE "articles_blocks_code" ALTER COLUMN "code" DROP NOT NULL;
  ALTER TABLE "articles_blocks_media_block" ALTER COLUMN "media_id" DROP NOT NULL;
  ALTER TABLE "articles" ALTER COLUMN "published_at" DROP NOT NULL;
  ALTER TABLE "articles" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "articles" ALTER COLUMN "description" DROP NOT NULL;
  ALTER TABLE "articles" ADD COLUMN "_status" "enum_articles_status" DEFAULT 'draft';
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "payload_jobs_id" integer;
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
  
  DO $$ BEGIN
   ALTER TABLE "_articles_v" ADD CONSTRAINT "_articles_v_parent_id_articles_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."articles"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_jobs_log" ADD CONSTRAINT "payload_jobs_log_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."payload_jobs"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
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
  CREATE INDEX IF NOT EXISTS "_articles_v_parent_idx" ON "_articles_v" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "_articles_v_version_version_slug_idx" ON "_articles_v" USING btree ("version_slug");
  CREATE INDEX IF NOT EXISTS "_articles_v_version_version_updated_at_idx" ON "_articles_v" USING btree ("version_updated_at");
  CREATE INDEX IF NOT EXISTS "_articles_v_version_version_created_at_idx" ON "_articles_v" USING btree ("version_created_at");
  CREATE INDEX IF NOT EXISTS "_articles_v_version_version__status_idx" ON "_articles_v" USING btree ("version__status");
  CREATE INDEX IF NOT EXISTS "_articles_v_created_at_idx" ON "_articles_v" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "_articles_v_updated_at_idx" ON "_articles_v" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "_articles_v_latest_idx" ON "_articles_v" USING btree ("latest");
  CREATE INDEX IF NOT EXISTS "_articles_v_autosave_idx" ON "_articles_v" USING btree ("autosave");
  CREATE INDEX IF NOT EXISTS "payload_jobs_log_order_idx" ON "payload_jobs_log" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "payload_jobs_log_parent_id_idx" ON "payload_jobs_log" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "payload_jobs_completed_at_idx" ON "payload_jobs" USING btree ("completed_at");
  CREATE INDEX IF NOT EXISTS "payload_jobs_total_tried_idx" ON "payload_jobs" USING btree ("total_tried");
  CREATE INDEX IF NOT EXISTS "payload_jobs_has_error_idx" ON "payload_jobs" USING btree ("has_error");
  CREATE INDEX IF NOT EXISTS "payload_jobs_task_slug_idx" ON "payload_jobs" USING btree ("task_slug");
  CREATE INDEX IF NOT EXISTS "payload_jobs_queue_idx" ON "payload_jobs" USING btree ("queue");
  CREATE INDEX IF NOT EXISTS "payload_jobs_wait_until_idx" ON "payload_jobs" USING btree ("wait_until");
  CREATE INDEX IF NOT EXISTS "payload_jobs_processing_idx" ON "payload_jobs" USING btree ("processing");
  CREATE INDEX IF NOT EXISTS "payload_jobs_updated_at_idx" ON "payload_jobs" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "payload_jobs_created_at_idx" ON "payload_jobs" USING btree ("created_at");
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_payload_jobs_fk" FOREIGN KEY ("payload_jobs_id") REFERENCES "public"."payload_jobs"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "articles__status_idx" ON "articles" USING btree ("_status");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_payload_jobs_id_idx" ON "payload_locked_documents_rels" USING btree ("payload_jobs_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "_articles_v_blocks_blog_content" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_articles_v_blocks_code" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_articles_v_blocks_media_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_articles_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload_jobs_log" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload_jobs" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "_articles_v_blocks_blog_content" CASCADE;
  DROP TABLE "_articles_v_blocks_code" CASCADE;
  DROP TABLE "_articles_v_blocks_media_block" CASCADE;
  DROP TABLE "_articles_v" CASCADE;
  DROP TABLE "payload_jobs_log" CASCADE;
  DROP TABLE "payload_jobs" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_payload_jobs_fk";
  
  DROP INDEX IF EXISTS "articles__status_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_payload_jobs_id_idx";
  ALTER TABLE "articles_blocks_blog_content" ALTER COLUMN "rich_text" SET NOT NULL;
  ALTER TABLE "articles_blocks_code" ALTER COLUMN "code" SET NOT NULL;
  ALTER TABLE "articles_blocks_media_block" ALTER COLUMN "media_id" SET NOT NULL;
  ALTER TABLE "articles" ALTER COLUMN "published_at" SET NOT NULL;
  ALTER TABLE "articles" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "articles" ALTER COLUMN "description" SET NOT NULL;
  ALTER TABLE "articles" DROP COLUMN IF EXISTS "_status";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "payload_jobs_id";
  DROP TYPE "public"."enum_articles_status";
  DROP TYPE "public"."enum__articles_v_blocks_code_language";
  DROP TYPE "public"."enum__articles_v_version_status";
  DROP TYPE "public"."enum_payload_jobs_log_task_slug";
  DROP TYPE "public"."enum_payload_jobs_log_state";
  DROP TYPE "public"."enum_payload_jobs_task_slug";`)
}
