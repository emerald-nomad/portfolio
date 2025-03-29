import { CollectionAfterChangeHook, CollectionConfig } from 'payload'
import { slugField } from '../fields/slug'
import { Project } from '../payload-types'
import { revalidateProject } from '@/actions/revalidateProject'

const afterChangeHook: CollectionAfterChangeHook<Project> = async ({ doc }) => {
  await revalidateProject(doc.slug!)

  return doc
}

export const ProjectsCollection: CollectionConfig = {
  slug: 'projects',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug', 'description'],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    ...slugField('name'),
    {
      name: 'description',
      type: 'text',
      required: true,
    },
  ],
  hooks: {
    afterChange: [afterChangeHook],
  },
}
