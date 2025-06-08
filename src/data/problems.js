export const problems = [
  {
    id: 'blank',
    title: 'Blank Editor',
    description: 'Start with a blank editor',
    difficulty: 'N/A',
    boilerplate: '',
  },
  {
    id: '1',
    title: 'Two Sum',
    description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
    difficulty: 'Easy',
    boilerplate: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    // Your code here
};

const tests = [
  { input: [[2,7,11,15], 9], expected: [0,1] },
  { input: [[3,2,4], 6], expected: [1,2] },
  { input: [[3,3], 6], expected: [0,1] },
  { input: [[1,2,3,4,5], 9], expected: [3,4] },
  { input: [[0,4,3,0], 0], expected: [0,3] },
];

tests.forEach(({ input, expected }, i) => {
  const result = twoSum(...input);
  const passed = Array.isArray(result) && result.length === 2 &&
                 (result[0] === expected[0] && result[1] === expected[1] ||
                  result[1] === expected[0] && result[0] === expected[1]);
  console.log(\`TwoSum Test \${i + 1}: \${passed ? "PASSED" : "FAILED"}\`);
});`,
  },
  {
    id: '2',
    title: 'Add Two Numbers',
    description: 'You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit.',
    difficulty: 'Medium',
    boilerplate: `/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2) {
    // Your code here
};

function ListNode(val, next) {
    this.val = val ?? 0;
    this.next = next ?? null;
}

function arrayToList(arr) {
    let dummy = new ListNode(0);
    let curr = dummy;
    arr.forEach(val => {
        curr.next = new ListNode(val);
        curr = curr.next;
    });
    return dummy.next;
}

function listToArray(list) {
    const res = [];
    while (list) {
        res.push(list.val);
        list = list.next;
    }
    return res;
}

const tests = [
  { l1: [2,4,3], l2: [5,6,4], expected: [7,0,8] },
  { l1: [0], l2: [0], expected: [0] },
  { l1: [9,9,9,9,9,9,9], l2: [9,9,9,9], expected: [8,9,9,9,0,0,0,1] },
  { l1: [5], l2: [5], expected: [0,1] },
  { l1: [1,8], l2: [0], expected: [1,8] },
];

tests.forEach(({ l1, l2, expected }, i) => {
  const result = addTwoNumbers(arrayToList(l1), arrayToList(l2));
  const resultArray = listToArray(result);
  const passed = JSON.stringify(resultArray) === JSON.stringify(expected);
  console.log(\`AddTwoNumbers Test \${i + 1}: \${passed ? "PASSED" : "FAILED"}\`);
});`,
  },
  {
    id: '3',
    title: 'Longest Substring Without Repeating Characters',
    description: 'Given a string s, find the length of the longest substring without repeating characters.',
    difficulty: 'Medium',
    boilerplate: `/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
    // Your code here
};

const tests = [
  { input: "abcabcbb", expected: 3 },
  { input: "bbbbb", expected: 1 },
  { input: "pwwkew", expected: 3 },
  { input: "", expected: 0 },
  { input: "dvdf", expected: 3 },
];

tests.forEach(({ input, expected }, i) => {
  const result = lengthOfLongestSubstring(input);
  const passed = result === expected;
  console.log(\`LongestSubstring Test \${i + 1}: \${passed ? "PASSED" : "FAILED"}\`);
});`,
  },
  {
    id: "15",
    title: "3Sum",
    description: "Given an integer array nums, return all the triplets such that their sum is zero.",
    difficulty: "Medium",
    boilerplate: "/**\n * @param {number[]} nums\n * @return {number[][]}\n */\nvar threeSum = function(nums) {\n    // Your code here\n};\n\nconst tests = [\n  { input: [[-1, 0, 1, 2, -1, -4]], expected: [[-1, -1, 2], [-1, 0, 1]] },\n  { input: [[]], expected: [] },\n  { input: [[0]], expected: [] },\n  { input: [[0, 0, 0]], expected: [[0, 0, 0]] },\n  { input: [[1, -1, -1, 0]], expected: [[-1, 0, 1]] }\n];\n\ntests.forEach(({ input, expected }, i) => {\n  const args = Array.isArray(input) ? input : [input];\n  const result = threeSum(...args);\n  const passed = JSON.stringify(result) === JSON.stringify(expected);\n  console.log(`threeSum Test ${i + 1}: ${passed ? \"PASSED\" : \"FAILED\"}`);\n});"
  },
  {
    id: "11",
    title: "Container With Most Water",
    description: "Find two lines that together with the x-axis form a container, such that the container contains the most water.",
    difficulty: "Medium",
    boilerplate: "/**\n * @param {number[]} height\n * @return {number}\n */\nvar maxArea = function(height) {\n    // Your code here\n};\n\nconst tests = [\n  { input: [[1, 8, 6, 2, 5, 4, 8, 3, 7]], expected: 49 },\n  { input: [[1, 1]], expected: 1 },\n  { input: [[4, 3, 2, 1, 4]], expected: 16 },\n  { input: [[1, 2, 1]], expected: 2 },\n  { input: [[2, 3, 10, 5, 7, 8, 9]], expected: 36 }\n];\n\ntests.forEach(({ input, expected }, i) => {\n  const args = Array.isArray(input) ? input : [input];\n  const result = maxArea(...args);\n  const passed = JSON.stringify(result) === JSON.stringify(expected);\n  console.log(`maxArea Test ${i + 1}: ${passed ? \"PASSED\" : \"FAILED\"}`);\n});"
  },
  {
    id: "76",
    title: "Minwindow",
    description: "Return the minimum window in s which will contain all the characters in t.",
    difficulty: "Hard",
    boilerplate: "/**\n * @param {string} s\n * @param {string} t\n * @return {string}\n */\nvar minWindow = function(s, t) {\n    // Your code here\n};\n\nconst tests = [\n  { input: ['ADOBECODEBANC', 'ABC'], expected: \"BANC\" },\n  { input: ['a', 'a'], expected: \"a\" },\n  { input: ['a', 'aa'], expected: \"\" },\n  { input: ['abc', 'ac'], expected: \"abc\" },\n  { input: ['bba', 'ab'], expected: \"ba\" }\n];\n\ntests.forEach(({ input, expected }, i) => {\n  const args = Array.isArray(input) ? input : [input];\n  const result = minWindow(...args);\n  const passed = JSON.stringify(result) === JSON.stringify(expected);\n  console.log(`minWindow Test ${i + 1}: ${passed ? \\\"PASSED\\\" : \\\"FAILED\\\"}`);\n});"
  },

  {
    id: "560",
    title: "Subarraysum",
    description: "Return the total number of continuous subarrays whose sum equals to k.",
    difficulty: "Medium",
    boilerplate: "/**\n * @param {number[]} nums\n * @param {number} k\n * @return {number}\n */\nvar subarraySum = function(...args) {\n    // Your code here\n};\n\nconst tests = [\n  { input: [[1, 1, 1], 2], expected: 2 },\n  { input: [[1, 2, 3], 3], expected: 2 },\n  { input: [[1], 0], expected: 0 },\n  { input: [[1, -1, 0], 0], expected: 3 },\n  { input: [[3, 4, 7, 2, -3, 1, 4, 2], 7], expected: 4 }\n];\n\ntests.forEach(({ input, expected }, i) => {\n  const args = Array.isArray(input) ? input : [input];\n  const result = subarraySum(...args);\n  const passed = JSON.stringify(result) === JSON.stringify(expected);\n  console.log(`subarraySum Test ${i + 1}: ${passed ? \"PASSED\" : \"FAILED\"}`);\n});"
  },
  {
    id: "347",
    title: "Topkfrequent",
    description: "Return the k most frequent elements.",
    difficulty: "Medium",
    boilerplate: "/**\n * @param {number[]} nums\n * @param {number} k\n * @return {number[]}\n */\nvar topKFrequent = function(...args) {\n    // Your code here\n};\n\nconst tests = [\n  { input: [[1, 1, 1, 2, 2, 3], 2], expected: [1, 2] },\n  { input: [[1], 1], expected: [1] },\n  { input: [[1, 2], 2], expected: [1, 2] },\n  { input: [[4, 1, -1, 2, -1, 2, 3], 2], expected: [-1, 2] },\n  { input: [[1, 1, 2, 2, 3, 3], 3], expected: [1, 2, 3] }\n];\n\ntests.forEach(({ input, expected }, i) => {\n  const args = Array.isArray(input) ? input : [input];\n  const result = topKFrequent(...args);\n  const passed = JSON.stringify(result) === JSON.stringify(expected);\n  console.log(`topKFrequent Test ${i + 1}: ${passed ? \"PASSED\" : \"FAILED\"}`);\n});"
  },
  {
    id: "22",
    title: "Generateparenthesis",
    description: "Generate all combinations of well-formed parentheses.",
    difficulty: "Medium",
    boilerplate: "/**\n * @param {number} n\n * @return {string[]}\n */\nvar generateParenthesis = function(...args) {\n    // Your code here\n};\n\nconst tests = [\n  { input: [1], expected: ['()'] },\n  { input: [2], expected: ['(())', '()()'] },\n  { input: [3], expected: ['((()))', '(()())', '(())()', '()(())', '()()()'] },\n  { input: [0], expected: [''] },\n  { input: [4], expected: ['(((())))','((()()))','((())())','((()))()','(()(()))','(()()())','(()())()','(())(())','(())()()','()((()))','()(()())','()(())()','()()(())','()()()()'] }\n];\n\ntests.forEach(({ input, expected }, i) => {\n  const args = Array.isArray(input) ? input : [input];\n  const result = generateParenthesis(...args);\n  const passed = JSON.stringify(result) === JSON.stringify(expected);\n  console.log(`generateParenthesis Test ${i + 1}: ${passed ? \\\"PASSED\\\" : \\\"FAILED\\\"}`);\n});"
  },
  {
    id: "78",
    title: "Subsets",
    description: "Return all possible subsets (the power set).",
    difficulty: "Medium",
    boilerplate: "/**\n * @param {number[]} nums\n * @return {number[][]}\n */\nvar subsets = function(...args) {\n    // Your code here\n};\n\nconst tests = [\n  { input: [[1, 2, 3]], expected: [[], [1], [2], [3], [1, 2], [1, 3], [2, 3], [1, 2, 3]] },\n  { input: [[0]], expected: [[], [0]] },\n  { input: [[1, 2]], expected: [[], [1], [2], [1, 2]] },\n  { input: [[9]], expected: [[], [9]] },\n  { input: [[]], expected: [[]] }\n];\n\ntests.forEach(({ input, expected }, i) => {\n  const args = Array.isArray(input) ? input : [input];\n  const result = subsets(...args);\n  const passed = JSON.stringify(result) === JSON.stringify(expected);\n  console.log(`subsets Test ${i + 1}: ${passed ? \\\"PASSED\\\" : \\\"FAILED\\\"}`);\n});"
  },
  {
    id: "51",
    title: "Solvenqueens",
    description: "Place n queens on an n x n chessboard such that no two queens attack each other.",
    difficulty: "Hard",
    boilerplate: "/**\n * @param {number} n\n * @return {string[][]}\n */\nvar solveNQueens = function(...args) {\n    // Your code here\n};\n\nconst tests = [\n  { input: [1], expected: [['Q']] },\n  { input: [2], expected: [] },\n  { input: [3], expected: [] },\n  { input: [4], expected: [['.Q..','...Q','Q...','..Q.'], ['..Q.','Q...','...Q','.Q..']] }\n];\n\ntests.forEach(({ input, expected }, i) => {\n  const args = Array.isArray(input) ? input : [input];\n  const result = solveNQueens(...args);\n  const normalize = arr => arr.map(board => board.join('')).sort();\n  const passed = JSON.stringify(normalize(result)) === JSON.stringify(normalize(expected));\n  console.log(`solveNQueens Test ${i + 1}: ${passed ? \\\"PASSED\\\" : \\\"FAILED\\\"}`);\n});"
  },
  {
    id: "70",
    title: "Climbstairs",
    description: "Each time you can either climb 1 or 2 steps.",
    difficulty: "Easy",
    boilerplate: "/**\n * @param {number} n\n * @return {number}\n */\nvar climbStairs = function(...args) {\n    // Your code here\n};\n\nconst tests = [\n  { input: [2], expected: 2 },\n  { input: [3], expected: 3 },\n  { input: [5], expected: 8 },\n  { input: [1], expected: 1 },\n  { input: [10], expected: 89 }\n];\n\ntests.forEach(({ input, expected }, i) => {\n  const args = Array.isArray(input) ? input : [input];\n  const result = climbStairs(...args);\n  const passed = JSON.stringify(result) === JSON.stringify(expected);\n  console.log(`climbStairs Test ${i + 1}: ${passed ? \"PASSED\" : \"FAILED\"}`);\n});"
  },
  {
    id: "300",
    title: "Lengthoflis",
    description: "Return the length of the longest strictly increasing subsequence.",
    difficulty: "Medium",
    boilerplate: "/**\n * @param {number[]} nums\n * @return {number}\n */\nvar lengthOfLIS = function(...args) {\n    // Your code here\n};\n\nconst tests = [\n  { input: [[10, 9, 2, 5, 3, 7, 101, 18]], expected: 4 },\n  { input: [[0, 1, 0, 3, 2, 3]], expected: 4 },\n  { input: [[7, 7, 7, 7, 7, 7, 7]], expected: 1 },\n  { input: [[1, 3, 6, 7, 9, 4, 10, 5, 6]], expected: 6 },\n  { input: [[4, 10, 4, 3, 8, 9]], expected: 3 }\n];\n\ntests.forEach(({ input, expected }, i) => {\n  const args = Array.isArray(input) ? input : [input];\n  const result = lengthOfLIS(...args);\n  const passed = JSON.stringify(result) === JSON.stringify(expected);\n  console.log(`lengthOfLIS Test ${i + 1}: ${passed ? \"PASSED\" : \"FAILED\"}`);\n});"
  },
  {
    id: "322",
    title: "Coinchange",
    description: "Find the fewest number of coins that make up a given amount.",
    difficulty: "Medium",
    boilerplate: "/**\n * @param {number[]} coins\n * @param {number} amount\n * @return {number}\n */\nvar coinChange = function(...args) {\n    // Your code here\n};\n\nconst tests = [\n  { input: [[1, 2, 5], 11], expected: 3 },\n  { input: [[2], 3], expected: -1 },\n  { input: [[1], 0], expected: 0 },\n  { input: [[1], 2], expected: 2 },\n  { input: [[186, 419, 83, 408], 6249], expected: 20 }\n];\n\ntests.forEach(({ input, expected }, i) => {\n  const args = Array.isArray(input) ? input : [input];\n  const result = coinChange(...args);\n  const passed = JSON.stringify(result) === JSON.stringify(expected);\n  console.log(`coinChange Test ${i + 1}: ${passed ? \"PASSED\" : \"FAILED\"}`);\n});"
  },
  {
    id: "146",
    title: "Lrucache",
    description: "Design a Least Recently Used (LRU) cache.",
    difficulty: "Medium",
    boilerplate: "/**\n * @param {number} capacity\n */\nvar LRUCache = function(capacity) {\n    // Your code here\n};\n\n/** \n * @param {number} key\n * @return {number}\n */\nLRUCache.prototype.get = function(key) {\n    // Your code here\n};\n\n/** \n * @param {number} key \n * @param {number} value\n * @return {void}\n */\nLRUCache.prototype.put = function(key, value) {\n    // Your code here\n};\n\n// Manual test log\nvar cache = new LRUCache(2);\ncache.put(1, 1);\ncache.put(2, 2);\nconsole.log(cache.get(1)); // 1\ncache.put(3, 3);\nconsole.log(cache.get(2)); // -1\ncache.put(4, 4);\nconsole.log(cache.get(1)); // -1\nconsole.log(cache.get(3)); // 3\nconsole.log(cache.get(4)); // 4"
  },
];
