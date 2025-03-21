import { defineField, defineType } from "sanity";

export const quoteType = defineType({
  title: "Quote",
  name: "quote",
  type: "object",
  fields: [
    defineField({
      name: "text",
      title: "Text",
      type: "text",
    }),
  ],
});
