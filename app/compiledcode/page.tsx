'use client';
import InputCode from '@/components/InputCode';
import OutputCode from '@/components/OutputCode';
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
    <div className="grid pb-10 container mt-7 mx-auto grid-cols-2 gap-8 w-full">
      <InputCode value={inputCode} setValue={setInputCode} theme={theme} />
      <OutputCode errorCode={errorCode} code={outpuCode} />
    </div>
  );
};

export default CompiledCodePage;
