import { Block } from "payload";

export const ArticleListWide: Block = {
  slug: "articleListWide",
  fields: [
    {
      name: "limit",
      type: "number",
      required: true,
    },
    {
      name: "sort",
      type: "select",
      required: true,
      options: [
        {
          label: "Published At ASC",
          value: "publishedAt"
        },
        {
          label: "Published At DESC",
          value: "-publishedAt"
        },
      ]
    }
  ]
}