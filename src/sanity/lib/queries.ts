import { defineQuery } from "next-sanity";

export const HOME_PAGE_QUERY = defineQuery(`*[_type == 'homePage'][0]`);

export const POSTS_QUERY = defineQuery(`*[_type == "post"]`);

export const POSTS_SLUGS_QUERY =
  defineQuery(`*[_type == "post" && defined(slug.current)]{ 
  "slug": slug.current
}`);

export const POST_QUERY = defineQuery(
  `*[_type == "post" && slug.current == $slug][0]`
);

export const PROJECTS_QUERY = defineQuery(`*[_type == "project"]`);

export const PROJECTS_SLUGS_QUERY =
  defineQuery(`*[_type == "project" && defined(slug.current)]{ 
  "slug": slug.current
}`);

export const PROJECT_QUERY = defineQuery(
  `*[_type == "project" && slug.current == $slug][0]`
);
