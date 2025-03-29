import { getPayload } from 'payload'
import config from '@/payload/payload.config'
import { RefreshRouteOnSave } from '@/components/RefreshRouteOnSave'
import { Container } from '@/components/Container'
import { draftMode } from 'next/headers'

export const dynamicParams = true

export async function generateStaticParams() {
  const payload = await getPayload({ config })

  const { docs } = await payload.find({
    collection: 'talks',
    select: {
      slug: true,
    },
  })

  return docs.map((a) => ({ slug: a.slug }))
}

export default async function TalkPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { isEnabled } = await draftMode()
  const payload = await getPayload({ config })
  const { slug } = await params

  const { docs } = await payload.find({
    collection: 'talks',
    draft: isEnabled,
    limit: 1,
    where: { slug: { equals: slug } },
  })

  const talk = docs[0]

  return (
    <>
      <RefreshRouteOnSave />
      <Container className="mt-16 lg:mt-32">
        <div className="xl:relative">
          <div className="mx-auto max-w-2xl">
            <article>
              <header className="flex flex-col">
                <h1 className="mt-6 text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
                  {talk.name}
                </h1>
              </header>
            </article>
          </div>
        </div>
      </Container>
    </>
  )
}
