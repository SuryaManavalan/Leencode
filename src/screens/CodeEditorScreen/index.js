import React, { useState, useEffect } from 'react';
import { 
  SafeAreaView, 
  Keyboard, 
  KeyboardAvoidingView, 
  Platform 
} from 'react-native';
import { problems } from '../../data/problems';
import { executeCode, getCodeTemplate } from '../../utils/codeExecutor';
import { lightFeedback, successFeedback, errorFeedback } from '../../utils/haptics';
import styles from './styles';
import {
  EditorHeader,
  ProblemDescription,
  CodeEditor,
  ActionBar,
  ConsoleWindow
} from './components';

const CodeEditorScreen = ({ navigation, route }) => {
  const { problemId } = route.params || { problemId: 'blank' };
  const problem = problems.find(p => p.id === problemId) || problems[0];
  
  const [code, setCode] = useState('');
  const [consoleOutput, setConsoleOutput] = useState('');
  const [showConsole, setShowConsole] = useState(false);
  const [isExecuting, setIsExecuting] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [keyboardIsVisible, setKeyboardIsVisible] = useState(false); // for actions
  const [keyboardWillBeVisible, setKeyboardWillBeVisible] = useState(false); // for run button label

  useEffect(() => {
    // Initialize code editor with problem boilerplate or empty template
    setCode(problem.boilerplate || getCodeTemplate());

    // Keyboard listeners
    const keyboardWillShowListener = Keyboard.addListener('keyboardWillShow', () => {
      setKeyboardWillBeVisible(true);
    });
    const keyboardWillHideListener = Keyboard.addListener('keyboardWillHide', () => {
      setKeyboardWillBeVisible(false);
      setKeyboardIsVisible(false); // Hide actions instantly before animation
    });
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardIsVisible(true); // Show actions after animation
    });

    return () => {
      keyboardWillShowListener.remove();
      keyboardWillHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, [problem]);
  const handleRunCode = async () => {
    if (isExecuting) return;

    setIsExecuting(true);
    setShowConsole(true);
    setConsoleOutput('Executing code...');

    try {
      const result = await executeCode(code, problem.testCases);
      setConsoleOutput(result);
      
      // Provide success haptic feedback if all tests pass
      if (result.includes('All tests passed')) {
        successFeedback();
      } else if (result.includes('failed')) {
        // Provide error haptic feedback if any test fails
        errorFeedback();
      }
    } catch (error) {
      setConsoleOutput(`Error: ${error.message}`);
      errorFeedback();
    } finally {
      setIsExecuting(false);
    }
  };const toggleConsole = () => {
    lightFeedback();
    setShowConsole(!showConsole);
  };
  
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <EditorHeader 
        navigation={navigation}
        title={problem.id === 'blank' ? 'Code Editor' : problem.title}
        problemId={problem.id}
        code={code}
      />

      {/* Problem Description (if not blank editor) */}
      <ProblemDescription problem={problem} />

      {/* Code Editor */}
      <CodeEditor code={code} setCode={setCode} />
      {/* Run Button */}
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
        style={{marginBottom: 0, paddingBottom: 0}}
      >
        <ActionBar 
          onRunCode={handleRunCode} 
          isExecuting={isExecuting}
          keyboardVisible={keyboardWillBeVisible} // for run button label
          keyboardActionsVisible={keyboardIsVisible} // for keyboard actions
        />
      </KeyboardAvoidingView>

      {/* Console Output */}
      {showConsole && (
        <ConsoleWindow 
          consoleOutput={consoleOutput}
          onClose={toggleConsole}
          keyboardVisible={keyboardVisible}
        />
      )}
    </SafeAreaView>
  );
};

export default CodeEditorScreen;
