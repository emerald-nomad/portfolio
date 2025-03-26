import sharp from 'sharp'
import path from 'path'
import { fileURLToPath } from 'url'
import { BlocksFeature, FixedToolbarFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import { vercelPostgresAdapter } from '@payloadcms/db-vercel-postgres'
import { buildConfig } from 'payload'
import { PostsCollection } from './collections/Posts'
import { BlogContent } from './blocks/BlogContent'
import { Code } from './blocks/Code'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  // Define and configure your collections in this array
  collections: [PostsCollection],

  // Your Payload secret - should be a complex and secure string, unguessable
  secret: process.env.PAYLOAD_SECRET || '',
  // Whichever Database Adapter you're using should go here
  // Mongoose is shown as an example, but you can also use Postgres
  db: vercelPostgresAdapter(),
  // If you want to resize images, crop, set focal point, etc.
  // make sure to install it and pass it to the config.
  // This is optional - if you don't need to do these things,
  // you don't need it!
  sharp,
   // If you'd like to use Rich Text, pass your editor here
  blocks: [Code, BlogContent],
  editor: lexicalEditor({
    features: ({defaultFeatures}) => ([
      ...defaultFeatures, 
      FixedToolbarFeature(), 
      BlocksFeature({
        blocks: []
      })
    ])
  }),
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
})