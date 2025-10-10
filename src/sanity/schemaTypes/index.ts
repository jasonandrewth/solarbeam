import { type SchemaTypeDefinition } from "sanity";

import archiveType, { archiveItem } from "./archiveType";
import privacy from "./privacy";
import { gallery } from "./galleryType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [archiveType, gallery, privacy, archiveItem],
};
