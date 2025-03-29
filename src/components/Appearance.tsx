import { Card } from "./Card"

interface AppearanceProps {
    id: number;
    name: string;
    slug?: string | null | undefined;
    description: string;
    event: string;
    cta: string;
}


export function Appearance({
  name,
  description,
  event,
  cta,
  slug,
}: AppearanceProps) {
  return (
    <Card as="article">
      <Card.Title as="h3" href={`/speaking/${slug!}`}>
        {name}
      </Card.Title>
      <Card.Eyebrow decorate>{event}</Card.Eyebrow>
      <Card.Description>{description}</Card.Description>
      <Card.Cta>{cta}</Card.Cta>
    </Card>
  )
}