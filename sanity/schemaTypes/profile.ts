import { defineType } from "sanity";

export default defineType({
  name: "profile",
  title: "Profile",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
    },
    {
      name: "bio",
      title: "Bio",
      type: "text",
    },
    {
      name: "avatar",
      title: "Avatar",
      type: "image",
    },
    {
      name: "coverImage",
      title: "Cover Image",
      type: "image",
    },
    {
      name: "achievements",
      title: "Achievements",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", type: "string" },
            { name: "year", type: "string" },
            { name: "description", type: "text" },
          ],
        },
      ],
    },
    {
      name: "articles",
      title: "Articles",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", type: "string" },
            { name: "link", type: "url" },
            { name: "publication", type: "string" },
          ],
        },
      ],
    },
    {
      name: "books",
      title: "Books",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", type: "string" },
            { name: "link", type: "url" },
            { name: "year", type: "string" },
          ],
        },
      ],
    },
  ],
});
