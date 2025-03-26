import type { CollectionConfig } from "payload";
import { slugField } from "../fields/slug";

export const ArticlesCollection: CollectionConfig = {
  slug: "articles",
  fields: [
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
      blockReferences: ["blogContent", "code"],
      blocks: [],
      required: true,
    },
  ],
};
