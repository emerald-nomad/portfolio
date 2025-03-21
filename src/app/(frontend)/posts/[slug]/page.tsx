import ShareSocial from "@/components/ShareSocial";
import Image from "next/image";

export default async function Post() {
  return (
    <div className="container">
      <div className="tokyo_tm_modalbox_news">
        <div
          className="box_inner"
          style={{ background: "unset", height: "unset" }}
        >
          <div className="description_wrap scrollable">
            <div className="image">
              <div
                className="main"
                style={{
                  backgroundImage: `url(${"/img/news/2.jpg"})`,
                }}
              ></div>
            </div>
            {/* END IMAGE */}
            <div className="details">
              {/* <div className="extra">
                <p className="date">
                  By <a href="#">Jalen Greene</a>
                  <span>07 APRIL 2021</span>
                </p>
              </div> */}
              <h3 className="title">
                {"Sony announced two new full frame cameras with zero fanfare"}
              </h3>
            </div>
            {/* END DETAILS */}
            <div className="main_content ">
              <div className="descriptions">
                <p className="bigger">
                  Just because we can&apos;t get out and about like we normally
                  would, doesn’t mean we have to stop taking pictures. There’s
                  still plenty you can do, provided you&apos;re prepared to use
                  some imagination. Here are a few ideas to keep you shooting
                  until normal life resumes.
                </p>
                <p>
                  Streets empty that are usually busy are remarkable and can
                  evoke the sense of historical pictures from before the
                  invention of the motorcar. Other things that are different at
                  the moment will be queues to get into stores and the lines
                  marked out on the floor to show how far apart we should be.
                </p>
                <div className="quotebox">
                  <div className="icon">
                    <Image
                      width={56}
                      height={50}
                      className="svg"
                      src="/img/svg/quote.svg"
                      alt="tumb"
                    />
                  </div>
                  <p>
                    Most photographers find it hard to see interesting pictures
                    in places in which they are most familiar. A trip somewhere
                    new seems always exactly what our photography needed, as
                    shooting away from home consistently inspires us to new
                    artistic heights.
                  </p>
                </div>
                {/* END QUOTEBOX */}

                <p>
                  The trick here is to look slowly, and then look again. Take
                  the time to look in detail and to look at the same thing from
                  different angles, with different light, long lenses and wide
                  lenses. Then move to the left a bit. You may never feel the
                  need to leave the house again.
                </p>
              </div>
              {/* END DESCRIPTION */}
              <div className="news_share">
                <span>Share:</span>
                <ShareSocial />
                {/* END SOCIAL SHARE */}
              </div>
              {/* END NEWS SHARE */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
