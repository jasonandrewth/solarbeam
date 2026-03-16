import { groq } from "next-sanity";

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
        metadata{ lqip, dimensions{ width, height, aspectRatio } }
      }
    },
    image2{
      alt,
      hotspot,
      crop,
      asset->{
        _id,
        metadata{ lqip, dimensions{ width, height, aspectRatio } }
      }
    }
  }
}`;

// Archive (singleton) — returns all referenced archive items with image data
export const archiveQuery = groq`*[_type == "archive"][0]{
  _id,
  items[]->{
    _id,
    title,
    size,
    order,
    image{
      alt,
      hotspot,
      crop,
      asset->{
        _id,
        metadata{ lqip, dimensions{ width, height, aspectRatio } }
      }
    }
  }
}`;
