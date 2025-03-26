// import { getPayload } from "payload"
// import config from "@/payload/payload.config"
import { SimpleLayout } from "@/components/SimpleLayout";
import { Card } from "@/components/Card";
import { formatDate } from "@/utils/formatDate";
// import { formatDate } from "@/utils/formatDate";

export default async function ArticlesPages() {
  // const payload = await getPayload({ config });

  // const {docs} = await payload.find({
  //   collection: "articles",
  //   select: {
  //     title: true,
  //     description: true,
  //     slug: true,
  //     publishedAt: true
  //   }
  // });
  const docs: {
    id: number;
    title: string;
    slug?: string | null | undefined;
    description: string;
    publishedAt: string;
}[] = []

  return (
     <SimpleLayout
      title="Writing on software design, company building, and the aerospace industry."
      intro="All of my long-form thoughts on programming, leadership, product design, and more, collected in chronological order."
    >
      <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
        <div className="flex max-w-3xl flex-col space-y-16">
          {docs.map((article) => (
            <Article key={article.id} article={article} />
          ))}
        </div>
      </div>
    </SimpleLayout>
  );
}

function Article({ article }: { article: {
    id: number;
    title: string;
    slug?: string | null | undefined;
    description: string;
    publishedAt: string;
} }) {
  return (
    <article className="md:grid md:grid-cols-4 md:items-baseline">
      <Card className="md:col-span-3">
        <Card.Title href={`/articles/${article.slug}`}>
          {article.title}
        </Card.Title>
        <Card.Eyebrow
          as="time"
          dateTime={article.publishedAt}
          className="md:hidden"
          decorate
        >
          {formatDate(article.publishedAt)}
        </Card.Eyebrow>
        <Card.Description>{article.description}</Card.Description>
        <Card.Cta>Read article</Card.Cta>
      </Card>
      <Card.Eyebrow
        as="time"
        dateTime={article.publishedAt}
        className="mt-1 max-md:hidden"
      >
        {formatDate(article.publishedAt!)}
      </Card.Eyebrow>
    </article>
  )
}