import { DocumentTextIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const gallery = defineType({
  name: "gallery",
  title: "Gallery",
  type: "document",
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: "imagePairs",
      title: "Image Pairs",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "image1",
              type: "image",
              title: "Image 1",
              options: { hotspot: true },
              fields: [
                defineField({
                  name: "alt",
                  type: "string",
                  title: "Alternative text",
                }),
              ],
            }),
            defineField({
              name: "image2",
              type: "image",
              title: "Image 2",
              options: { hotspot: true },
              fields: [
                defineField({
                  name: "alt",
                  type: "string",
                  title: "Alternative text",
                }),
              ],
            }),
          ],
          validation: (Rule) => Rule.required(),
        }),
      ],
      options: { sortable: true },
    }),
  ],
  preview: {
    select: {
      media: "imagePairs.0.image1",
      count: "imagePairs.length",
    },
    prepare({ media, count }) {
      return {
        title: "Gallery",
        subtitle: `${count} image pair${count === 1 ? "" : "s"}`,
        media,
      };
    },
  },
});
