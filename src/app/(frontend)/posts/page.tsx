import Posts from "@/components/Posts";

export const metadata = {
  title: "Blog || Tokyo - Personal Portfolio React Nextjs Template",
};
const index = () => {
  return (
    <>
      {/* End page title for seo */}

      {/* END LEFT MENU CONTENT */}

      {/* START RIGHT PART CONTENT */}

      <div className="container">
        <div className="tokyo_tm_news">
          <div className="tokyo_tm_title">
            <div className="title_flex">
              <div className="left">
                <span>News</span>
                <h3>Latest News</h3>
              </div>
            </div>
          </div>
          {/* END TITLE */}
          <Posts />
        </div>
      </div>
      {/* End .container */}

      {/* END RIGHT PART CONTENT */}
    </>
  );
};

export default index;
