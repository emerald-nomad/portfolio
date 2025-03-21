import { defineField, defineType } from "sanity";

export const postType = defineType({
  name: "post",
  title: "Post",
  type: "document",
  fields: [
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "date",
      validation: (v) => v.required(),
    }),
    defineField({
      name: "hero",
      title: "Hero",
      type: "image",
      validation: (v) => v.required(),
    }),
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
    // defineField({
    //   name: "description",
    //   title: "Description",
    //   type: "text",
    //   validation: (v) => v.required(),
    // }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [{ type: "block" }, { type: "quote" }],
      validation: (v) => v.required(),
    }),
  ],
});
