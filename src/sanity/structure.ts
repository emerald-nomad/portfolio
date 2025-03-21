import type { StructureResolver } from "sanity/structure";

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Pages")
        .child(
          S.list()
            .title("Page Documents")
            .items([
              S.listItem()
                .title("Home Page")
                .child(
                  S.document().schemaType("homePage").documentId("homePage")
                ),
            ])
        ),

      S.divider(),

      ...S.documentTypeListItems().filter(
        (listItem) => !["homePage"].includes(listItem.getId()!)
      ),
    ]);
