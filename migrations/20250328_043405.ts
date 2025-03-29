import {
  MigrateUpArgs,
  MigrateDownArgs,
  sql,
} from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_social_links_icon" AS ENUM('arrowDown', 'briefcase', 'github', 'instagram', 'linkedIn', 'mail', 'x');
  CREATE TABLE IF NOT EXISTS "pages_blocks_gallery_layout_social_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_news_letter" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"sub_title" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_resume_roles" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"company" varchar,
  	"title" varchar,
  	"icon_id" integer,
  	"start" timestamp(3) with time zone,
  	"end" timestamp(3) with time zone
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_resume" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_gallery_layout_social_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_news_letter" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"sub_title" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_resume_roles" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"company" varchar,
  	"title" varchar,
  	"icon_id" integer,
  	"start" timestamp(3) with time zone,
  	"end" timestamp(3) with time zone,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_resume" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "social_links" ADD COLUMN "icon" "enum_social_links_icon" NOT NULL;
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_gallery_layout_social_links" ADD CONSTRAINT "pages_blocks_gallery_layout_social_links_link_id_social_links_id_fk" FOREIGN KEY ("link_id") REFERENCES "public"."social_links"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_gallery_layout_social_links" ADD CONSTRAINT "pages_blocks_gallery_layout_social_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_gallery_layout"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_news_letter" ADD CONSTRAINT "pages_blocks_news_letter_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_resume_roles" ADD CONSTRAINT "pages_blocks_resume_roles_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_resume_roles" ADD CONSTRAINT "pages_blocks_resume_roles_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_resume"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_resume" ADD CONSTRAINT "pages_blocks_resume_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_gallery_layout_social_links" ADD CONSTRAINT "_pages_v_blocks_gallery_layout_social_links_link_id_social_links_id_fk" FOREIGN KEY ("link_id") REFERENCES "public"."social_links"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_gallery_layout_social_links" ADD CONSTRAINT "_pages_v_blocks_gallery_layout_social_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_gallery_layout"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_news_letter" ADD CONSTRAINT "_pages_v_blocks_news_letter_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_resume_roles" ADD CONSTRAINT "_pages_v_blocks_resume_roles_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_resume_roles" ADD CONSTRAINT "_pages_v_blocks_resume_roles_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_resume"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_resume" ADD CONSTRAINT "_pages_v_blocks_resume_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "pages_blocks_gallery_layout_social_links_order_idx" ON "pages_blocks_gallery_layout_social_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_gallery_layout_social_links_parent_id_idx" ON "pages_blocks_gallery_layout_social_links" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_gallery_layout_social_links_link_idx" ON "pages_blocks_gallery_layout_social_links" USING btree ("link_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_news_letter_order_idx" ON "pages_blocks_news_letter" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_news_letter_parent_id_idx" ON "pages_blocks_news_letter" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_news_letter_path_idx" ON "pages_blocks_news_letter" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_resume_roles_order_idx" ON "pages_blocks_resume_roles" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_resume_roles_parent_id_idx" ON "pages_blocks_resume_roles" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_resume_roles_icon_idx" ON "pages_blocks_resume_roles" USING btree ("icon_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_resume_order_idx" ON "pages_blocks_resume" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_resume_parent_id_idx" ON "pages_blocks_resume" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_resume_path_idx" ON "pages_blocks_resume" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_gallery_layout_social_links_order_idx" ON "_pages_v_blocks_gallery_layout_social_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_gallery_layout_social_links_parent_id_idx" ON "_pages_v_blocks_gallery_layout_social_links" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_gallery_layout_social_links_link_idx" ON "_pages_v_blocks_gallery_layout_social_links" USING btree ("link_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_news_letter_order_idx" ON "_pages_v_blocks_news_letter" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_news_letter_parent_id_idx" ON "_pages_v_blocks_news_letter" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_news_letter_path_idx" ON "_pages_v_blocks_news_letter" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_resume_roles_order_idx" ON "_pages_v_blocks_resume_roles" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_resume_roles_parent_id_idx" ON "_pages_v_blocks_resume_roles" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_resume_roles_icon_idx" ON "_pages_v_blocks_resume_roles" USING btree ("icon_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_resume_order_idx" ON "_pages_v_blocks_resume" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_resume_parent_id_idx" ON "_pages_v_blocks_resume" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_resume_path_idx" ON "_pages_v_blocks_resume" USING btree ("_path");`)
}

export async function down({
  db,
  payload,
  req,
}: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_gallery_layout_social_links" CASCADE;
  DROP TABLE "pages_blocks_news_letter" CASCADE;
  DROP TABLE "pages_blocks_resume_roles" CASCADE;
  DROP TABLE "pages_blocks_resume" CASCADE;
  DROP TABLE "_pages_v_blocks_gallery_layout_social_links" CASCADE;
  DROP TABLE "_pages_v_blocks_news_letter" CASCADE;
  DROP TABLE "_pages_v_blocks_resume_roles" CASCADE;
  DROP TABLE "_pages_v_blocks_resume" CASCADE;
  ALTER TABLE "social_links" DROP COLUMN IF EXISTS "icon";
  DROP TYPE "public"."enum_social_links_icon";`)
}
