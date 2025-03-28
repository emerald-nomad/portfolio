import { Block } from 'payload'

export const GalleryLayout: Block = {
  slug: 'galleryLayout',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'intro',
      type: 'text',
      required: true,
    },
    {
      name: 'photos',
      type: 'array',
      maxRows: 5,
      fields: [
        {
          name: 'photo',
          type: 'relationship',
          relationTo: 'media',
        },
      ],
    },
    {
      type: 'tabs',
      tabs: [
        {
          name: 'leftSide',
          fields: [
            {
              name: 'content',
              type: 'blocks',
              blocks: [],
              blockReferences: ['articleListThin'],
            },
          ],
        },
        {
          name: 'rightSide',
          fields: [],
        },
      ],
    },
  ],
}
