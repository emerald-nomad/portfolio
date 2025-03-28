import { GalleryLayout as IGalleryLayout, SocialLink as ISocialLInk } from '@/payload/payload-types'
import { Container } from './Container'
import { ArticleListThin } from './ArticleListThin'
import { Photos } from './Photos'
import Link from 'next/link'
import { GitHubIcon, InstagramIcon, LinkedInIcon, XIcon } from './SocialIcons'
import { Newsletter } from './NewsLetter'
import { Resume } from './Resume'

interface GalleryLayoutProps {
  content: IGalleryLayout
}

export function GalleryLayout({ content }: GalleryLayoutProps) {
  function renderLeftSide() {
    return content.leftSide!.content!.map((c) => {
      switch (c.blockType) {
        case 'articleListThin':
          return <ArticleListThin key={c.id} content={c} />
        default:
          return <h1>Block type {content.blockType} not supported</h1>
      }
    })
  }

  function renderRightSide() {
    return content.rightSide!.content!.map(c => {
      switch (c.blockType) {
        case 'newsLetter':
          return <Newsletter key={c.id} content={c} />
        case "resume":
          return <Resume key={c.id} content={c} />
        default:
          return <h1>Block type {content.blockType} not supported</h1>
      }
    })
  }

  const {socialLinks} = content;

  return (
    <>
      <Container className="mt-9">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
            {content.title}
          </h1>
          <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
            {content.intro}
          </p>
          <div className="mt-6 flex gap-6">
            {
              socialLinks && socialLinks.map(({link, id}) => {
                const l = link as ISocialLInk;
                let icon;

                switch (l.icon) {
                  case "x":
                    icon = XIcon;
                    break;
                  case "github":
                    icon = GitHubIcon;
                    break;
                  case "instagram":
                    icon = InstagramIcon;
                    break;
                  case "linkedIn":
                    icon = LinkedInIcon;
                    break;
                  default:
                    icon = XIcon 
                }

                return <SocialLink key={id} href={l.slug} aria-label="Follow on X" icon={icon} />
              })
            }
          </div>
        </div>
      </Container>
      <Photos photos={content.photos} />
      <Container className="mt-24 md:mt-28">
        <div className="mx-auto grid max-w-xl grid-cols-1 gap-y-20 lg:max-w-none lg:grid-cols-2">
          <div className="flex flex-col gap-16">{renderLeftSide()}</div>
          <div className="space-y-10 lg:pl-16 xl:pl-24">
            {renderRightSide()}
          </div>
        </div>
      </Container>
    </>
  )
}

function SocialLink({
  icon: Icon,
  ...props
}: React.ComponentPropsWithoutRef<typeof Link> & {
  icon: React.ComponentType<{ className?: string }>
}) {
  return (
    <Link className="group -m-1 p-1" {...props}>
      <Icon className="h-6 w-6 fill-zinc-500 transition group-hover:fill-zinc-600 dark:fill-zinc-400 dark:group-hover:fill-zinc-300" />
    </Link>
  )
}