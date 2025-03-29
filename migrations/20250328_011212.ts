import {
  MigrateUpArgs,
  MigrateDownArgs,
  sql,
} from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_article_list_thin_sort" AS ENUM('publishedAt', '-publishedAt');
  CREATE TYPE "public"."enum__pages_v_blocks_article_list_thin_sort" AS ENUM('publishedAt', '-publishedAt');
  CREATE TABLE IF NOT EXISTS "pages_blocks_gallery_layout_photos" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"photo_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_article_list_thin" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"limit" numeric,
  	"sort" "enum_pages_blocks_article_list_thin_sort",
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_gallery_layout_photos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"photo_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_article_list_thin" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"limit" numeric,
  	"sort" "enum__pages_v_blocks_article_list_thin_sort",
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_gallery_layout_photos" ADD CONSTRAINT "pages_blocks_gallery_layout_photos_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_gallery_layout_photos" ADD CONSTRAINT "pages_blocks_gallery_layout_photos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_gallery_layout"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_article_list_thin" ADD CONSTRAINT "pages_blocks_article_list_thin_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_gallery_layout_photos" ADD CONSTRAINT "_pages_v_blocks_gallery_layout_photos_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_gallery_layout_photos" ADD CONSTRAINT "_pages_v_blocks_gallery_layout_photos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_gallery_layout"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_article_list_thin" ADD CONSTRAINT "_pages_v_blocks_article_list_thin_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "pages_blocks_gallery_layout_photos_order_idx" ON "pages_blocks_gallery_layout_photos" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_gallery_layout_photos_parent_id_idx" ON "pages_blocks_gallery_layout_photos" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_gallery_layout_photos_photo_idx" ON "pages_blocks_gallery_layout_photos" USING btree ("photo_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_article_list_thin_order_idx" ON "pages_blocks_article_list_thin" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_article_list_thin_parent_id_idx" ON "pages_blocks_article_list_thin" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_article_list_thin_path_idx" ON "pages_blocks_article_list_thin" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_gallery_layout_photos_order_idx" ON "_pages_v_blocks_gallery_layout_photos" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_gallery_layout_photos_parent_id_idx" ON "_pages_v_blocks_gallery_layout_photos" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_gallery_layout_photos_photo_idx" ON "_pages_v_blocks_gallery_layout_photos" USING btree ("photo_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_article_list_thin_order_idx" ON "_pages_v_blocks_article_list_thin" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_article_list_thin_parent_id_idx" ON "_pages_v_blocks_article_list_thin" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_article_list_thin_path_idx" ON "_pages_v_blocks_article_list_thin" USING btree ("_path");`)
}

export async function down({
  db,
  payload,
  req,
}: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_gallery_layout_photos" CASCADE;
  DROP TABLE "pages_blocks_article_list_thin" CASCADE;
  DROP TABLE "_pages_v_blocks_gallery_layout_photos" CASCADE;
  DROP TABLE "_pages_v_blocks_article_list_thin" CASCADE;
  DROP TYPE "public"."enum_pages_blocks_article_list_thin_sort";
  DROP TYPE "public"."enum__pages_v_blocks_article_list_thin_sort";`)
}
