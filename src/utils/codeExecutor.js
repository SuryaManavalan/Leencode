/**
 * A simple utility to simulate code execution in the mobile app
 * In a real app, this would connect to a backend service for code execution
 */

export const executeCode = (code, problemId) => {
  return new Promise((resolve, reject) => {
    // This is just a simulation of code execution
    // In a real app, you would send the code to a backend service
    
    setTimeout(() => {
      try {
        // For demonstration purposes, we're just returning sample output
        // In a real app, this would be the result of actual code execution
        
        const output = `Executing code for problem ${problemId || 'blank'}...\n\n` +
          `// Sample output\n` +
          `Running tests...\n` +
          `Test 1: Passed\n` +
          `Test 2: Passed\n\n` +
          `Time complexity: O(n)\n` +
          `Space complexity: O(n)\n\n` +
          `All tests passed!`;
        
        resolve(output);
      } catch (error) {
        reject(`Execution error: ${error.message}`);
      }
    }, 1500); // Simulate network delay
  });
};

export const getCodeTemplate = (language = 'javascript') => {
  switch(language) {
    case 'javascript':
      return `// Your JavaScript code here
function solution(input) {
  // Write your solution here
  return input;
}

// Example usage
console.log(solution([1, 2, 3]));
`;
    case 'python':
      return `# Your Python code here
def solution(input):
    # Write your solution here
    return input

# Example usage
print(solution([1, 2, 3]))
`;
    default:
      return '// Start coding here';
  }
};