import { getPayload } from 'payload'
import config from '@/payload/payload.config'
import { Container } from '@/components/Container'
import { Newsletter } from '@/components/NewLetter'
// import { Photos } from '@/components/Photos'
import { Resume } from '@/components/Resume'
import {
  XIcon,
  InstagramIcon,
  GitHubIcon,
  LinkedInIcon,
} from '@/components/SocialIcons'
import { SocialLink } from '@/components/SocialLink'
import { Card } from '@/components/Card'
import { formatDate } from '@/utils/formatDate'

export default async function Home() {
  const payload = await getPayload({ config })

  const { docs: articles } = await payload.find({
    collection: 'articles',
    select: {
      title: true,
      description: true,
      slug: true,
      publishedAt: true,
    },
    sort: ['-publishedAt'],
    pagination: true,
    limit: 10,
  })
  return (
    <>
      <Container className="mt-9">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
            Software designer, founder, and amateur astronaut.
          </h1>
          <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
            I’m Spencer, a software designer and entrepreneur based in New York
            City. I’m the founder and CEO of Planetaria, where we develop
            technologies that empower regular people to explore space on their
            own terms.
          </p>
          <div className="mt-6 flex gap-6">
            <SocialLink href="#" aria-label="Follow on X" icon={XIcon} />
            <SocialLink
              href="#"
              aria-label="Follow on Instagram"
              icon={InstagramIcon}
            />
            <SocialLink
              href="#"
              aria-label="Follow on GitHub"
              icon={GitHubIcon}
            />
            <SocialLink
              href="#"
              aria-label="Follow on LinkedIn"
              icon={LinkedInIcon}
            />
          </div>
        </div>
      </Container>
      {/* <Photos /> */}
      <Container className="mt-24 md:mt-28">
        <div className="mx-auto grid max-w-xl grid-cols-1 gap-y-20 lg:max-w-none lg:grid-cols-2">
          <div className="flex flex-col gap-16">
            {articles.map((article) => (
              <Article key={article.slug} article={article} />
            ))}
          </div>
          <div className="space-y-10 lg:pl-16 xl:pl-24">
            <Newsletter />
            <Resume />
          </div>
        </div>
      </Container>
    </>
  )
}

function Article({
  article,
}: {
  article: {
    id: number
    publishedAt: string
    title: string
    slug?: string | null | undefined
    description: string
  }
}) {
  return (
    <Card as="article">
      <Card.Title href={`/articles/${article.slug}`}>
        {article.title}
      </Card.Title>
      <Card.Eyebrow as="time" dateTime={article.publishedAt} decorate>
        {formatDate(article.publishedAt)}
      </Card.Eyebrow>
      <Card.Description>{article.description}</Card.Description>
      <Card.Cta>Read article</Card.Cta>
    </Card>
  )
}
