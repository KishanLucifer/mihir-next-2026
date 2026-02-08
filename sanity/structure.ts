import type { StructureResolver } from "sanity/structure";

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Mihir-wildlife")
    .items([
      S.documentTypeListItem("photo").title("Photo"),
      S.documentTypeListItem("category").title("Categories"),
      S.documentTypeListItem("profile").title("Profile"),
      S.documentTypeListItem("video").title("Video"),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) =>
          item.getId() &&
          !["photo", "category", "profile", "video"].includes(item.getId()!)
      ),
    ]);
