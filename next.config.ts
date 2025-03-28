import withPayload from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  experimental: {
    reactCompiler: false,
  },
  images: {
    remotePatterns: [
      {
        hostname: 'l8vv6jxo8e4sjnrh.public.blob.vercel-storage.com',
        protocol: 'https',
      },
    ],
  },
}

export default withPayload(nextConfig)
