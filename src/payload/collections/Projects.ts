import { CollectionConfig } from "payload";
import { slugField } from "../fields/slug";

export const ProjectsCollection: CollectionConfig = {
  slug: "projects",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "slug", "description"],
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true
    },
    ...slugField("name"),
    {
      name: "description",
      type: "text",
      required: true,
    },
  ]
}