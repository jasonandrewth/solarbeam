import { groq } from "next-sanity";

export const allPostsQuery = groq`*[_type == "post"] | order(date desc){
  _id,
  title,
  "slug": slug.current,
  date,
  excerpt,
  coverImage{ alt, asset->{url, metadata{lqip}} },
  author->{
    name,
    picture{ alt, asset->{url} }
  }
}`;

export const postBySlugQuery = groq`*[_type == "post" && slug.current == $slug][0]{
  _id,
  title,
  date,
  excerpt,
  coverImage{ alt, asset->{url, metadata{lqip}} },
  author->{
    name,
    picture{ alt, asset->{url} }
  },
  sections[]{
    title,
    "id": slug.current,
    content
  }
}`;

// Gallery (singleton) — returns ordered image pairs with useful image fields
export const galleryQuery = groq`*[_type == "gallery"][0]{
  _id,
  imagePairs[]{
    _key,
    image1{
      alt,
      hotspot,
      crop,
      asset->{
        _id,
        url,
        metadata{ lqip, dimensions{ width, height, aspectRatio } }
      }
    },
    image2{
      alt,
      hotspot,
      crop,
      asset->{
        _id,
        url,
        metadata{ lqip, dimensions{ width, height, aspectRatio } }
      }
    }
  }
}`;
