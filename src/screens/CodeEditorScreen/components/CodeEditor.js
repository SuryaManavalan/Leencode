import React from 'react';
import { View, TextInput } from 'react-native';
import styles from '../styles';

const CodeEditor = ({ code, setCode }) => {
  return (
    <View style={styles.codeContainer}>
      <TextInput
        style={styles.codeEditor}
        value={code}
        onChangeText={setCode}
        multiline
        autoCapitalize="none"
        autoCorrect={false}
        spellCheck={false}
      />
    </View>
  );
};

export default CodeEditor;
