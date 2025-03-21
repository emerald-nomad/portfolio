import { type SchemaTypeDefinition } from "sanity";
import { homePageType } from "./pages/homePageType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [homePageType],
};
