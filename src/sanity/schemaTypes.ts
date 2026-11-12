import { defineArrayMember, defineField, defineType } from "sanity";

export const post = defineType({
  name: "post",
  title: "Journal post",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (rule) => rule.required().max(90),
    }),
    defineField({
      name: "slug",
      type: "slug",
      description: "The last part of the page address. Click Generate.",
      options: { source: "title", maxLength: 80 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "excerpt",
      type: "text",
      rows: 3,
      description: "One or two sentences shown on the journal list and in search results.",
      validation: (rule) => rule.required().max(220),
    }),
    defineField({
      name: "coverImage",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "Description for screen readers",
        }),
      ],
    }),
    defineField({
      name: "externalCoverUrl",
      title: "Cover image address",
      type: "url",
      description: "Used only when no cover image is uploaded.",
    }),
    defineField({
      name: "author",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "Published on",
      type: "date",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "body",
      type: "array",
      of: [
        defineArrayMember({
          type: "block",
          styles: [
            { title: "Paragraph", value: "normal" },
            { title: "Heading", value: "h2" },
            { title: "Sub-heading", value: "h3" },
            { title: "Quote", value: "blockquote" },
          ],
          lists: [
            { title: "Bullets", value: "bullet" },
            { title: "Numbered", value: "number" },
          ],
        }),
      ],
      validation: (rule) => rule.required(),
    }),
  ],
  orderings: [
    {
      title: "Newest first",
      name: "publishedDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "publishedAt", media: "coverImage" },
  },
});

export const pricingTier = defineType({
  name: "pricingTier",
  title: "Pricing package",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "tagline", type: "string" }),
    defineField({
      name: "price",
      title: "Price (USD)",
      type: "number",
      validation: (rule) => rule.required().positive().integer(),
    }),
    defineField({
      name: "monthly",
      title: "Monthly finance example (USD)",
      type: "number",
      validation: (rule) => rule.required().positive().integer(),
    }),
    defineField({
      name: "features",
      title: "What is included",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "featured",
      title: "Highlight as most popular",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "order",
      title: "Position (1 is first)",
      type: "number",
      initialValue: 1,
    }),
  ],
  preview: { select: { title: "name", subtitle: "tagline" } },
});

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Home page text",
  type: "document",
  fields: [
    defineField({
      name: "heroHeadline",
      title: "Main headline",
      type: "string",
      validation: (rule) => rule.required().max(80),
    }),
    defineField({
      name: "heroSubline",
      title: "Text under the headline",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required().max(260),
    }),
  ],
  preview: { prepare: () => ({ title: "Home page text" }) },
});

export const schemaTypes = [post, pricingTier, siteSettings];
