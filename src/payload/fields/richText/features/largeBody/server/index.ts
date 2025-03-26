import { createServerFeature } from '@payloadcms/richtext-lexical'
import { LargeBodyNode } from '../LargeBodyNode'

export const LargeBodyFeature = createServerFeature({
  feature: {
    ClientFeature: '@root/fields/richText/features/largeBody/client#LargeBodyFeatureClient',
    nodes: [
      {
        node: LargeBodyNode,
      },
    ],
  },
  key: 'largeBody',
})
