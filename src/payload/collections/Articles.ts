import type { CollectionAfterChangeHook, CollectionConfig } from "payload";
import { slugField } from "../fields/slug";
import { Article } from "../payload-types";
import { revalidateArticle } from "@/actions/revalidateArticle";

const afterChangeHook: CollectionAfterChangeHook<Article> = async ({ doc }) => {
  await revalidateArticle(doc.slug!);

  return doc;
}

export const ArticlesCollection: CollectionConfig<"articles"> = {
  slug: "articles",
  fields: [
    {
      name: "publishedAt",
      type: "date",
      required: true
    },
    {
      name: "title",
      type: "text",
      required: true,
    },
    ...slugField(),
    {
      name: "description",
      type: "text",
      required: true,
    },
    {
      name: "content",
      type: "blocks",
      blockReferences: ["blogContent", "code", "mediaBlock"],
      blocks: [],
      required: true,
    },
  ],
  admin: {
    livePreview: {
      url: ({ data }) => {
        return `/articles/${data.slug}`
      }
    }
  },
  versions: {
    drafts: {
      autosave: true,
      schedulePublish: true
    },
  },
  access: {
    read({req}) {
      if (req.user) return true;

      return {
        _status: {
          equals: 'published',
        },
      }
    }
  },
  hooks: {
    afterChange: [
      afterChangeHook
    ]
  }
};

