import Home from "@/components/Home";
import { sanityFetch } from "@/sanity/lib/live";
import { HOME_PAGE_QUERY } from "@/sanity/lib/queries";

export default async function HomePage() {
  const { data } = await sanityFetch({ query: HOME_PAGE_QUERY });

  return (
    <>
      <div className="rightpart">
        <div className="rightpart_in">
          <div className="tokyo_tm_section">
            <div data-aos="fade-right" data-aos-duration="1200">
              <Home
                title={data!.title!}
                subTitle={data!.subTitle!}
                typedOptions={data!.typedOptions!}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
