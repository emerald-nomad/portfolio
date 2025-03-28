import { getPayload } from 'payload'
import config from '@/payload/payload.config'
import { PageBuilder } from '@/components/PageBuilder'
import { notFound } from 'next/navigation'
import { draftMode } from 'next/headers'
import { RefreshRouteOnSave } from '@/components/RefreshRouteOnSave'

export const dynamicParams = true

export async function generateStaticParams() {
  const payload = await getPayload({ config })

  const { docs } = await payload.find({
    collection: 'pages',
    select: {
      slug: true,
    },
  })

  return docs.map((a) => ({ slug: [a.slug] }))
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug?: string[] }>
}) {
  const { isEnabled } = await draftMode()
  const { slug } = await params
  const payload = await getPayload({ config })

  const { docs } = await payload.find({
    collection: 'pages',
    limit: 1,
    draft: isEnabled,
    where: {
      slug: {
        equals: slug ? `/${slug[0]}` : '/',
      },
    },
  })

  const page = docs[0]

  if (!page) {
    return notFound()
  }

  return (
    <>
      <RefreshRouteOnSave />
      <PageBuilder content={page.content[0]} />
    </>
  )
}
