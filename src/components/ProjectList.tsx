import {ProjectList as IProjectList, Project} from "@/payload/payload-types"
// import Image from "next/image"
import { Card } from "./Card";

interface ProjectListProps {
  content: IProjectList
}

export function ProjectList({content}: ProjectListProps) {
  return (
        <ul
        role="list"
        className="grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-3"
      >
        {content.projects.map(({project}) => {
          const p = project as Project;
          return (
          <Card as="li" key={p.id}>
            {/* <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white ring-1 shadow-md shadow-zinc-800/5 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
              <Image
                src={project.logo}
                alt=""
                className="h-8 w-8"
                unoptimized
              />
            </div> */}
            <h2 className=" text-base font-semibold text-zinc-800 dark:text-zinc-100">
              <Card.Link href={`/projects/${p.slug!}`}>{p.name}</Card.Link>
            </h2>
            <Card.Description>{p.description}</Card.Description>
             <Card.Cta>View Case Study</Card.Cta>
            {/* <p className="relative z-10 mt-6 flex text-sm font-medium text-zinc-400 transition group-hover:text-teal-500 dark:text-zinc-200">
              <LinkIcon className="h-6 w-6 flex-none" />
              <span className="ml-2">{project.link.label}</span>
            </p> */}
          </Card>
        )
        } )}
      </ul>
  )
}