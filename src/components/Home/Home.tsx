import React from "react";
import Social from "../Social";
import Typed from "./Typed";

interface HomeProps {
  title: string;
  subTitle: string;
  typedOptions: string[];
}

export const Home = ({ title, subTitle, typedOptions }: HomeProps) => {
  return (
    <>
      <div className="tokyo_tm_home">
        <div className="home_content">
          <div className="avatar">
            <div
              className="image avatar_img"
              style={{
                backgroundImage: "url(/img/slider/1.jpg)",
              }}
            ></div>
            {/* END AVATAR IMAGE */}
          </div>
          {/* END AVATAR */}
          <div className="details">
            <h3 className="name">{title}</h3>
            <h4 className="typer">
              <Typed typedOptions={typedOptions} />
            </h4>

            <p className="job">{subTitle}</p>
            {/* END JOB */}
            <Social />
          </div>
          {/* END DETAILS */}
        </div>
        {/* END HOME CONTENT */}
      </div>
      {/* END HOME */}
    </>
  );
};
