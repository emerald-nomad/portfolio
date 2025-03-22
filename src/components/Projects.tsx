"use client";
import React from "react";
import Link from "next/link";
import { PROJECTS_QUERYResult } from "@/sanity/types";
import { urlFor } from "@/sanity/lib/image";

// Modal.setAppElement("#__next");

interface ProjectsProps {
  projects: PROJECTS_QUERYResult;
}

const Projects = ({ projects }: ProjectsProps) => {
  // const [singleData, setSingleData] = useState({
  //   img: "",
  //   date: "",
  //   poster: "",
  //   title: "",
  //   descriptions: <></>,
  // });
  // const [isOpen, setIsOpen] = useState(false);

  // const handleblogsData = (id: number) => {
  //   const find = newsData.find((item) => item?.id === id);
  //   setSingleData(find!);
  //   setIsOpen(true);
  // };

  // const handleModle = (id: number) => {
  //   handleblogsData(id);
  // };

  return (
    <>
      <ul>
        {projects.map((project) => (
          <li key={project._id}>
            <Link
              href={`/portfolio/${project.slug?.current}`}
              className="list_inner"
              // onClick={() => handleModle(item?.id)}
            >
              <div className="image">
                <div
                  className="main "
                  style={{
                    backgroundImage: `url(${urlFor(project.previewImage!.asset!).url()})`,
                  }}
                ></div>
              </div>
              {/* END IMAGE */}
              <div className="details">
                <div className="extra">
                  <p className="date">
                    {/* By <a href="#">{item.projecter}</a> */}
                    {/* <span>{project.publishedAt}</span> */}
                  </p>
                </div>
                {/* END EXTRA */}

                <h3 className="title">{project.title}</h3>
                <div className="tokyo_tm_read_more">
                  <div className="read-more">
                    <span>View More</span>
                  </div>
                </div>
                {/* END READ MORE BUTTON */}
              </div>
              {/* END DETAILS */}
            </Link>
          </li>
        ))}

        {/* END SINGLE BLOG */}
      </ul>
      {/* START MODAL */}

      {/* END MODAL */}
    </>
  );
};

export default Projects;
