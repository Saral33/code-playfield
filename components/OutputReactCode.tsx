import { executeReactCode } from '@/utils/utils';
import React, { useCallback, useEffect } from 'react';
import * as ReactDOM from 'react-dom';
type TReactOutputProps = {
  outputCode: string;
  errorCode: string;
};

const OutputReactCode = ({ outputCode }: TReactOutputProps) => {
  const genarte = useCallback(async () => {
    const Preview: any = await executeReactCode(outputCode, { react: React });

    // eslint-disable-next-line react/no-deprecated
    ReactDOM.render(<Preview />, document.getElementById('react-root'));
  }, [outputCode]);
  useEffect(() => {
    if (outputCode) {
      genarte();
    }
  }, [outputCode, genarte]);
  return (
    <div className=" w-full  ">
      <h1 className="text-2xl dark:text-white font-bold">Output Preview</h1>
      <div className="border mt-5 overflow-y-auto h-[600px]">
        <div id="react-root"></div>
      </div>
    </div>
  );
};

export default OutputReactCode;
