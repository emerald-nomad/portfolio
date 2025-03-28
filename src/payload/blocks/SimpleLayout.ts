import { Block } from 'payload'

export const SimpleLayout: Block = {
  slug: 'simpleLayout',
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
      name: 'content',
      type: 'blocks',
      blocks: [],
      blockReferences: ['articleListWide', 'projectList'],
    },
  ],
}
