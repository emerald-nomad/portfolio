import { CollectionConfig } from "payload";
import { slugField } from "../fields/slug";
import { talkTypeOptions } from "@/utils/talkTypeOptions";

export const TalksCollection: CollectionConfig = {
  slug: "talks",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "type", "slug"]
  },
  fields: [
     {
      name: 'publishedAt',
      type: 'date',
      required: true,
    },
    {
      name: "name",
      type: "text",
      required: true,
    },
    ...slugField("name"),
    {
      name: "description",
      type: "text",
      required: true,
    },
    {
      name: "type",
      type: "select",
      required: true,
      options: talkTypeOptions
    },
    {
      name: "event",
      type: "text",
      required: true,
    }
  ],
  versions: {
    drafts: {
      schedulePublish: false
    }
  }
}