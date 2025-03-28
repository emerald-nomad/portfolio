import { Block } from "payload";

export const NewsLetter: Block = {
  slug: "newsLetter",
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "subTitle",
      type: "text",
      required: true
    }
  ]
}