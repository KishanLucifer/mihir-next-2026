import { defineType } from "sanity";

export default defineType({
  name: "video",
  title: "Video",
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
      name: "videoFile",
      title: "Video File",
      type: "file",
      options: {
        accept: "video/*",
      },
    },
    {
      name: "videoUrl",
      title: "Video URL",
      type: "url",
      description: "External video URL (YouTube, Vimeo, etc.)",
    },
    {
      name: "previewImage",
      title: "Preview Image",
      type: "image",
    },
    {
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "category" }],
    },
  ],
});
