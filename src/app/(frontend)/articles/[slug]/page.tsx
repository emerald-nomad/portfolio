import { getPayload } from "payload"
import { RichText } from '@payloadcms/richtext-lexical/react'
import config from "@/payload/payload.config"
import { Container } from "@/components/Container";
import { formatDate } from "@/utils/formatDate";
import clsx from 'clsx'
import { ArticleBackButton } from "@/components/ArticleBackButton";
import { CodeBlock } from "@/components/CodeBlock";
import { Media } from "@/payload/payload-types";
import Image from "next/image";
import { RefreshRouteOnSave } from "@/components/RefreshRouteOnSave";
import { draftMode } from "next/headers";

export const dynamicParams = true

export async function generateStaticParams() {
  const { isEnabled } = await draftMode()
  const payload = await getPayload({ config });

  const {docs} = await payload.find({
    collection: "articles",
    draft: isEnabled,
    select: {
      slug: true
    }
  });

  return docs.map(a => ({slug: a.slug}));
}

export default async function ArticlePage({params}: {params: Promise<{slug: string; id: string;}>}) {
  const { isEnabled } = await draftMode()
  const payload = await getPayload({ config });
  const {slug} = await params;

  const {docs} = await payload.find({
    collection: "articles", 
    draft: isEnabled,
    limit: 1,
    where: { slug: { equals: slug } },
  })
  const article = docs[0];

  return (
    <>
     <RefreshRouteOnSave />
      <Container className="mt-16 lg:mt-32">
      <div className="xl:relative">
         <div className="mx-auto max-w-2xl">
           <ArticleBackButton />
           <article>
            <header className="flex flex-col">
              <h1 className="mt-6 text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
                {article.title}
              </h1>
              <time
                dateTime={article.publishedAt}
                className="order-first flex items-center text-base text-zinc-400 dark:text-zinc-500"
              >
                <span className="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500" />
                <span className="ml-3">{formatDate(article.publishedAt!)}</span>
              </time>
            </header>
             <div className={clsx("mt-8", 'prose dark:prose-invert')} data-mdx-content> 
                {article.content.map(c => {
                  switch(c.blockType) {
                    case "blogContent":
                      return <RichText key={c.id} data={c.richText} />
                    case "code":
                      return <CodeBlock key={c.id} code={c.code} language={c.language!} />;

                    case "mediaBlock":
                      const media = c.media as Media;
                      return <Image key={c.id} width={media.width!} height={media.height!} src={media.url!} alt={media.alt}  />
                  }
                })}
             </div>
          </article>
         </div>
      </div>
    </Container>
    </>
  );
}