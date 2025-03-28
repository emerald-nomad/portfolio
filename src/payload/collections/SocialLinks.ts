import { CollectionConfig } from 'payload'

export const SocialLinksCollection: CollectionConfig = {
  slug: 'socialLinks',
  admin: {
    useAsTitle: "text"
  },
  fields: [
    {
      name: 'text',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
    },
    {
      name: "icon",
      type: "select",
      required: true,
      options: [
        {
          label: "ArrowDown",
          value: "arrowDown"
        },
        {
          label: "Briefcase",
          value: "briefcase"
        },
        {
          label: "Github",
          value: "github"
        },
        {
          label: "Instagram",
          value: "instagram"
        },
        {
          label: "LinkedIn",
          value: "linkedIn"
        },
        {
          label: "Mail",
          value: "mail"
        },
        {
          label: "X",
          value: "x"
        }
      ]
    }
  ],
}
