import { DefaultNodeTypes } from '@payloadcms/richtext-lexical'
import { JSXConvertersFunction, RichText as PayloadRichText } from '@payloadcms/richtext-lexical/react'
import { ComponentProps } from 'react'
import { CodeBlock } from './CodeBlock'
import Image from 'next/image'
import { Media } from '@/payload/payload-types'

type NodeTypes = DefaultNodeTypes

interface CodeNode {
  type: "block";
  fields: {
    id: string;
    blockType: "Code";
    code: string;
    language: string
  }
}

const jsxConverters: JSXConvertersFunction<NodeTypes> = ({
  defaultConverters,
}) => ({
  ...defaultConverters,
  // Override the default upload converter
  upload: ({ node }) => {
    const {url, alt, height, width} = (node.value as Media);
    
    return <Image src={url!} alt={alt} width={width!} height={height!} />
  },
  blocks: {
    Code: ({node}: { node: CodeNode }) => {
      const {fields} = node;
      return <CodeBlock code={fields.code} language={fields.language!} />
    }
  }
})

export function RichText(props: ComponentProps<typeof PayloadRichText>) {
  return (
    <PayloadRichText
      {...props} 
      converters={jsxConverters}
    />
  ); 
}