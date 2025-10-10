// /schemas/archiveItem.ts
import { defineField, defineType } from "sanity";
import { ImageIcon, StackIcon } from "@sanity/icons";

export const archiveItem = defineType({
  name: "archiveItem",
  title: "Archive Item",
  type: "document",
  icon: ImageIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required().min(2),
    }),
    defineField({
      name: "size",
      title: "Size",
      type: "string",
      description: 'Optional, e.g. "Size M", "Size 48", or "OS".',
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt text",
          type: "string",
          validation: (Rule) =>
            Rule.required().error("Alt text is required for accessibility."),
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    // Optional: ordering / metadata if you need it
    defineField({
      name: "order",
      title: "Order",
      type: "number",
      description: "Optional manual sort index.",
    }),
  ],
  preview: {
    select: {
      title: "title",
      size: "size",
      media: "image",
    },
    prepare({ title, size, media }) {
      return {
        title,
        subtitle: size || "",
        media,
      };
    },
  },
});

export default defineType({
  name: "archive",
  title: "Archive",
  type: "document",
  icon: StackIcon,
  fields: [
    defineField({
      name: "items",
      title: "Archive Items",
      type: "array",
      of: [{ type: "reference", to: [{ type: "archiveItem" }] }],
      options: { sortable: true },
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: { items: "items" },
    prepare({ items }) {
      return {
        title: "Archive",
        subtitle: `${items?.length || 0} item${items?.length === 1 ? "" : "s"}`,
      };
    },
  },
});
