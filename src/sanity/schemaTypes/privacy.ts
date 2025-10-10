import { defineField, defineType } from "sanity";

export default defineType({
  title: "Privacy Policy",
  name: "privacy",
  type: "document",
  fields: [
    defineField({
      title: "Title",
      name: "title",
      type: "string",
    }),
    defineField({
      title: "Content",
      name: "content",
      type: "array",
      of: [{ type: "block" }],
    }),
  ],
});
