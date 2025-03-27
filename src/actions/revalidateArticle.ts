'use server'
 
import { revalidatePath } from 'next/cache'
 
export async function revalidateArticle(slug: string) {
  revalidatePath("/articles")
  revalidatePath(`/articles/${slug}`)
}