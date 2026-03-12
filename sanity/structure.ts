import type { StructureResolver } from "sanity/structure";

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Mihir-wildlife")
    .items([
      S.documentTypeListItem("photo").title("Photo"),
      S.documentTypeListItem("category").title("Categories"),
      S.documentTypeListItem("video").title("Video"),
      S.documentTypeListItem("about").title("About"),
      S.documentTypeListItem("contact").title("Contact"),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) =>
          item.getId() &&
          !["photo", "category", "video", "about", "contact"].includes(
            item.getId()!
          )
      ),
    ]);
