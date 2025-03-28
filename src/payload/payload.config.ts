import sharp from 'sharp'
import path from 'path'
import { fileURLToPath } from 'url'
import {
  BlocksFeature,
  FixedToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { vercelPostgresAdapter } from '@payloadcms/db-vercel-postgres'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import { buildConfig } from 'payload'
import { ArticlesCollection } from './collections/Articles'
import { Code } from './blocks/Code'
import { MediaCollection } from './collections/Media'
import { migrations } from '../../migrations'
import { PagesCollection } from './collections/Pages'
import { SimpleLayout } from './blocks/SimpleLayout'
import { GalleryLayout } from './blocks/GalleryLayout'
import { SocialLinksCollection } from './collections/SocialLinks'
import { ArticleListWide } from './blocks/ArticleListWide'
import { ArticleListThin } from './blocks/ArticleListThin'
import { NewsLetter } from './blocks/NewsLetter'
import { Resume } from './blocks/Resume'
import { ProjectsCollection } from './collections/Projects'
import { ProjectList } from './blocks/ProjectList'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  // Define and configure your collections in this array
  collections: [
    ArticlesCollection,
    MediaCollection,
    PagesCollection,
    ProjectsCollection,
    SocialLinksCollection,
  ],
  globals: [],
  // Your Payload secret - should be a complex and secure string, unguessable
  secret: process.env.PAYLOAD_SECRET || '',
  // Whichever Database Adapter you're using should go here
  // Mongoose is shown as an example, but you can also use Postgres
  db: vercelPostgresAdapter({
    migrationDir: 'migrations',
    prodMigrations: migrations,
  }),
  // If you want to resize images, crop, set focal point, etc.
  // make sure to install it and pass it to the config.
  // This is optional - if you don't need to do these things,
  // you don't need it!
  sharp,
  // If you'd like to use Rich Text, pass your editor here
  blocks: [
    ArticleListThin,
    ArticleListWide,
    Code,
    GalleryLayout,
    NewsLetter,
    ProjectList,
    SimpleLayout,
    Resume
  ],
  editor: lexicalEditor({
    features: ({ defaultFeatures }) => [
      ...defaultFeatures,
      FixedToolbarFeature(),
      BlocksFeature({
        blocks: [Code],
      }),
    ],
  }),
  plugins: [
    vercelBlobStorage({
      cacheControlMaxAge: 60 * 60 * 24 * 365, // 1 year
      collections: {
        media: {
          generateFileURL: ({ filename }) =>
            `https://l8vv6jxo8e4sjnrh.public.blob.vercel-storage.com/${filename}`,
        },
      },
      enabled: Boolean(process.env.BLOB_STORAGE_ENABLED) || false,
      token: process.env.BLOB_READ_WRITE_TOKEN || '',
    }),
  ],
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
})
