'use client';
import Column from '@/components/Column';
import InputCode from '@/components/InputCode';
import OutputCode from '@/components/OutputCode';
import ScrollToTop from '@/components/ScrollToToTop';
import { darkColumnIcon, lightColumnIcon } from '@/icons/Icons';
import { useLayoutState } from '@/store/useLayoutStore';
import { useTheme } from '@/store/useThemeStore';
import initSwc, { transformSync } from '@swc/wasm-web';
import React, { useCallback, useEffect, useState } from 'react';

const defaultCode = `
const num1 = 5;
  const num2 = 10;
  const sum = num1 + num2;

  // Using template literals
  console.log(\`The sum of \${num1} and \${num2} is: \${sum}\`);

  // Using arrow function and destructuring assignment
  const multiply = (a, b) => {
    const product = a * b;
    console.log(\`The product of \${a} and \${b} is: \${product}\`);
  };

  // Calling the new function
  multiply(num1, num2);
`;
const CompiledCodePage = () => {
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
        className={`grid ${
          layout === 'row' ? 'grid-cols-2' : 'grid-cols-1'
        } pb-10 h-full container mt-1 mx-auto  gap-8 w-full`}
      >
        <InputCode value={inputCode} setValue={setInputCode} theme={theme} />
        <OutputCode errorCode={errorCode} code={outpuCode} />
      </div>
    </>
  );
};

export default CompiledCodePage;
