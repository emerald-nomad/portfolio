import { languages } from '@/utils/languages'
import type { Block } from 'payload'

// import { blockFields } from '@/payload/fields/blockFields'
// import codeBlips from '@/payload/fields/codeBlips'

export const Code: Block =   {
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
                    Field: '@/payload/components/Code#Code',
                  },
                },
                name: 'code',
                type: 'code',
              },
            ],
          }
