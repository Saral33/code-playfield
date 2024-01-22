'use client';

import Column from '@/components/Column';
import ScrollToTop from '@/components/ScrollToToTop';
import {
  cssDefault,
  defaultTailwind,
  htmlBody,
} from '@/expressions/tailwindCode';
import dynamic from 'next/dynamic';

import React, { useState } from 'react';
const OutputTailwindCode = dynamic(
  () => import('@/components/OutputTailwindCode'),
  { ssr: false }
);
const TailwindPG = () => {
  const [htmlCode, setHtmlCode] = useState(htmlBody);
  const [cssCode, setCssCode] = useState(cssDefault);
  const [config, setConfig] = useState(defaultTailwind);
  const [editorType, setEditorType] = useState<'html' | 'css' | 'config'>(
    'html'
  );

  return (
    <>
      <ScrollToTop />
      <div className="w-full h-full  pt-2">
        <div className="container mx-auto">
          <Column />
          <div className=" w-full gap-8">
            {typeof window !== null && (
              <OutputTailwindCode
                setHtml={setHtmlCode}
                setCss={setCssCode}
                setConfig={setConfig}
                setEditorType={setEditorType}
                editorType={editorType}
                config={JSON.stringify(config)}
                html={htmlCode}
                css={cssCode}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default TailwindPG;
