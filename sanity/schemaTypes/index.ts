import { type SchemaTypeDefinition } from "sanity";

import photo from "./photo";
import category from "./category";
import profile from "./profile";
import video from "./video";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [photo, category, profile, video],
};
