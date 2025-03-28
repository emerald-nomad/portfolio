import React from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

export function CodeBlock({
  code,
  language,
}: {
  code: string
  language: string
}) {
  return (
    <SyntaxHighlighter language={language} style={atomDark}>
      {code}
    </SyntaxHighlighter>
  )
}
