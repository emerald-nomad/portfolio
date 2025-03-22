import Projects from "@/components/Projects";
import { sanityFetch } from "@/sanity/lib/live";
import { PROJECTS_QUERY } from "@/sanity/lib/queries";
export const metadata = {
  title: "Portfolio || Tokyo - Personal Portfolio React Nextjs Template",
};
export default async function PortfolioPage() {
  const { data } = await sanityFetch({ query: PROJECTS_QUERY });

  return (
    <>
      <div className="container">
        <div className="tokyo_tm_news">
          <div className="tokyo_tm_title">
            <div className="title_flex">
              <div className="left">
                <span>Projects</span>
                <h3>Latest Projects</h3>
              </div>
            </div>
          </div>
          {/* END TITLE */}
          <Projects projects={data!} />
        </div>
      </div>
      {/* End .container */}

      {/* END RIGHT PART CONTENT */}
    </>
  );
}
