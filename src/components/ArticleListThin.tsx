import { getPayload } from 'payload'
import config from '@/payload/payload.config'
import { ArticleListThin as IArticleListThin } from '@/payload/payload-types'
import { formatDate } from '@/utils/formatDate'
import { Card } from './Card'

interface ArticleListThinProps {
  content: IArticleListThin
}

export async function ArticleListThin({ content }: ArticleListThinProps) {
  const payload = await getPayload({ config })

  const { docs } = await payload.find({
    collection: 'articles',
    select: {
      title: true,
      description: true,
      slug: true,
      publishedAt: true,
    },
    sort: [content.sort],
    pagination: true,
    limit: content.limit,
  })

  return (
    <div className="flex flex-col gap-16">
      {docs.map((article) => (
        <Article key={article.slug} article={article} />
      ))}
    </div>
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
