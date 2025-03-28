import type { Block } from 'payload'

// import { blockFields } from '@/payload/fields/blockFields'
import richText from '@/payload/fields/richText'

export const BlogContent: Block = {
  slug: 'blogContent',
  fields: [
    richText(),
    // blockFields({
    //   name: 'blogContentFields',
    //   fields: [richText()],
    // }),
  ],
}
