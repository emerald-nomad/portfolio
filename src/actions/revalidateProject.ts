'use server'

import { revalidatePath } from 'next/cache'

export async function revalidateProject(slug: string) {
  revalidatePath('/projects')
  revalidatePath(`/projects/${slug}`)
}