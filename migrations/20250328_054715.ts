import {
  MigrateUpArgs,
  MigrateDownArgs,
  sql,
} from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE IF NOT EXISTS "pages_blocks_project_list_projects" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"project_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_project_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_project_list_projects" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"project_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_project_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "projects" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"slug" varchar,
  	"slug_lock" boolean DEFAULT true,
  	"description" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "projects_id" integer;
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_project_list_projects" ADD CONSTRAINT "pages_blocks_project_list_projects_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_project_list_projects" ADD CONSTRAINT "pages_blocks_project_list_projects_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_project_list"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_project_list" ADD CONSTRAINT "pages_blocks_project_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_project_list_projects" ADD CONSTRAINT "_pages_v_blocks_project_list_projects_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_project_list_projects" ADD CONSTRAINT "_pages_v_blocks_project_list_projects_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_project_list"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_project_list" ADD CONSTRAINT "_pages_v_blocks_project_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "pages_blocks_project_list_projects_order_idx" ON "pages_blocks_project_list_projects" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_project_list_projects_parent_id_idx" ON "pages_blocks_project_list_projects" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_project_list_projects_project_idx" ON "pages_blocks_project_list_projects" USING btree ("project_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_project_list_order_idx" ON "pages_blocks_project_list" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_project_list_parent_id_idx" ON "pages_blocks_project_list" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_project_list_path_idx" ON "pages_blocks_project_list" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_project_list_projects_order_idx" ON "_pages_v_blocks_project_list_projects" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_project_list_projects_parent_id_idx" ON "_pages_v_blocks_project_list_projects" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_project_list_projects_project_idx" ON "_pages_v_blocks_project_list_projects" USING btree ("project_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_project_list_order_idx" ON "_pages_v_blocks_project_list" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_project_list_parent_id_idx" ON "_pages_v_blocks_project_list" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_project_list_path_idx" ON "_pages_v_blocks_project_list" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "projects_slug_idx" ON "projects" USING btree ("slug");
  CREATE INDEX IF NOT EXISTS "projects_updated_at_idx" ON "projects" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "projects_created_at_idx" ON "projects" USING btree ("created_at");
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_projects_id_idx" ON "payload_locked_documents_rels" USING btree ("projects_id");`)
}

export async function down({
  db,
  payload,
  req,
}: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_project_list_projects" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_project_list" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_project_list_projects" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_project_list" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "projects" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_project_list_projects" CASCADE;
  DROP TABLE "pages_blocks_project_list" CASCADE;
  DROP TABLE "_pages_v_blocks_project_list_projects" CASCADE;
  DROP TABLE "_pages_v_blocks_project_list" CASCADE;
  DROP TABLE "projects" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_projects_fk";
  
  DROP INDEX IF EXISTS "payload_locked_documents_rels_projects_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "projects_id";`)
}
