import { SimpleLayout as ISimpleLayout } from '@/payload/payload-types'
import { Container } from '@/components/Container'
import { ArticleListWide } from './ArticleListWide'
import { ProjectList } from './ProjectList'
import { TalksList } from './TalksList'

interface SimpleLayoutProps {
  content: ISimpleLayout
}

export function SimpleLayout({ content }: SimpleLayoutProps) {
  function render() {
    return content.content!.map((c) => {
      switch (c.blockType) {
        case 'articleListWide':
          return <ArticleListWide key={c.id} content={c} />
        case 'projectList':
          return <ProjectList key={c.id} content={c} />
        case 'talksLists':
          return <TalksList key={c.id} content={c} />
        default:
          // @ts-expect-error check
          return <h1>Block type {c.blockType} not supported</h1>
      }
    })
  }
  return (
    <Container className="mt-16 sm:mt-32">
      <header className="max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
          {content.title}
        </h1>
        <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
          {content.intro}
        </p>
      </header>
      {content.content && <div className="mt-16 sm:mt-20">{render()}</div>}
    </Container>
  )
}
