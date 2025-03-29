'use server'

import { revalidatePath } from 'next/cache'

export async function revalidateTalk(slug: string) {
  revalidatePath('/speaking')
  revalidatePath(`/speaking/${slug}`)
}
