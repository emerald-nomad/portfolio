import { CollectionConfig } from "payload";

export const PagesCollection: CollectionConfig<"pages"> = {
  slug: "pages",
  admin: {
    useAsTitle: "name",
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true
    },
    {
      name: "slug",
      type: "text",
      required: true
    },
    {
      name: "content",
      type: 'blocks',
      blocks: [],
      maxRows: 1,
      required: true,
      blockReferences: ["simpleLayout", "galleryLayout"]
    }
  ]
}