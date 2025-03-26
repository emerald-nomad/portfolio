import { createServerFeature } from '@payloadcms/richtext-lexical'
import { LabelNode } from '@/payload/fields/richText/features/label/LabelNode'

export const LabelFeature = createServerFeature({
  feature: {
    ClientFeature: '@/payload/fields/richText/features/label/client#LabelFeatureClient',
    nodes: [
      {
        node: LabelNode,
      },
    ],
  },
  key: 'label',
})
