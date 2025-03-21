"use client";
import React, { useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { Gallery, Item } from "react-photoswipe-gallery";
import "photoswipe/dist/photoswipe.css";
import "react-tooltip/dist/react-tooltip.css";
import ModalVideo from "react-modal-video";
import Modal from "react-modal";

import Image from "next/image";
import ModalOne from "./modal/ModalOne";
import ModalTwo from "./modal/ModalTwo";
import { Tooltip as ReactTooltip } from "react-tooltip";
// Modal.setAppElement("#__next");

const Portfolio = () => {
  // for popup video for youtube
  const [isOpenYoutube, setOpenYoutube] = useState(false);

  // popup video for vimeo
  const [isOpenVimeo, setOpenVimeo] = useState(false);

  // for modal details
  const [isOpenModalOne, setIsOpenModalOne] = useState(false);
  const [isOpenModalTwo, setIsOpenModalTwo] = useState(false);

  // for modal details method
  function toggleModalOne() {
    setIsOpenModalOne(!isOpenModalOne);
  }
  function toggleModalTwo() {
    setIsOpenModalTwo(!isOpenModalTwo);
  }

  return (
    <>
      <Gallery>
        <Tabs>
          {/* START FILTER TABLIST */}
          <TabList>
            <Tab>All</Tab>
            <Tab>Videos</Tab>
            <Tab>Photography</Tab>
            <Tab>Details</Tab>
          </TabList>
          {/* END FILTER TABLIST */}

          <div className="list_wrapper">
            {/* START ALL PORTFOLIO */}
            <TabPanel>
              <ul
                className="portfolio_list"
                data-aos="fade-right"
                data-aos-duration="1200"
              >
                <li>
                  <div className="inner">
                    <div className="entry tokyo_tm_portfolio_animation_wrap">
                      <Image
                        width={300}
                        height={300}
                        src="/img/portfolio/5.jpg"
                        alt="Vimeo"
                        data-tip
                        data-for="vimeo"
                        data-tooltip-id={"vimeo"}
                        onClick={() => setOpenVimeo(true)}
                      />

                      <ReactTooltip
                        id="vimeo"
                        place="bottom"
                        variant="light"
                        float
                        render={() => (
                          <div className="tooltip-wrapper">
                            <h5>Teresa Butler</h5>
                            <span>Vimeo</span>
                          </div>
                        )}
                      />
                    </div>
                  </div>
                </li>
                {/* END VIMEO */}

                <li>
                  <div className="inner">
                    <div className="entry tokyo_tm_portfolio_animation_wrap">
                      <Image
                        width={300}
                        height={300}
                        src="/img/portfolio/2.jpg"
                        alt="Youtube"
                        data-tip
                        data-for="youtube"
                        data-tooltip-id={"youtube"}
                        onClick={() => setOpenYoutube(true)}
                      />
                      <ReactTooltip
                        id="youtube"
                        place="bottom"
                        variant="light"
                        float
                        render={() => (
                          <div className="tooltip-wrapper">
                            <h5>Ashely Flores</h5>
                            <span>Youtube</span>
                          </div>
                        )}
                      />
                    </div>
                  </div>
                </li>
                {/* END YOUTUBE */}

                <li>
                  <div className="inner">
                    <div className="entry tokyo_tm_portfolio_animation_wrap">
                      <Item
                        original="/img/portfolio/4.jpg"
                        thumbnail="/img/portfolio/4.jpg"
                        width={500}
                        height={550}
                      >
                        {({ ref, open }) => (
                          <Image
                            width={300}
                            height={300}
                            srl_gallery_image="true"
                            src="/img/portfolio/4.jpg"
                            alt="Childhood"
                            data-tip
                            data-for="shot"
                            data-tooltip-id={"shot"}
                            role="button"
                            ref={ref}
                            onClick={open}
                          />
                        )}
                      </Item>
                      <ReactTooltip
                        id="shot"
                        place="bottom"
                        variant="light"
                        float
                        render={() => (
                          <div className="tooltip-wrapper">
                            <h5>Derek Smith</h5>
                            <span>Shot</span>
                          </div>
                        )}
                      />
                    </div>
                  </div>
                </li>
                {/* END SHOT */}

                <li>
                  <div className="inner">
                    <div className="entry tokyo_tm_portfolio_animation_wrap">
                      <Item
                        original="/img/portfolio/3.jpg"
                        thumbnail="/img/portfolio/3.jpg"
                        width={500}
                        height={550}
                      >
                        {({ ref, open }) => (
                          <Image
                            width={300}
                            height={300}
                            srl_gallery_image="true"
                            src="/img/portfolio/3.jpg"
                            alt="Childhood"
                            data-tip
                            data-for="shot2"
                            data-tooltip-id={"shot2"}
                            role="button"
                            ref={ref}
                            onClick={open}
                          />
                        )}
                      </Item>
                      <ReactTooltip
                        id="shot2"
                        place="bottom"
                        variant="light"
                        float
                        render={() => (
                          <div className="tooltip-wrapper">
                            <h5>Gloria jenkins</h5>
                            <span>Shot</span>
                          </div>
                        )}
                      />
                    </div>
                  </div>
                </li>
                {/* END SHOT */}

                <li>
                  <div className="inner">
                    <div className="entry tokyo_tm_portfolio_animation_wrap">
                      <Image
                        width={300}
                        height={300}
                        src="/img/portfolio/6.jpg"
                        alt="Details"
                        data-tip
                        data-for="detail"
                        data-tooltip-id={"detail"}
                        onClick={toggleModalOne}
                      />

                      <ReactTooltip
                        id="detail"
                        place="bottom"
                        variant="light"
                        float
                        render={() => (
                          <div className="tooltip-wrapper">
                            <h5>Selena Gomez</h5>
                            <span>Details</span>
                          </div>
                        )}
                      />
                    </div>
                  </div>
                </li>
                {/* END DETAILS */}

                <li>
                  <div className="inner">
                    <div className="entry tokyo_tm_portfolio_animation_wrap">
                      <Image
                        width={300}
                        height={300}
                        src="/img/portfolio/7.jpg"
                        alt="Details"
                        data-tip
                        data-for="detail2"
                        data-tooltip-id={"detail2"}
                        onClick={toggleModalTwo}
                      />

                      <ReactTooltip
                        id="detail2"
                        place="bottom"
                        variant="light"
                        float
                        render={() => (
                          <div className="tooltip-wrapper">
                            <h5>Ave Simone</h5>
                            <span>Details</span>
                          </div>
                        )}
                      />
                    </div>
                  </div>
                </li>
                {/* END DETAILS */}
              </ul>
            </TabPanel>
            {/* END ALL PORTFOLIO */}

            {/* START VIDEOS */}
            <TabPanel>
              <ul
                className="portfolio_list"
                data-aos="fade-right"
                data-aos-duration="1200"
              >
                <li>
                  <div className="inner">
                    <div className="entry tokyo_tm_portfolio_animation_wrap">
                      <Image
                        width={300}
                        height={300}
                        src="/img/portfolio/5.jpg"
                        alt="Vimeo"
                        data-tip
                        data-for="vimeo2"
                        data-tooltip-id={"vimeo2"}
                        onClick={() => setOpenVimeo(true)}
                      />
                      <ReactTooltip
                        id="vimeo2"
                        place="bottom"
                        variant="light"
                        float
                        render={() => (
                          <div className="tooltip-wrapper">
                            <h5>Teresa Butler</h5>
                            <span>Vimeo</span>
                          </div>
                        )}
                      />
                    </div>
                  </div>
                </li>
                {/* END VIMEO */}
                <li>
                  <div className="inner">
                    <div className="entry tokyo_tm_portfolio_animation_wrap">
                      <Image
                        width={300}
                        height={300}
                        src="/img/portfolio/2.jpg"
                        alt="Youtube"
                        data-tip
                        data-for="youtube2"
                        data-tooltip-id={"youtube2"}
                        onClick={() => setOpenYoutube(true)}
                      />
                      <ReactTooltip
                        id="youtube2"
                        place="bottom"
                        variant="light"
                        float
                        render={() => (
                          <div className="tooltip-wrapper">
                            <h5>Ashely Flores</h5>
                            <span>Youtube</span>
                          </div>
                        )}
                      />
                    </div>
                  </div>
                </li>
                {/* END YOUTUBE */}
              </ul>
              {/* END PORTFOLIO LIST */}
            </TabPanel>
            {/* END VIDEOS */}

            {/* START PHOTOGRAHY */}
            <TabPanel>
              <ul
                className="portfolio_list"
                data-aos="fade-right"
                data-aos-duration="1200"
              >
                <li>
                  <div className="inner">
                    <div className="entry tokyo_tm_portfolio_animation_wrap">
                      <Item
                        original="/img/portfolio/4.jpg"
                        thumbnail="/img/portfolio/4.jpg"
                        width={500}
                        height={550}
                      >
                        {({ ref, open }) => (
                          <Image
                            width={300}
                            height={300}
                            srl_gallery_image="true"
                            src="/img/portfolio/4.jpg"
                            alt="Childhood"
                            data-tip
                            data-for="shot2"
                            role="button"
                            data-tooltip-id={"shot2"}
                            ref={ref}
                            onClick={open}
                          />
                        )}
                      </Item>
                      <ReactTooltip
                        id="shot2"
                        place="bottom"
                        variant="light"
                        float
                        render={() => (
                          <div className="tooltip-wrapper">
                            <h5>Derek Smith</h5>
                            <span>Shot</span>
                          </div>
                        )}
                      />
                    </div>
                  </div>
                </li>
                {/* END SHOT */}
                <li>
                  <div className="inner">
                    <div className="entry tokyo_tm_portfolio_animation_wrap">
                      <Item
                        original="/img/portfolio/3.jpg"
                        thumbnail="/img/portfolio/3.jpg"
                        width={500}
                        height={550}
                      >
                        {({ ref, open }) => (
                          <Image
                            width={300}
                            height={300}
                            srl_gallery_image="true"
                            src="/img/portfolio/3.jpg"
                            alt="Childhood"
                            data-tip
                            data-for="shot3"
                            role="button"
                            data-tooltip-id={"shot3"}
                            ref={ref}
                            onClick={open}
                          />
                        )}
                      </Item>
                      <ReactTooltip
                        id="shot3"
                        place="bottom"
                        variant="light"
                        float
                        render={() => (
                          <div className="tooltip-wrapper">
                            <h5>Gloria jenkins</h5>
                            <span>Shot</span>
                          </div>
                        )}
                      />
                    </div>
                  </div>
                </li>
                {/* END SHOT */}
              </ul>
              {/* END PORTFOLIO LIST */}
            </TabPanel>
            {/* END PHOTOGRAHY */}

            {/* START PORTFOLIO DETAILS */}
            <TabPanel>
              <ul
                className="portfolio_list"
                data-aos="fade-right"
                data-aos-duration="1200"
              >
                <li>
                  <div className="inner">
                    <div className="entry tokyo_tm_portfolio_animation_wrap">
                      <Image
                        width={300}
                        height={300}
                        src="/img/portfolio/6.jpg"
                        alt="Details"
                        data-tip
                        data-for="detail4"
                        data-tooltip-id={"detail4"}
                        onClick={toggleModalOne}
                      />

                      <ReactTooltip
                        id="detail4"
                        place="bottom"
                        variant="light"
                        float
                        render={() => (
                          <div className="tooltip-wrapper">
                            <h5>Selena Gomez</h5>
                            <span>Details</span>
                          </div>
                        )}
                      />
                    </div>
                  </div>
                </li>
                {/* END DETAILS */}
                <li>
                  <div className="inner">
                    <div className="entry tokyo_tm_portfolio_animation_wrap">
                      <Image
                        width={300}
                        height={300}
                        src="/img/portfolio/7.jpg"
                        alt="Details"
                        data-tip
                        data-for="detail5"
                        data-tooltip-id={"detail5"}
                        onClick={toggleModalTwo}
                      />

                      <ReactTooltip
                        id="detail5"
                        place="bottom"
                        variant="light"
                        float
                        render={() => (
                          <div className="tooltip-wrapper">
                            <h5>Ave Simone</h5>
                            <span>Details</span>
                          </div>
                        )}
                      />
                    </div>
                  </div>
                </li>
                {/* END DETAILS */}
              </ul>
              {/* END DETAILS GALLERY */}
            </TabPanel>
            {/* END PORTFOLIO DETAILS */}
          </div>
          {/* END LIST WRAPPER */}
        </Tabs>
      </Gallery>

      {/* START YOUTUBE VIDEO POPUP */}
      <ModalVideo
        channel="youtube"
        autoplay
        isOpen={isOpenYoutube}
        videoId="1gyTUHP6ne8"
        onClose={() => setOpenYoutube(false)}
      />
      {/* EMD YOUTUBE VIDEO POPUP */}

      {/* START VIMEO VIDEO POPUP  */}
      <ModalVideo
        channel="vimeo"
        autoplay
        isOpen={isOpenVimeo}
        videoId="100171151"
        onClose={() => setOpenVimeo(false)}
      />
      {/* END VIMEO VIDEO POPUP */}

      {/* START MODAL FOR PORTFOLIO DETAILS */}
      <Modal
        ariaHideApp={false}
        isOpen={isOpenModalOne}
        onRequestClose={toggleModalOne}
        contentLabel="My dialog"
        className="mymodal"
        overlayClassName="myoverlay"
        closeTimeoutMS={500}
      >
        <div className="tokyo_tm_modalbox_news portfolio_tm_modalbox">
          <button className="close-modal" onClick={toggleModalOne}>
            <img src="/img/svg/cancel.svg" alt="close icon" />
          </button>
          {/* END CLOSE ICON */}

          <ModalOne />
          {/* END BOX INNER */}
        </div>
        {/* END MODALBOX NEWS */}
      </Modal>
      {/* END MODAL FOR PORTFOLIO DETAILS */}

      {/* START MODAL FOR PORTFOLIO DETAILS */}
      <Modal
        ariaHideApp={false}
        isOpen={isOpenModalTwo}
        onRequestClose={toggleModalTwo}
        contentLabel="My dialog"
        className="mymodal"
        overlayClassName="myoverlay"
        closeTimeoutMS={500}
      >
        <div className="tokyo_tm_modalbox_news portfolio_tm_modalbox">
          <button className="close-modal" onClick={toggleModalTwo}>
            <img src="/img/svg/cancel.svg" alt="close icon" />
          </button>
          {/* END CLOSE ICON */}
          <ModalTwo />
          {/* END BOX INNER */}
        </div>
        {/* END MODALBOX NEWS */}
      </Modal>
      {/* END MODAL FOR PORTFOLIO DETAILS */}
    </>
  );
};

export default Portfolio;
