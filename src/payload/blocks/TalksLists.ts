import { talkTypeOptions } from "@/utils/talkTypeOptions";
import { Block } from "payload";

export const TalksLists: Block = {
  slug: "talksLists",
  fields: [
    {
      name: "sections",
      type: 'array',
      required: true,
      fields: [
        {
          name: "type",
          type: "select",
          required: true,
          options: talkTypeOptions
        },
        {
      name: 'limit',
      type: 'number',
      required: true,
    },
    {
      name: 'sort',
      type: 'select',
      required: true,
      options: [
        {
          label: 'Published At ASC',
          value: 'publishedAt',
        },
        {
          label: 'Published At DESC',
          value: '-publishedAt',
        },
      ],
    },
      ]
    }
  ]
}