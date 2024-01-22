'use client';
import DOMPurify from 'dompurify';
import { useMonaco } from '@monaco-editor/react';
import {
  MonacoTailwindcss,
  configureMonacoTailwindcss,
  tailwindcssData,
} from 'monaco-tailwindcss';
import { useCallback, useEffect, useState } from 'react';
import InputTailwindCode from './InputTailwindCode';
import { useTheme } from '@/store/useThemeStore';
import SkeletonLoader from './SkeletonLoader';
import { useLayoutState } from '@/store/useLayoutStore';

type Tprops = {
  html: string;
  css: string;
  config: string;
  editorType: 'html' | 'css' | 'config';
  setEditorType: (value: Tprops['editorType']) => void;
  setHtml: (value: string) => void;
  setCss: (value: string) => void;
  setConfig: (value: any) => void;
};

const OutputTailwindCode = ({
  html,
  css,
  config,
  editorType,
  setEditorType,
  setConfig,
  setCss,
  setHtml,
}: Tprops) => {
  const monaco = useMonaco();
  const { theme } = useTheme((satte) => satte);

  const [monacoTailwindCSS, setMonacoTailwindCSS] =
    useState<MonacoTailwindcss>();
  const [output, setOutput] = useState('');
  const [preview, setPreview] = useState(true);

  useEffect(() => {
    window.MonacoEnvironment = {
      getWorker(moduleId, label) {
        switch (label) {
          case 'editorWorkerService':
            return new Worker(
              new URL(
                'monaco-editor/esm/vs/editor/editor.worker',
                import.meta.url
              )
            );
          case 'css':
          case 'less':
          case 'scss':
            return new Worker(
              new URL(
                'monaco-editor/esm/vs/language/css/css.worker',
                import.meta.url
              )
            );
          case 'handlebars':
          case 'html':
          case 'razor':
            return new Worker(
              new URL(
                'monaco-editor/esm/vs/language/html/html.worker',
                import.meta.url
              )
            );
          case 'json':
            return new Worker(
              new URL(
                'monaco-editor/esm/vs/language/json/json.worker',
                import.meta.url
              )
            );
          case 'javascript':
          case 'typescript':
            return new Worker(
              new URL(
                'monaco-editor/esm/vs/language/typescript/ts.worker',
                import.meta.url
              )
            );
          case 'tailwindcss':
            return new Worker(
              new URL('monaco-tailwindcss/tailwindcss.worker', import.meta.url)
            );
          default:
            throw new Error(`Unknown label ${label}`);
        }
      },
    };
  }, []);
  const { layout } = useLayoutState((s) => s);
  useEffect(() => {
    if (monaco) {
      monaco?.languages.css.cssDefaults.setOptions({
        data: {
          dataProviders: {
            tailwindcssData,
          },
        },
      });

      const monacoTailwindCSSConfig = configureMonacoTailwindcss(monaco, {
        tailwindConfig: JSON.parse(config),
      });
      setMonacoTailwindCSS(monacoTailwindCSSConfig);
    }
  }, [monaco, config]);

  const generateOutput = useCallback(async () => {
    const content = await monacoTailwindCSS?.generateStylesFromContent(css, [
      {
        content: `<!doctype html>
      <html lang="en">
        <head>
          <meta charset="utf-8" />
        </head>
        <body>
        ${html}
        </body>
      </html>
      `,
        extension: '.html',
      },
    ]);
    if (content) {
      setOutput(content);
    }
  }, [css, html, monacoTailwindCSS]);

  useEffect(() => {
    try {
      generateOutput();
    } catch (error) {
      console.log(error);
    }
  }, [generateOutput, html, config]);

  return (
    <div
      className={`grid  gap-8  ${
        layout === 'row' ? 'grid-cols-2' : 'grid-cols-1'
      }`}
    >
      <InputTailwindCode
        monaco={monacoTailwindCSS}
        setValue={
          editorType === 'html'
            ? setHtml
            : editorType === 'css'
            ? setCss
            : setConfig
        }
        value={
          editorType === 'config' ? config : editorType === 'css' ? css : html
        }
        setEditorType={setEditorType}
        editorType={editorType}
        theme={theme}
      />
      <div className=" w-full  mt-5">
        <h1 className="text-2xl dark:text-white font-bold">Output</h1>
        <div className="inline-flex items-center rounded-md mt-5 ">
          <button
            onClick={() => setPreview(true)}
            className={` ${
              preview && '!text-blue-600 !bg-slate-100 dark:!bg-slate-100 '
            } dark:text-white hover:text-blue-600 text-sm bg-white dark:!bg-secondary-dark
             hover:bg-slate-100 border border-slate-200 rounded-l-lg font-medium px-4 py-2 inline-flex space-x-1 items-center`}
          >
            <span>Preview</span>
          </button>
          <button
            onClick={() => setPreview(false)}
            className={`${
              !preview && '!text-blue-600 bg-slate-100 dark:!bg-slate-100'
            } dark:text-white hover:text-blue-600 text-sm bg-white dark:!bg-secondary-dark
             hover:bg-slate-100 border rounded-r-lg border-slate-200  font-medium px-4 py-2 inline-flex space-x-1 items-center`}
          >
            <span>Compiled CSS</span>
          </button>
        </div>

        <div className="mt-5 border h-[550px] overflow-y-auto">
          {output ? (
            preview ? (
              <div
                dangerouslySetInnerHTML={{
                  __html: `<html>
      <head>   <style>${DOMPurify.sanitize(output)}</style></head>

     <body class=''>${DOMPurify.sanitize(html)}</body>
      </html>`,
                }}
              ></div>
            ) : (
              <div className="dark:text-white">
                {DOMPurify.sanitize(
                  output.replace(
                    /\/\*[\s\S]*?\*\/|(?<=[^:])\/\/.*|^\/\/.*/g,
                    ''
                  )
                )}
              </div>
            )
          ) : (
            <SkeletonLoader />
          )}
        </div>
      </div>
    </div>
  );
};

export default OutputTailwindCode;
