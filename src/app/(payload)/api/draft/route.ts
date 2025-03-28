import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'

const previewSecret = process.env.PREVIEW_SECRET

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const secret = searchParams.get('secret')
  const slug = searchParams.get('slug')

  if (secret !== previewSecret || !slug) {
    return new Response('Invalid token', { status: 401 })
  }

  const draft = await draftMode()
  draft.enable()

  redirect(slug)
}
