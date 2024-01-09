export const executeCode = (code: string) => {
  try {
    let output = '';

    const captureConsoleMethods: Record<string, (...args: any[]) => void> = {};
    ['log', 'info', 'warn', 'error'].forEach((method) => {
      captureConsoleMethods[method] = (...args) => {
        output += `${method}: ${args.join(' ')}\n`;
      };
    });

    const func = new Function('console', code);

    func(captureConsoleMethods);

    return output.trim();
  } catch (error: any) {
    return error.message;
  }
};

export const getFromStorage = <T>(key: string): T | null => {
  if (typeof window !== 'undefined') {
    const data = localStorage?.getItem(key)
      ? JSON.parse(localStorage?.getItem(key) as string)
      : null;
    return data;
  } else {
    return null;
  }
};

export const executeReactCode = async (code: string, dependencies: any) => {
  try {
    const exports: Record<string, unknown> = {};

    const require = (path: string) => {
      if (dependencies[path]) {
        return dependencies[path];
      }
      throw new Error(`Module not found: ${path}.`);
    };
    // const trimmedCode = code.replace('"use strict";', '').trim();
    const func = new Function('exports', 'require', code);
    func(exports, require);
    return exports.default;
  } catch (error) {
    console.log(error);
  }
};
