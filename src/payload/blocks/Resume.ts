import { Block } from 'payload'

export const Resume: Block = {
  slug: 'resume',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'roles',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'company',
          type: 'text',
          required: true,
        },
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'icon',
          type: 'relationship',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'start',
          type: 'date',
          required: true,
        },
        {
          name: 'end',
          type: 'date',
        },
      ],
    },
  ],
}
