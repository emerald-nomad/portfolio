import { defineField, defineType } from "sanity";

export const projectType = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (v) => v.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (v) => v.required(),
    }),
    defineField({
      name: "previewImage",
      title: "Preview Image",
      type: "image",
      validation: (v) => v.required(),
    }),
    defineField({
      name: "headerImage",
      title: "Header Image",
      type: "image",
      validation: (v) => v.required(),
    }),
  ],
});
