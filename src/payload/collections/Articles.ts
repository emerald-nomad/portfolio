import type { CollectionAfterChangeHook, CollectionConfig } from 'payload'
import { slugField } from '../fields/slug'
import { Article } from '../payload-types'
import { revalidateArticle } from '@/actions/revalidateArticle'

const afterChangeHook: CollectionAfterChangeHook<Article> = async ({ doc }) => {
  if (doc._status == 'published') {
    await revalidateArticle(doc.slug!)
  }

  return doc
}

export const ArticlesCollection: CollectionConfig<'articles'> = {
  slug: 'articles',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'description'],
    livePreview: {
      url: ({ data }) => {
        return `/api/draft?secret=${process.env.PREVIEW_SECRET}&slug=/articles/${data.slug}`
      },
    },
  },
  fields: [
    {
      name: 'publishedAt',
      type: 'date',
      required: true,
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    ...slugField(),
    {
      name: 'description',
      type: 'text',
      required: true,
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
    },
  ],
  versions: {
    drafts: {
      autosave: false,
      schedulePublish: true,
    },
  },
  access: {
    read({ req }) {
      if (req.user) {
        return true
      }

      return {
        or: [
          {
            _status: {
              equals: 'published',
            },
          },
          {
            _status: {
              exists: false,
            },
          },
        ],
      }
    },
  },
  hooks: {
    afterChange: [afterChangeHook],
  },
}
