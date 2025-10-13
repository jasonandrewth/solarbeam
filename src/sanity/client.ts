import { createClient } from "next-sanity";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION!; // e.g. '2025-01-01'

/**
 * Public client (CDN) – published content only, great for production.
 */
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // CDN = fast, cacheable
  perspective: "published",
});

/**
 * Preview client – shows drafts if a token is present.
 * Use with server actions or draft preview routes.
 */
export const previewClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // must be false to see drafts
  token: process.env.SANITY_API_READ_TOKEN, // keep on server side
  perspective: "previewDrafts", // include drafts
});
