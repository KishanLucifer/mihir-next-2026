import { groq } from "next-sanity";

export const FEATURED_PHOTOS_QUERY = groq`
  *[_type == "photo" && isFeatured == true] | order(dateTaken desc) {
    _id,
    title,
    story,
    image
  }
`;

export const CATEGORIES_QUERY = groq`
  *[_type == "category"] | order(title asc) {
    _id,
    title,
    description,
    coverImage
  }
`;

export const PHOTO_BY_ID_QUERY = groq`
  *[_type == "photo" && _id == $id][0] {
    _id,
    title,
    story,
    description,
    location,
    dateTaken,
    image,
    category->{
      _id,
      title
    }
  }
`;
