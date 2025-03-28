import {
  MigrateUpArgs,
  MigrateDownArgs,
  sql,
} from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__pages_v_blocks_article_list_wide_sort" AS ENUM('publishedAt', '-publishedAt');
  CREATE TYPE "public"."enum__pages_v_version_status" AS ENUM('draft', 'published');
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_article_list_wide" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"limit" numeric,
  	"sort" "enum__pages_v_blocks_article_list_wide_sort",
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_simple_layout" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"intro" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_gallery_layout" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"intro" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_name" varchar,
  	"version_slug" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__pages_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  ALTER TABLE "pages_blocks_article_list_wide" ALTER COLUMN "limit" DROP NOT NULL;
  ALTER TABLE "pages_blocks_article_list_wide" ALTER COLUMN "sort" DROP NOT NULL;
  ALTER TABLE "pages_blocks_simple_layout" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "pages_blocks_simple_layout" ALTER COLUMN "intro" DROP NOT NULL;
  ALTER TABLE "pages_blocks_gallery_layout" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "pages_blocks_gallery_layout" ALTER COLUMN "intro" DROP NOT NULL;
  ALTER TABLE "pages" ALTER COLUMN "name" DROP NOT NULL;
  ALTER TABLE "pages" ALTER COLUMN "slug" DROP NOT NULL;
  ALTER TABLE "pages" ADD COLUMN "_status" "enum_pages_status" DEFAULT 'draft';
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_article_list_wide" ADD CONSTRAINT "_pages_v_blocks_article_list_wide_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_simple_layout" ADD CONSTRAINT "_pages_v_blocks_simple_layout_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_gallery_layout" ADD CONSTRAINT "_pages_v_blocks_gallery_layout_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_parent_id_pages_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_article_list_wide_order_idx" ON "_pages_v_blocks_article_list_wide" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_article_list_wide_parent_id_idx" ON "_pages_v_blocks_article_list_wide" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_article_list_wide_path_idx" ON "_pages_v_blocks_article_list_wide" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_simple_layout_order_idx" ON "_pages_v_blocks_simple_layout" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_simple_layout_parent_id_idx" ON "_pages_v_blocks_simple_layout" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_simple_layout_path_idx" ON "_pages_v_blocks_simple_layout" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_gallery_layout_order_idx" ON "_pages_v_blocks_gallery_layout" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_gallery_layout_parent_id_idx" ON "_pages_v_blocks_gallery_layout" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_gallery_layout_path_idx" ON "_pages_v_blocks_gallery_layout" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_parent_idx" ON "_pages_v" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_version_version_updated_at_idx" ON "_pages_v" USING btree ("version_updated_at");
  CREATE INDEX IF NOT EXISTS "_pages_v_version_version_created_at_idx" ON "_pages_v" USING btree ("version_created_at");
  CREATE INDEX IF NOT EXISTS "_pages_v_version_version__status_idx" ON "_pages_v" USING btree ("version__status");
  CREATE INDEX IF NOT EXISTS "_pages_v_created_at_idx" ON "_pages_v" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "_pages_v_updated_at_idx" ON "_pages_v" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "_pages_v_latest_idx" ON "_pages_v" USING btree ("latest");
  CREATE INDEX IF NOT EXISTS "pages__status_idx" ON "pages" USING btree ("_status");`)
}

export async function down({
  db,
  payload,
  req,
}: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "_pages_v_blocks_article_list_wide" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_simple_layout" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_gallery_layout" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "_pages_v_blocks_article_list_wide" CASCADE;
  DROP TABLE "_pages_v_blocks_simple_layout" CASCADE;
  DROP TABLE "_pages_v_blocks_gallery_layout" CASCADE;
  DROP TABLE "_pages_v" CASCADE;
  DROP INDEX IF EXISTS "pages__status_idx";
  ALTER TABLE "pages_blocks_article_list_wide" ALTER COLUMN "limit" SET NOT NULL;
  ALTER TABLE "pages_blocks_article_list_wide" ALTER COLUMN "sort" SET NOT NULL;
  ALTER TABLE "pages_blocks_simple_layout" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "pages_blocks_simple_layout" ALTER COLUMN "intro" SET NOT NULL;
  ALTER TABLE "pages_blocks_gallery_layout" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "pages_blocks_gallery_layout" ALTER COLUMN "intro" SET NOT NULL;
  ALTER TABLE "pages" ALTER COLUMN "name" SET NOT NULL;
  ALTER TABLE "pages" ALTER COLUMN "slug" SET NOT NULL;
  ALTER TABLE "pages" DROP COLUMN IF EXISTS "_status";
  DROP TYPE "public"."enum_pages_status";
  DROP TYPE "public"."enum__pages_v_blocks_article_list_wide_sort";
  DROP TYPE "public"."enum__pages_v_version_status";`)
}
