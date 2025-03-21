import { type SchemaTypeDefinition } from "sanity";
import { homePageType } from "./pages/homePageType";
import { postType } from "./postType";
import { quoteType } from "./quoteType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [homePageType, postType, quoteType],
};
