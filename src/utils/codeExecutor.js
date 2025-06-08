/**
 * A simple utility to simulate code execution in the mobile app
 * In a real app, this would connect to a backend service for code execution
 */

 /**
 * Executes JavaScript code and captures console.log output.
 * WARNING: Uses eval. Do not use in production or with untrusted code.
 */
export const executeCode = (code /*, problemId */) => {
  // Sanitize code: replace curly quotes and problematic unicode with ASCII
  const sanitizedCode = code
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/[‛‹›]/g, "'")
    .replace(/[«»]/g, '"');
  return new Promise((resolve) => {
    let logs = [];
    const originalConsoleLog = console.log;
    console.log = (...args) => {
      logs.push(args.map(String).join(' '));
      originalConsoleLog(...args);
    };
    let result = '';
    try {
      // eslint-disable-next-line no-eval
      const evalResult = eval(sanitizedCode);
      if (evalResult !== undefined) {
        logs.push(String(evalResult));
      }
      result = logs.join('\n');
      resolve(result || '[No output]');
    } catch (error) {
      resolve('Error: ' + error.message);
    } finally {
      console.log = originalConsoleLog;
    }
  });
};

export const getCodeTemplate = (language = 'javascript') => {
  switch(language) {
    case 'javascript':
      return `// Your JavaScript code here\nfunction solution(input) {\n  // Write your solution here\n  return input;\n}\n\n// Example usage\nconsole.log(solution([1, 2, 3]));\n`;
    case 'python':
      return `# Your Python code here\ndef solution(input):\n    # Write your solution here\n    return input\n\n# Example usage\nprint(solution([1, 2, 3]))\n`;
    default:
      return '// Start coding here';
  }
};