import { executeCode } from '@/utils/utils';
import React, { useEffect, useState } from 'react';

const OutputCode = ({
  code,
  errorCode,
}: {
  code: string;
  errorCode: string;
}) => {
  const [resultType, setResultType] = useState<'compiled' | 'console'>(
    'compiled'
  );

  return (
    <div className="dark:text-white">
      <h1 className="text-2xl  font-bold">Output Code</h1>
      <div className="inline-flex items-center rounded-md mt-5 ">
        <button
          onClick={() => setResultType('compiled')}
          className={`dark:text-white hover:text-blue-600 text-sm bg-white dark:bg-secondary-dark ${
            resultType === 'compiled' && '!bg-slate-100 !text-blue-600'
          } hover:bg-slate-100 border border-slate-200 rounded-l-lg font-medium px-4 py-2 inline-flex space-x-1 items-center`}
        >
          <span>Compiled Code</span>
        </button>
        <button
          onClick={() => setResultType('console')}
          className={`dark:text-white ${
            resultType === 'console' && '!bg-slate-100 !text-blue-600'
          } hover:text-blue-600 text-sm bg-white dark:bg-secondary-dark hover:bg-slate-100 border border-slate-200 font-medium rounded-r-lg px-4 py-2 inline-flex space-x-1 items-center`}
        >
          <span>Console</span>
        </button>
      </div>
      <div className="w-full border text-xl mt-5 p-4 h-[600px] overflow-x-hidden overflow-y-auto">
        {errorCode ? (
          <pre className="text-red-800 break-words whitespace-break-spaces">
            {errorCode}
          </pre>
        ) : code ? (
          <pre className=" break-words dark:text-white whitespace-break-spaces">
            {resultType === 'console' ? executeCode(code) : code}
          </pre>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default OutputCode;
