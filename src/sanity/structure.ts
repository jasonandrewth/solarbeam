import {
  CogIcon,
  ChartUpwardIcon,
  HomeIcon,
  PanelLeftIcon,
  WrenchIcon,
} from "@sanity/icons";
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
            .title("Pages")
            .items([
              S.listItem()
                .title("Gallery")
                .id("gallery")
                .icon(HomeIcon)
                .child(
                  S.document().schemaType("gallery").documentId("gallery")
                ),
              S.listItem()
                .title("Archive")
                .id("archive")
                .icon(HomeIcon)
                .child(
                  S.document().schemaType("archive").documentId("archive")
                ),
              S.listItem()
                .title("Privacy Policy")
                .id("privacy")
                .child(
                  S.document().schemaType("privacy").documentId("privacy")
                ),
            ])
        ),
      // S.listItem()
      //   .title("Settings")
      //   .id("settings")
      //   .icon(CogIcon)
      //   .child(S.document().schemaType("settings").documentId("settings")),
    ]);
