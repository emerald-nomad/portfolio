import { Block } from "payload";

export const GalleryLayout: Block = {
  slug: "galleryLayout",
  fields: [
    {
      name: "title",
      type: "text",
      required: true
    },
    {
      name: "intro",
      type: "text",
      required: true
    }
  ]
}