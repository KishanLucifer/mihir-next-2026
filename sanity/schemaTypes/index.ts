import { type SchemaTypeDefinition } from "sanity";

import photo from "./photo";
import category from "./category";
import about from "./about";
import video from "./video";
import contact from "./contact";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [photo, category, contact, about, video],
};
