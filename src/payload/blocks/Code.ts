import type { Block } from 'payload'

// import { blockFields } from '@/payload/fields/blockFields'
// import codeBlips from '@/payload/fields/codeBlips'

export const Code: Block = {
  slug: 'code',
  // fields: [
  //   blockFields({
  //     name: 'codeFields',
  //     fields: [
  //       {
  //         name: 'language',
  //         type: 'select',
  //         defaultValue: 'none',
  //         options: [
  //           {
  //             label: 'None',
  //             value: 'none',
  //           },
  //           {
  //             label: 'JavaScript',
  //             value: 'js',
  //           },
  //           {
  //             label: 'TypeScript',
  //             value: 'ts',
  //           },
  //         ],
  //       },
  //       {
  //         name: 'code',
  //         type: 'code',
  //         required: true,
  //       },
  //       codeBlips,
  //     ],
  //   }),
  // ],
    fields: [
        {
          name: 'language',
          type: 'select',
          defaultValue: 'none',
          options: [
            {
              label: 'None',
              value: 'none',
            },
            {
              label: "C",
              value: 'c'
            },
            {
              label: 'JavaScript',
              value: 'js',
            },
            {
              label: 'TypeScript',
              value: 'ts',
            },
            {
              label: 'Rust',
              value: 'rust'
            }
          ],
        },
        {
          name: 'code',
          type: 'code',
          required: true,
        },
        // codeBlips,
      ],
}
