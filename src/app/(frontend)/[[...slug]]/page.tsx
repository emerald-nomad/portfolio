import { getPayload } from "payload"
import config from "@/payload/payload.config"
import { PageBuilder } from "@/components/PageBuilder";
import { notFound } from "next/navigation";

export default async function Page({params}: {params: Promise<{slug: string;}>}) {
  const { slug } = await params;
  const payload = await getPayload({ config });

  const { docs } = await payload.find({
    collection: "pages",
    limit: 1,
    where: {
      slug: {
        equals: slug ? `/${slug}`: "/"
      }
    }
  })

  const page = docs[0];

  if (!page) {
    return notFound();
  }

  return <PageBuilder content={page.content[0]} />
}