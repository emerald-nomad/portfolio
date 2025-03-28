import { languages } from '@/utils/languages'
import { BlocksFeature, lexicalEditor, type FeatureProviderServer } from '@payloadcms/richtext-lexical'
import type { RichTextField } from 'payload'

type RichText = (
  overrides?: Partial<RichTextField>,
  additionalFeatures?: FeatureProviderServer[],
) => RichTextField

const richText: RichText = (overrides = {}): RichTextField => {
  const overridesToMerge = overrides ? overrides : {}

  return {
    name: 'richText',
    type: 'richText',
    required: true,
    editor: lexicalEditor({
    features: ({ defaultFeatures }) => [
      ...defaultFeatures,
      BlocksFeature({
        blocks: [
          {
            slug: 'Code',
            fields: [
              {
                type: 'select',
                name: 'language',
                options: Object.entries(languages).map(([key, value]) => ({
                  label: value,
                  value: key,
                })),
                defaultValue: 'ts',
              },
              {
                admin: {
                  components: {
                    Field: '@/payload/fields/richText/Code#Code',
                  },
                },
                name: 'code',
                type: 'code',
              },
            ],
          }
        ],
        inlineBlocks: [],
      }),
    ],
  }),
    ...overridesToMerge,
  }
}

export default richText
