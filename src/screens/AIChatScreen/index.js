import React, { useState, useRef } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  SafeAreaView, 
  FlatList, 
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { lightFeedback, mediumFeedback } from '../../utils/haptics';
import { problems } from '../../data/problems';
import styles from './styles';

const AIChatScreen = ({ navigation, route }) => {
  const { problemId, code } = route.params || {};
  const problem = problems.find(p => p.id === problemId) || {};

  const [messages, setMessages] = useState([
    { id: '1', text: `Hi! I'm here to help you with your coding questions. ${problem.title ? `I see you're working on the "${problem.title}" problem.` : ''} How can I assist you today?`, sender: 'ai' }
  ]);
  const [inputText, setInputText] = useState('');
  const flatListRef = useRef(null);  const handleSend = () => {
    if (inputText.trim() === '') return;

    mediumFeedback();

    // Add user message
    const userMessage = {
      id: Date.now().toString(),
      text: inputText.trim(),
      sender: 'user'
    };
    
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInputText('');

    // Simulate AI response (in a real app, this would call an AI service)
    setTimeout(() => {
      const aiResponse = {
        id: (Date.now() + 1).toString(),
        text: getAIResponse(inputText.trim(), problem),
        sender: 'ai'
      };
      setMessages(prevMessages => [...prevMessages, aiResponse]);
    }, 1000);
  };

  // Simulated AI response logic
  const getAIResponse = (userInput, problem) => {
    const lowerInput = userInput.toLowerCase();
    
    if (lowerInput.includes('help') || lowerInput.includes('hint')) {
      if (problem && problem.id !== 'blank') {
        return `For the ${problem.title} problem, try to think about using a data structure that allows efficient lookups. Consider the time complexity requirements.`;
      } else {
        return "What specific aspect of your code are you looking for help with?";
      }
    } else if (lowerInput.includes('error') || lowerInput.includes('bug') || lowerInput.includes('fix')) {
      return "To debug your code, try adding console logs to trace the execution flow, or check for common issues like off-by-one errors or incorrect indexing.";
    } else if (lowerInput.includes('optimize') || lowerInput.includes('better') || lowerInput.includes('faster')) {
      return "To optimize your solution, consider if there are any redundant operations or if you can use a more efficient data structure like a hash map to reduce time complexity.";
    } else {
      return "I understand. If you share more details about your specific question or code snippet you're having trouble with, I can provide more tailored assistance.";
    }
  };

  const renderMessage = ({ item }) => (
    <View style={[styles.messageBubble, item.sender === 'user' ? styles.userBubble : styles.aiBubble]}>
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => {
            lightFeedback();
            navigation.goBack();
          }}
        >
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>AI Assistant</Text>
        
        <View style={styles.placeholder} />
      </View>

      {/* Messages list */}
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.messagesList}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
      />

      {/* Input area */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Type your question here..."
            multiline
            maxHeight={100}
          />
          <TouchableOpacity 
            style={styles.sendButton} 
            onPress={handleSend}
            disabled={inputText.trim() === ''}
          >
            <Ionicons 
              name="send" 
              size={20} 
              color={inputText.trim() === '' ? '#cccccc' : '#0066ff'} 
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AIChatScreen;
