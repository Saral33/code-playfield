'use client';

import Column from '@/components/Column';
import OutputReactCode from '@/components/OutputReactCode';
import ReactInputCode from '@/components/ReactInputCode';
import ScrollToTop from '@/components/ScrollToToTop';
import { useLayoutState } from '@/store/useLayoutStore';
import { useTheme } from '@/store/useThemeStore';
import initSwc, { transformSync } from '@swc/wasm-web';
import React, { useCallback, useEffect, useState } from 'react';

const defaultCode = `
//Always use export default for the component 
//you wanna see the preview
import React, { useState } from 'react';

const App = () => {
  // State to manage the button click
  const [buttonClicked, setButtonClicked] = useState(false);

  // Inline styles for the button
  const buttonStyle = {
    padding: '10px',
    fontSize: '16px',
    backgroundColor: buttonClicked ? 'green' : 'blue',
    color: 'white',
    borderRadius: '5px',
    cursor: 'pointer',
  };

  // Event handler for button click
  const handleButtonClick = () => {
    setButtonClicked(!buttonClicked);
  };

  return (
    <div  style={{padding:'30px',marginTop:'20px',marginLeft:'20px', background:'#fff',boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)', width:'500px' }} >
      <h1>Simple React Button with useState and Inline Style</h1>
      <button style={buttonStyle} onClick={handleButtonClick}>
        {buttonClicked ? 'Clicked!' : 'Click me'}
      </button>
    </div>
  );
};

export default App;


`;
const ReactCodePage = () => {
  const [initialized, setInitialized] = useState(false);
  const [inputCode, setInputCode] = useState(defaultCode);
  const [outpuCode, setOutputCode] = useState('');
  const [errorCode, setErrorCode] = useState('');
  const { theme } = useTheme((satte) => satte);
  const { layout } = useLayoutState((s) => s);
  useEffect(() => {
    async function importAndRunSwcOnMount() {
      await initSwc();
      setInitialized(true);
    }
    importAndRunSwcOnMount();
  }, []);
  const compile = useCallback(() => {
    if (!initialized) {
      return;
    }
    try {
      setErrorCode('');
      const result = transformSync(inputCode, {
        jsc: {
          parser: {
            syntax: 'typescript',
            tsx: true,
          },
        },
        module: {
          type: 'commonjs',
        },
      });
      setOutputCode(result.code);
    } catch (error: any) {
      setErrorCode(`${error}`);
    }
  }, [initialized, inputCode]);
  useEffect(() => {
    compile();
  }, [inputCode, initialized, compile]);
  return (
    <>
      <ScrollToTop />
      <Column />
      <div
        className={`grid pb-10 container ${
          layout === 'row' ? 'grid-cols-2' : 'grid-cols-1'
        } mx-auto   gap-8 w-full`}
      >
        <ReactInputCode
          value={inputCode}
          setValue={setInputCode}
          theme={theme}
        />
        <OutputReactCode errorCode={errorCode} outputCode={outpuCode} />
      </div>
    </>
  );
};

export default ReactCodePage;
