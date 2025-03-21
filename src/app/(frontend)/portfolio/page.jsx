import Portfolio from "@/components/portfolio/Portfolio";
export const metadata = {
  title: "Portfolio || Tokyo - Personal Portfolio React Nextjs Template",
};
const index = () => {
  return (
    <>
      <div className="container">
        <div className="tokyo_tm_portfolio">
          <div className="tokyo_tm_title">
            <div className="title_flex">
              <div className="left">
                <span>Portfolio</span>
                <h3>Creative Portfolio</h3>
              </div>
            </div>
          </div>
          {/* END TOKYO_TM_TITLE */}

          <div className="portfolio_filter">
            <Portfolio />
          </div>
          {/* END PROFTOLIO FILTER */}
        </div>
      </div>
      {/* End .container */}
    </>
  );
};

export default index;
