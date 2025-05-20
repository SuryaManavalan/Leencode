import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Keyboard, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { problems } from '../data/problems';
import { executeCode, getCodeTemplate } from '../utils/codeExecutor';

const CodeEditorScreen = ({ navigation, route }) => {
  const { problemId } = route.params || { problemId: 'blank' };
  const problem = problems.find(p => p.id === problemId) || problems[0];
  
  const [code, setCode] = useState('');
  const [consoleOutput, setConsoleOutput] = useState('');
  const [showConsole, setShowConsole] = useState(false);
  const [isExecuting, setIsExecuting] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    // Initialize code editor with problem boilerplate or empty template
    setCode(problem.boilerplate || getCodeTemplate());
    
    // Keyboard listeners
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, [problem]);

  const handleRunCode = async () => {
    Keyboard.dismiss();
    setShowConsole(true);
    setIsExecuting(true);
    
    try {
      const result = await executeCode(code, problemId);
      setConsoleOutput(result);
    } catch (error) {
      setConsoleOutput(`Error: ${error}`);
    } finally {
      setIsExecuting(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.navigate('Home')}
        >
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        
        <Text style={styles.headerTitle} numberOfLines={1}>
          {problem.id === 'blank' ? 'Code Editor' : `${problem.id}. ${problem.title}`}
        </Text>
        
        <TouchableOpacity 
          style={styles.chatButton}
          onPress={() => navigation.navigate('AIChat', { problemId, code })}
        >
          <Ionicons name="chatbox-ellipses" size={24} color="#0066ff" />
        </TouchableOpacity>
      </View>

      {/* Problem description if not blank editor */}
      {problem.id !== 'blank' && (
        <View style={styles.problemDescription}>
          <Text style={styles.descriptionText}>{problem.description}</Text>
          <Text style={styles.difficultyText}>
            Difficulty: <Text style={{ color: getDifficultyColor(problem.difficulty) }}>{problem.difficulty}</Text>
          </Text>
        </View>
      )}

      {/* Code editor */}
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.codeContainer}
        keyboardVerticalOffset={90}
      >
        <TextInput
          style={styles.codeEditor}
          value={code}
          onChangeText={setCode}
          multiline={true}
          numberOfLines={20}
          textAlignVertical="top"
          autoCapitalize="none"
          autoCorrect={false}
          spellCheck={false}
        />
      </KeyboardAvoidingView>

      {/* Bottom action bar */}
      <View style={styles.actionBar}>
        <TouchableOpacity 
          style={[styles.runButton, isExecuting && styles.runButtonDisabled]} 
          onPress={handleRunCode}
          disabled={isExecuting}
        >
          {isExecuting ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <>
              <Ionicons name="play" size={20} color="#fff" />
              <Text style={styles.runButtonText}>Run</Text>
            </>
          )}
        </TouchableOpacity>
      </View>

      {/* Console output */}
      {showConsole && (
        <View style={styles.consoleContainer}>
          <View style={styles.consoleHeader}>
            <Text style={styles.consoleTitle}>Console</Text>
            <TouchableOpacity onPress={() => setShowConsole(false)}>
              <Ionicons name="close" size={20} color="#666" />
            </TouchableOpacity>
          </View>
          <Text style={styles.consoleText}>{consoleOutput}</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const getDifficultyColor = (difficulty) => {
  switch (difficulty) {
    case 'Easy': return '#00b8a3';
    case 'Medium': return '#ffc01e';
    case 'Hard': return '#ff375f';
    default: return '#0066ff';
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginHorizontal: 8,
  },
  chatButton: {
    padding: 8,
  },
  problemDescription: {
    backgroundColor: '#fff',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  descriptionText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#333',
    marginBottom: 8,
  },
  difficultyText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  codeContainer: {
    flex: 1,
    backgroundColor: '#1e1e1e',
    padding: 8,
  },
  codeEditor: {
    flex: 1,
    color: '#fff',
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    fontSize: 14,
    lineHeight: 20,
    padding: 8,
  },
  actionBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 12,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  runButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0066ff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 4,
  },
  runButtonDisabled: {
    backgroundColor: '#99ccff',
  },
  runButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 8,
  },
  consoleContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#f8f8f8',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    maxHeight: 200,
    minHeight: 150,
  },
  consoleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  consoleTitle: {
    fontWeight: 'bold',
    color: '#333',
  },
  consoleText: {
    padding: 8,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    fontSize: 12,
    color: '#333',
  },
});

export default CodeEditorScreen;