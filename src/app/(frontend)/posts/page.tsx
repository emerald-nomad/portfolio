import Posts from "@/components/Posts";
import { sanityFetch } from "@/sanity/lib/live";
import { POSTS_QUERY } from "@/sanity/lib/queries";

export const metadata = {
  title: "Blog || Tokyo - Personal Portfolio React Nextjs Template",
};
export default async function PostsPage() {
  const { data } = await sanityFetch({ query: POSTS_QUERY });
  return (
    <>
      <div className="container">
        <div className="tokyo_tm_news">
          <div className="tokyo_tm_title">
            <div className="title_flex">
              <div className="left">
                <span>Posts</span>
                <h3>Latest Posts</h3>
              </div>
            </div>
          </div>
          {/* END TITLE */}
          <Posts posts={data!} />
        </div>
      </div>
      {/* End .container */}

      {/* END RIGHT PART CONTENT */}
    </>
  );
}
