'use client';

import OutputTailwindCode from '@/components/OutputTailwindCode';
import {
  cssDefault,
  defaultTailwind,
  htmlBody,
} from '@/expressions/tailwindCode';

import React, { useState } from 'react';

const TailwindPG = () => {
  const [htmlCode, setHtmlCode] = useState(htmlBody);
  const [cssCode, setCssCode] = useState(cssDefault);
  const [config, setConfig] = useState(defaultTailwind);
  const [editorType, setEditorType] = useState<'html' | 'css' | 'config'>(
    'html'
  );

  return (
    <div className="w-full h-full  pt-20">
      <div className="container mx-auto">
        <div className=" w-full gap-8">
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
        </div>
      </div>
    </div>
  );
};

export default TailwindPG;
