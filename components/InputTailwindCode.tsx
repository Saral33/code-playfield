'use client';
import React from 'react';
import Editor from '@monaco-editor/react';
import { MonacoTailwindcss } from 'monaco-tailwindcss';
type IProps = {
  theme: string;
  editorType: 'html' | 'css' | 'config';
  setEditorType: (value: IProps['editorType']) => void;
  value: string;
  setValue: (value: string | any) => void;
  monaco: any;
};
const InputTailwindCode = ({
  theme,
  editorType,
  setEditorType,
  value,
  setValue,
  monaco,
}: IProps) => {
  return (
    <div className="w-full">
      <div className="inline-flex items-center rounded-md mt-5 ">
        <button
          onClick={() => setEditorType('html')}
          className={` ${
            editorType === 'html' &&
            'text-blue-600 !bg-slate-100 dark:!bg-slate-100 dark:!text-blue-600'
          } dark:text-white hover:text-blue-600 text-sm bg-white dark:!bg-secondary-dark
           hover:bg-slate-100 border border-slate-200 rounded-l-lg font-medium px-4 py-2 inline-flex space-x-1 items-center`}
        >
          <span>HTML</span>
        </button>
        <button
          onClick={() => setEditorType('css')}
          className={`${
            editorType === 'css' &&
            'text-blue-600 !bg-slate-100 dark:!bg-slate-100  dark:!text-blue-600'
          } dark:text-white hover:text-blue-600 text-sm bg-white dark:!bg-secondary-dark
           hover:bg-slate-100 border border-slate-200  font-medium px-4 py-2 inline-flex space-x-1 items-center`}
        >
          <span>CSS</span>
        </button>
        <button
          onClick={() => setEditorType('config')}
          className={`${
            editorType === 'config' &&
            'text-blue-600 !bg-slate-100 dark:!bg-slate-100 dark:!text-blue-600'
          } dark:text-white hover:text-blue-600 text-sm bg-white dark:!bg-secondary-dark
           hover:bg-slate-100 border border-slate-200 rounded-r-lg font-medium px-4 py-2 inline-flex space-x-1 items-center`}
        >
          <span>Config</span>
        </button>
      </div>
      <div className=" mt-4 bg-slate-200 shadow-2xl border">
        <Editor
          value={value}
          onChange={(val: any) =>
            editorType === 'config'
              ? (monaco?.setTailwindConfig(JSON.parse(value)),
                setValue(JSON.parse(val)))
              : setValue(val)
          }
          options={{
            padding: { top: 25 },
            fontSize: 16,
            wordBreak: 'normal',
          }}
          language={`${editorType === 'config' ? 'json' : editorType}`}
          theme={theme === 'light' ? theme : 'vs-dark'}
          // onChange={(val) => setValue(val as string)}
          height={'600px'}
          width={'100%'}
        />
      </div>
    </div>
  );
};

export default InputTailwindCode;
