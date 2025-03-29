import { TalksLists } from '@/payload/payload-types'
import { SpeakingSection } from './SpeakingSection'

interface TalksListProps {
  content: TalksLists
}

export function TalksList({ content }: TalksListProps) {
  return (
    <div className="space-y-20">
      {content.sections.map((s) => (
        <SpeakingSection key={s.id} content={s} />
      ))}
    </div>
  )
}
