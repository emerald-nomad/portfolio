import { Block } from 'payload'

export const ProjectList: Block = {
  slug: 'projectList',
  fields: [
   {
    name: "projects",
    type: 'array',
    required: true,
    fields: [
      {
        name: "project",
        type: "relationship",
        relationTo: "projects",
        required: true
      }
    ]
   }
  ],
}
