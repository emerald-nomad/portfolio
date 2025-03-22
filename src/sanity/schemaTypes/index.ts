import { type SchemaTypeDefinition } from "sanity";
import { homePageType } from "./pages/homePageType";
import { postType } from "./postType";
import { quoteType } from "./quoteType";
import { projectType } from "./projectType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [homePageType, projectType, postType, quoteType],
};
