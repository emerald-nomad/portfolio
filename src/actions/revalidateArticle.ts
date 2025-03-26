'use server'
 
import { revalidatePath } from 'next/cache'
 
export async function revalidateArticle(slug: string) {
  // Invalidate the /posts route in the cache
  revalidatePath(`/articles/${slug}`)
}