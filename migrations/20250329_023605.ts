import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_talks_lists_sections_type" AS ENUM('conference', 'podcast', 'meetup');
  CREATE TYPE "public"."enum_pages_blocks_talks_lists_sections_sort" AS ENUM('publishedAt', '-publishedAt');
  CREATE TYPE "public"."enum__pages_v_blocks_talks_lists_sections_type" AS ENUM('conference', 'podcast', 'meetup');
  CREATE TYPE "public"."enum__pages_v_blocks_talks_lists_sections_sort" AS ENUM('publishedAt', '-publishedAt');
  CREATE TYPE "public"."enum_talks_type" AS ENUM('conference', 'podcast', 'meetup');
  CREATE TYPE "public"."enum_talks_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__talks_v_version_type" AS ENUM('conference', 'podcast', 'meetup');
  CREATE TYPE "public"."enum__talks_v_version_status" AS ENUM('draft', 'published');
  CREATE TABLE IF NOT EXISTS "pages_blocks_talks_lists_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"type" "enum_pages_blocks_talks_lists_sections_type",
  	"limit" numeric,
  	"sort" "enum_pages_blocks_talks_lists_sections_sort"
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_talks_lists" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_talks_lists_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"type" "enum__pages_v_blocks_talks_lists_sections_type",
  	"limit" numeric,
  	"sort" "enum__pages_v_blocks_talks_lists_sections_sort",
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_talks_lists" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "talks" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"published_at" timestamp(3) with time zone,
  	"name" varchar,
  	"slug" varchar,
  	"slug_lock" boolean DEFAULT true,
  	"description" varchar,
  	"type" "enum_talks_type",
  	"event" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_talks_status" DEFAULT 'draft'
  );
  
  CREATE TABLE IF NOT EXISTS "_talks_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_published_at" timestamp(3) with time zone,
  	"version_name" varchar,
  	"version_slug" varchar,
  	"version_slug_lock" boolean DEFAULT true,
  	"version_description" varchar,
  	"version_type" "enum__talks_v_version_type",
  	"version_event" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__talks_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "talks_id" integer;
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_talks_lists_sections" ADD CONSTRAINT "pages_blocks_talks_lists_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_talks_lists"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_talks_lists" ADD CONSTRAINT "pages_blocks_talks_lists_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_talks_lists_sections" ADD CONSTRAINT "_pages_v_blocks_talks_lists_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_talks_lists"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_talks_lists" ADD CONSTRAINT "_pages_v_blocks_talks_lists_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_talks_v" ADD CONSTRAINT "_talks_v_parent_id_talks_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."talks"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "pages_blocks_talks_lists_sections_order_idx" ON "pages_blocks_talks_lists_sections" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_talks_lists_sections_parent_id_idx" ON "pages_blocks_talks_lists_sections" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_talks_lists_order_idx" ON "pages_blocks_talks_lists" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_talks_lists_parent_id_idx" ON "pages_blocks_talks_lists" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_talks_lists_path_idx" ON "pages_blocks_talks_lists" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_talks_lists_sections_order_idx" ON "_pages_v_blocks_talks_lists_sections" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_talks_lists_sections_parent_id_idx" ON "_pages_v_blocks_talks_lists_sections" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_talks_lists_order_idx" ON "_pages_v_blocks_talks_lists" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_talks_lists_parent_id_idx" ON "_pages_v_blocks_talks_lists" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_talks_lists_path_idx" ON "_pages_v_blocks_talks_lists" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "talks_slug_idx" ON "talks" USING btree ("slug");
  CREATE INDEX IF NOT EXISTS "talks_updated_at_idx" ON "talks" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "talks_created_at_idx" ON "talks" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "talks__status_idx" ON "talks" USING btree ("_status");
  CREATE INDEX IF NOT EXISTS "_talks_v_parent_idx" ON "_talks_v" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "_talks_v_version_version_slug_idx" ON "_talks_v" USING btree ("version_slug");
  CREATE INDEX IF NOT EXISTS "_talks_v_version_version_updated_at_idx" ON "_talks_v" USING btree ("version_updated_at");
  CREATE INDEX IF NOT EXISTS "_talks_v_version_version_created_at_idx" ON "_talks_v" USING btree ("version_created_at");
  CREATE INDEX IF NOT EXISTS "_talks_v_version_version__status_idx" ON "_talks_v" USING btree ("version__status");
  CREATE INDEX IF NOT EXISTS "_talks_v_created_at_idx" ON "_talks_v" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "_talks_v_updated_at_idx" ON "_talks_v" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "_talks_v_latest_idx" ON "_talks_v" USING btree ("latest");
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_talks_fk" FOREIGN KEY ("talks_id") REFERENCES "public"."talks"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_talks_id_idx" ON "payload_locked_documents_rels" USING btree ("talks_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_talks_lists_sections" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_talks_lists" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_talks_lists_sections" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_talks_lists" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "talks" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_talks_v" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_talks_lists_sections" CASCADE;
  DROP TABLE "pages_blocks_talks_lists" CASCADE;
  DROP TABLE "_pages_v_blocks_talks_lists_sections" CASCADE;
  DROP TABLE "_pages_v_blocks_talks_lists" CASCADE;
  DROP TABLE "talks" CASCADE;
  DROP TABLE "_talks_v" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_talks_fk";
  
  DROP INDEX IF EXISTS "payload_locked_documents_rels_talks_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "talks_id";
  DROP TYPE "public"."enum_pages_blocks_talks_lists_sections_type";
  DROP TYPE "public"."enum_pages_blocks_talks_lists_sections_sort";
  DROP TYPE "public"."enum__pages_v_blocks_talks_lists_sections_type";
  DROP TYPE "public"."enum__pages_v_blocks_talks_lists_sections_sort";
  DROP TYPE "public"."enum_talks_type";
  DROP TYPE "public"."enum_talks_status";
  DROP TYPE "public"."enum__talks_v_version_type";
  DROP TYPE "public"."enum__talks_v_version_status";`)
}
