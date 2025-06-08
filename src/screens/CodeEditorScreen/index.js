import React, { useState, useEffect, useRef } from 'react';
import { 
  SafeAreaView, 
  Keyboard, 
  KeyboardAvoidingView, 
  Platform 
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
  // Undo/redo stacks
  const [undoStack, setUndoStack] = useState([]);
  const [redoStack, setRedoStack] = useState([]);

  const [consoleOutput, setConsoleOutput] = useState('');
  const [showConsole, setShowConsole] = useState(false);
  const [isExecuting, setIsExecuting] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [keyboardIsVisible, setKeyboardIsVisible] = useState(false); // for actions
  const [keyboardWillBeVisible, setKeyboardWillBeVisible] = useState(false); // for run button label
  const [selection, setSelection] = useState({ start: 0, end: 0 });
  const codeInputRef = useRef(null);

  // Key for AsyncStorage per problem
  const CODE_STORAGE_KEY = `problemCode_${problem.id}`;

  useEffect(() => {
    let isMounted = true;
    const loadCode = async () => {
      try {
        const savedCode = await AsyncStorage.getItem(CODE_STORAGE_KEY);
        if (isMounted) {
          if (savedCode !== null) {
            setCode(savedCode);
          } else {
            setCode(problem.boilerplate || getCodeTemplate());
          }
        }
      } catch (e) {
        if (isMounted) setCode(problem.boilerplate || getCodeTemplate());
      }
    };
    loadCode();

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
      isMounted = false;
      keyboardWillShowListener.remove();
      keyboardWillHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, [problem]);

  // Save code to AsyncStorage whenever it changes
  useEffect(() => {
    AsyncStorage.setItem(CODE_STORAGE_KEY, code);
  }, [code, CODE_STORAGE_KEY]);

  // Update code and manage undo/redo stacks
  const handleSetCode = (newCode) => {
    setUndoStack((prev) => [...prev, code]);
    setRedoStack([]);
    setCode(newCode);
  };

  // Track cursor/selection
  const handleSelectionChange = (e) => {
    setSelection(e.nativeEvent.selection);
  };

  // Indent handler: add 2 spaces at the current cursor position
  const handleIndent = () => {
    if (!selection) return;
    setUndoStack((prev) => [...prev, code]);
    setRedoStack([]);
    const { start, end } = selection;
    const before = code.slice(0, start);
    const after = code.slice(end);
    const newCode = before + '  ' + after;
    setCode(newCode);
    // Move cursor after the inserted spaces
    setTimeout(() => {
      setSelection({ start: start + 2, end: start + 2 });
    }, 0);
  };

  // Insert parenthesis handler
  const handleInsertParen = (paren) => {
    if (!selection) return;
    setUndoStack((prev) => [...prev, code]);
    setRedoStack([]);
    const { start, end } = selection;
    const before = code.slice(0, start);
    const after = code.slice(end);
    const newCode = before + paren + after;
    setCode(newCode);
    // Move cursor after the inserted paren
    setTimeout(() => {
      setSelection({ start: start + 1, end: start + 1 });
    }, 0);
  };

  const handleRunCode = async () => {
    if (isExecuting) return;

    setIsExecuting(true);
    setShowConsole(true);
    setConsoleOutput('Executing code...');

    try {
      // Use the new JS evaluator (ignores problem.testCases for now)
      const result = await executeCode(code);
      setConsoleOutput(result);
      // Haptic feedback for success/error
      if (/^error:/i.test(result)) {
        errorFeedback();
      } else {
        successFeedback();
      }
    } catch (error) {
      setConsoleOutput(`Error: ${error.message}`);
      errorFeedback();
    } finally {
      setIsExecuting(false);
    }
  };
  const toggleConsole = () => {
    lightFeedback();
    setShowConsole(!showConsole);
  };

  const handleUndo = () => {
    if (undoStack.length === 0) return;
    const prevCode = undoStack[undoStack.length - 1];
    setUndoStack((prev) => prev.slice(0, -1));
    setRedoStack((prev) => [...prev, code]);
    setCode(prevCode);
    // Do not move the cursor on undo
  };

  const handleRedo = () => {
    if (redoStack.length === 0) return;
    const nextCode = redoStack[redoStack.length - 1];
    setRedoStack((prev) => prev.slice(0, -1));
    setUndoStack((prev) => [...prev, code]);
    setCode(nextCode);
    // Do not move the cursor on redo
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <EditorHeader 
        navigation={navigation}
        title={problem.id === 'blank' ? 'Code Editor' : problem.title}
        problemId={problem.id}
        code={code}
        setCode={handleSetCode}
      />

      {/* Problem Description (if not blank editor) */}
      <ProblemDescription problem={problem} />

      {/* Code Editor */}
      <CodeEditor 
        code={code} 
        setCode={handleSetCode} 
        onSelectionChange={handleSelectionChange}
        selection={selection}
      />
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
          onUndo={handleUndo}
          onRedo={handleRedo}
          canUndo={undoStack.length > 0}
          canRedo={redoStack.length > 0}
          onIndent={handleIndent}
          onInsertParen={handleInsertParen}
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
