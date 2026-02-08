import { defineType } from "sanity";

export default defineType({
  name: "photo",
  title: "Photo",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "story",
      title: "Story",
      type: "text",
    },
    {
      name: "description",
      title: "Description",
      type: "text",
    },
    {
      name: "location",
      title: "Location",
      type: "string",
    },
    {
      name: "place",
      title: "Place",
      type: "string",
    },
    {
      name: "dateTaken",
      title: "Date Taken",
      type: "datetime",
    },
    {
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "gallery",
      title: "Gallery of Photographs",
      type: "array",
      of: [{ type: "image" }],
      options: {
        layout: "grid",
      },
    },
    {
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "category" }],
    },
    {
      name: "isFeatured",
      title: "Is Featured",
      type: "boolean",
    },
  ],
});
