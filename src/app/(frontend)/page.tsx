import Home from "@/components/Home";
import { sanityFetch } from "@/sanity/lib/live";
import { HOME_PAGE_QUERY } from "@/sanity/lib/queries";

export default async function HomePage() {
  const { data } = await sanityFetch({ query: HOME_PAGE_QUERY });

  return (
    <>
      <Home
        title={data!.title!}
        subTitle={data!.subTitle!}
        typedOptions={data!.typedOptions!}
      />
    </>
  );
}
