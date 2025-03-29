import { CollectionAfterChangeHook, CollectionConfig } from 'payload'
import { Page } from '../payload-types'
import { revalidatePage } from '@/actions/revalidatePage'

const afterChangeHook: CollectionAfterChangeHook<Page> = async ({ doc }) => {
  if (doc._status == 'published') {
    await revalidatePage(doc.slug)
  }

  return doc
}

export const PagesCollection: CollectionConfig<'pages'> = {
  slug: 'pages',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug'],
    livePreview: {
      url: ({ data }) => {
        return `/api/draft?secret=${process.env.PREVIEW_SECRET}&slug=${data.slug}`
      },
    },
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
    },
    {
      name: 'content',
      type: 'blocks',
      blocks: [],
      maxRows: 1,
      required: true,
      blockReferences: ['simpleLayout', 'galleryLayout'],
    },
  ],
  versions: {
    drafts: {
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
