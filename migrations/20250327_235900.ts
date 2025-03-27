import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_article_list_wide_sort" AS ENUM('publishedAt', '-publishedAt');
  CREATE TABLE IF NOT EXISTS "pages_blocks_article_list_wide" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"limit" numeric NOT NULL,
  	"sort" "enum_pages_blocks_article_list_wide_sort" NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_simple_layout" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"intro" varchar NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_gallery_layout" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"intro" varchar NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "social_links" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "pages_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "social_links_id" integer;
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_article_list_wide" ADD CONSTRAINT "pages_blocks_article_list_wide_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_simple_layout" ADD CONSTRAINT "pages_blocks_simple_layout_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_gallery_layout" ADD CONSTRAINT "pages_blocks_gallery_layout_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "pages_blocks_article_list_wide_order_idx" ON "pages_blocks_article_list_wide" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_article_list_wide_parent_id_idx" ON "pages_blocks_article_list_wide" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_article_list_wide_path_idx" ON "pages_blocks_article_list_wide" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_simple_layout_order_idx" ON "pages_blocks_simple_layout" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_simple_layout_parent_id_idx" ON "pages_blocks_simple_layout" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_simple_layout_path_idx" ON "pages_blocks_simple_layout" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_gallery_layout_order_idx" ON "pages_blocks_gallery_layout" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_gallery_layout_parent_id_idx" ON "pages_blocks_gallery_layout" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_gallery_layout_path_idx" ON "pages_blocks_gallery_layout" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_updated_at_idx" ON "pages" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "pages_created_at_idx" ON "pages" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "social_links_updated_at_idx" ON "social_links" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "social_links_created_at_idx" ON "social_links" USING btree ("created_at");
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_social_links_fk" FOREIGN KEY ("social_links_id") REFERENCES "public"."social_links"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("pages_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_social_links_id_idx" ON "payload_locked_documents_rels" USING btree ("social_links_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_article_list_wide" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_simple_layout" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_gallery_layout" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "social_links" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_article_list_wide" CASCADE;
  DROP TABLE "pages_blocks_simple_layout" CASCADE;
  DROP TABLE "pages_blocks_gallery_layout" CASCADE;
  DROP TABLE "pages" CASCADE;
  DROP TABLE "social_links" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_pages_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_social_links_fk";
  
  DROP INDEX IF EXISTS "payload_locked_documents_rels_pages_id_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_social_links_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "pages_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "social_links_id";
  DROP TYPE "public"."enum_pages_blocks_article_list_wide_sort";`)
}
