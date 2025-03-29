import { getPayload } from 'payload'
import config from '@/payload/payload.config'
import { TalksLists } from '@/payload/payload-types'
import { Section } from './Section'
import { capitalizeFirstLetter } from '@/utils/capitalizeFirstLetter'
import { Appearance } from './Appearance'

interface SpeakingSectionProps {
  content: TalksLists['sections'][0]
}

export async function SpeakingSection({ content }: SpeakingSectionProps) {
  const payload = await getPayload({ config })

  const { docs } = await payload.find({
    collection: 'talks',
    select: {
      name: true,
      description: true,
      slug: true,
      event: true,
    },
    sort: [content.sort],
    pagination: true,
    limit: content.limit,
    where: {
      type: {
        equals: content.type,
      },
    },
  })

  let cta: string

  switch (content.type) {
    case 'conference':
    case 'meetup':
      cta = 'Watch video'
      break
    case 'podcast':
      cta = 'Listen to podcast'
      break
  }

  return (
    <Section title={`${capitalizeFirstLetter(content.type)}s`}>
      <div className="space-y-16">
        {docs.map((a) => (
          <Appearance key={a.id} cta={cta} {...a} />
        ))}
      </div>
    </Section>
  )
}
