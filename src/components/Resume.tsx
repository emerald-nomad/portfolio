import {Resume as IResume, Media} from "@/payload/payload-types"
import Image, { ImageProps } from 'next/image'
import { ArrowDownIcon, BriefcaseIcon } from './SocialIcons'
import { Button } from './Button'

interface Role {
  company: string
  title: string
  logo: ImageProps['src']
  start: string | { label: string; dateTime: string }
  end: string | { label: string; dateTime: string }
}

interface RoleProps {
  content: IResume['roles'][0]
}

function Role({ content }: RoleProps) {
  const startYear = new Date(content.start).getFullYear().toString()
  
  const startLabel = startYear;
  const startDate = startYear

  const endYear = (content.end ? new Date(content.end) : new Date()).getFullYear().toString()
  const endLabel = content.end ? endYear : "Present";
  const endDate = endYear;

  const icon = (content.icon) as Media;

  return (
    <li className="flex gap-4">
      <div className="relative mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-full shadow-md ring-1 shadow-zinc-800/5 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
        <Image src={icon.url!} alt={icon.alt} className="h-7 w-7" width={icon.width!} height={icon.height!} />
      </div>
      <dl className="flex flex-auto flex-wrap gap-x-2">
        <dt className="sr-only">Company</dt>
        <dd className="w-full flex-none text-sm font-medium text-zinc-900 dark:text-zinc-100">
          {content.company}
        </dd>
        <dt className="sr-only">Role</dt>
        <dd className="text-xs text-zinc-500 dark:text-zinc-400">
          {content.title}
        </dd>
        <dt className="sr-only">Date</dt>
        <dd
          className="ml-auto text-xs text-zinc-400 dark:text-zinc-500"
          aria-label={`${startLabel} until ${endLabel}`}
        >
          <time dateTime={startDate}>{startLabel}</time>{' '}
          <span aria-hidden="true">—</span>{' '}
          <time dateTime={endDate}>{endLabel}</time>
        </dd>
      </dl>
    </li>
  )
}

interface ResumeProps {
  content: IResume
}

export function Resume({content}: ResumeProps) {
  return (
    <div className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
      <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        <BriefcaseIcon className="h-6 w-6 flex-none" />
        <span className="ml-3">{content.title}</span>
      </h2>
      <ol className="mt-6 space-y-4">
        {content.roles.map((role) => (
          <Role key={role.id} content={role}/>
        ))}
      </ol>
      <Button href="#" variant="secondary" className="group mt-6 w-full">
        Download CV
        <ArrowDownIcon className="h-4 w-4 stroke-zinc-400 transition group-active:stroke-zinc-600 dark:group-hover:stroke-zinc-50 dark:group-active:stroke-zinc-50" />
      </Button>
    </div>
  )
}
