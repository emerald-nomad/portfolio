import { CollectionConfig } from "payload";

export const SocialLinksCollection: CollectionConfig = {
  slug: "socialLinks",
  fields: [
    {
      name: "text",
      type: "text",
      required: true
    },
    {
      name: "slug",
      type: "text",
      required: true
    }
  ]
}