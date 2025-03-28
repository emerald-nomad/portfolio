import { Page } from '@/payload/payload-types'
import { SimpleLayout } from './SimpleLayout'
import { GalleryLayout } from './GalleryLayout'

interface PageBuilderProps {
  content: Page['content'][0]
}

export function PageBuilder({ content }: PageBuilderProps) {
  function render() {
    switch (content.blockType) {
      case 'simpleLayout':
        return <SimpleLayout content={content} />
      case 'galleryLayout':
        return <GalleryLayout content={content} />
      default:
        // @ts-expect-error Ignore
        return <h1>Block type {content.blockType} not supported</h1>
    }
  }
  return render()
}
