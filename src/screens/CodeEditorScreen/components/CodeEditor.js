import React, { useRef, useState } from 'react';
import { View, TextInput } from 'react-native';
import styles from '../styles';

const CodeEditor = ({ code, setCode, onSelectionChange, selection: parentSelection }) => {
  const inputRef = useRef(null);
  const [selection, setSelection] = useState(parentSelection || { start: 0, end: 0 });
  const [indentLevel, setIndentLevel] = useState(0); // Number of double spaces on current line

  // Helper to get indentation level (number of double spaces) for a given line
  const getIndentLevel = (line) => {
    const match = line.match(/^(  )+/); // Match double spaces at start
    return match ? match[0].length / 2 : 0;
  };

  // Update indentLevel based on current selection
  const updateIndentLevel = (text, sel) => {
    const cursor = sel?.start ?? 0;
    const beforeCursor = text.slice(0, cursor);
    const lines = beforeCursor.split('\n');
    const currentLine = lines[lines.length - 1] || '';
    setIndentLevel(getIndentLevel(currentLine));
  };

  // Enhanced onChangeText to handle indentLevel update
  const handleChangeText = (newText) => {
    setCode(newText);
    updateIndentLevel(newText, selection);
  };

  // Handle Return key for auto-indentation using indentLevel state, with a tiny wait
  const handleKeyPress = (e) => {
    const pairs = {
      '{': '}',
      '(': ')',
      '[': ']'
    };
    const key = e.nativeEvent.key;
    if (key === 'Enter') {
      setTimeout(() => {
        const cursor = selection.start;
        const before = code.slice(0, cursor);
        const after = code.slice(cursor);
        const prevChar = before[cursor - 1];
        const nextChar = after[0];
        const pairMap = { '{': '}', '(': ')', '[': ']' };
        let newIndentLevel = indentLevel;
        if (pairMap[prevChar]) {
          newIndentLevel = indentLevel + 1;
          setIndentLevel(newIndentLevel);
          const indent = '  '.repeat(newIndentLevel);
          if (nextChar === pairMap[prevChar]) {
            const oldIndent = '  '.repeat(indentLevel);
            // Insert a new line after the cursor's new position with old indentation
            const newText = before + '\n' + indent + '\n' + oldIndent + after;
            setCode(newText);
            // Move cursor after the indentation (before the second new line)
            const newCursor = cursor + 1 + indent.length;
            setSelection({ start: newCursor, end: newCursor });
          } else {
            // Just indent one level
            const newText = before + '\n' + indent + after;
            setCode(newText);
            const newCursor = cursor + 1 + indent.length;
            setSelection({ start: newCursor, end: newCursor });
          }
        }
      }, 10); // 10ms delay
    } else if (pairs[key]) {
      console.log(`Auto-inserting pair for key: ${key}`);
      // Auto-insert matching pair and move cursor between
      setTimeout(() => {
        const cursor = selection.start;
        const before = code.slice(0, cursor);
        const after = code.slice(cursor);
        const newText = before + key + pairs[key] + after;
        setCode(newText);
        // Move cursor between the pair
        const newCursor = cursor + 1;
        setSelection({ start: newCursor, end: newCursor });
      }, 10);
    }
  };

  // Handle ActionBar key presses for parens/brackets/braces
  const handleInsertParen = (char) => {
    const pairs = {
      '{': '}',
      '(': ')',
      '[': ']'
    };
    const cursor = selection.start;
    const before = code.slice(0, cursor);
    const after = code.slice(cursor);
    if (pairs[char]) {
      // Insert pair and move cursor between
      const newText = before + char + pairs[char] + after;
      setCode(newText);
      setSelection({ start: cursor + 1, end: cursor + 1 });
    } else {
      // Insert single character
      const newText = before + char + after;
      setCode(newText);
      setSelection({ start: cursor + 1, end: cursor + 1 });
    }
  };

  // Keep local selection in sync with parent if changed externally
  React.useEffect(() => {
    if (
      parentSelection &&
      (parentSelection.start !== selection.start || parentSelection.end !== selection.end)
    ) {
      setSelection(parentSelection);
    }
  }, [parentSelection]);

  const handleSelectionChange = (e) => {
    setSelection(e.nativeEvent.selection);
    updateIndentLevel(code, e.nativeEvent.selection);
    console.log('Selection changed:', e.nativeEvent.selection);
    console.log('Current indent level:', indentLevel);
    if (onSelectionChange) onSelectionChange(e);
  };

  return (
    <View style={styles.codeContainer}>
      <TextInput
        ref={inputRef}
        style={styles.codeEditor}
        value={code}
        onChangeText={handleChangeText}
        multiline
        autoCapitalize="none"
        autoCorrect={false}
        spellCheck={false}
        onSelectionChange={handleSelectionChange}
        selection={selection}
        onKeyPress={handleKeyPress}
      />
    </View>
  );
};

export default CodeEditor;
