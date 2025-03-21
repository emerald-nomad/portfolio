import { defineField } from "sanity";

export const homePageType = defineField({
  name: "homePage",
  title: "Home Page",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "subTitle",
      title: "Sub Title",
      type: "text",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "typedOptions",
      title: "Typed Options",
      type: "array",
      of: [{ type: "string" }],
      validation: (r) => r.required(),
    }),
  ],
});
