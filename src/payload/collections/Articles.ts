import type { CollectionConfig } from "payload";
import { slugField } from "../fields/slug";

export const ArticlesCollection: CollectionConfig = {
  slug: "articles",
  fields: [
    {
      name: "publishedAt",
      type: "date",
      required: true
    },
    {
      name: "title",
      type: "text",
      required: true,
    },
    ...slugField(),
    {
      name: "description",
      type: "text",
      required: true,
    },
    {
      name: "content",
      type: "blocks",
      blockReferences: ["blogContent", "code", "mediaBlock"],
      blocks: [],
      required: true,
    },
  ],
};
