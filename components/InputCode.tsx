import Editor from '@monaco-editor/react';
type IProps = {
  value: string;
  setValue: (value: string) => void;
  theme: string;
};

const InputCode = ({ value, setValue, theme }: IProps) => {
  return (
    <div className="text-black dark:text-white">
      <h1 className="text-2xl font-bold">Input Code</h1>
      <div className="mt-20  bg-slate-200 shadow-2xl border">
        <Editor
          options={{ padding: { top: 25 }, fontSize: 16 }}
          language="javascript"
          theme={theme === 'light' ? theme : 'vs-dark'}
          value={value}
          onChange={(val) => setValue(val as string)}
          height={'600px'}
          width={'100%'}
        />
      </div>
    </div>
  );
};

export default InputCode;
