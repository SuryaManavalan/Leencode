import React, { useRef, useState } from 'react';
import { View, TextInput } from 'react-native';
import styles from '../styles';

const CodeEditor = ({ code, setCode, onSelectionChange, selection: parentSelection }) => {
  const inputRef = useRef(null);
  const [selection, setSelection] = useState(parentSelection || { start: 0, end: 0 });

  // Enhanced onChangeText to handle auto-indent
  const handleChangeText = (newText) => {
    setCode(newText);
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
      />
    </View>
  );
};

export default CodeEditor;
