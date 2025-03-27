'use client';

import React, { useEffect } from "react";
import Prism from "prismjs";
import loadLanguages from 'prismjs/components/';
loadLanguages(['c', 'rust', 'typescript', 'javascript', 'css', 'sass']);

export function CodeBlock({ code, language }: {code: string; language: string}) {
  useEffect(() => {
    Prism.highlightAll();
  }, []);

  return (
    <pre>
      <code className={`language-${language}`}>{code}</code>
    </pre>
  );
}