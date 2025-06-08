import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { lightFeedback, mediumFeedback } from '../../../utils/haptics';
import { problems } from '../../../data/problems';
import styles from '../styles';

const EditorHeader = ({ navigation, title, problemId, code, setCode }) => {
  const handleBackPress = () => {
    lightFeedback();
    navigation.goBack();
  };

  const handleChatPress = () => {
    mediumFeedback();
    navigation.navigate('AIChat', { problemId, code });
  };

  const handleResetPress = async () => {
    // Remove saved code for this problem
    const CODE_STORAGE_KEY = `problemCode_${problemId}`;
    await AsyncStorage.removeItem(CODE_STORAGE_KEY);
    // Find default code from problems array
    const problem = problems.find(p => p.id === problemId);
    setCode(problem?.boilerplate || '');
  };

  return (
    <View style={styles.header}>
      <TouchableOpacity 
        style={styles.backButton} 
        onPress={handleBackPress}
      >
        <Ionicons name="arrow-back" size={24} color="#333" />
      </TouchableOpacity>
      
      <Text style={styles.headerTitle} numberOfLines={1} ellipsizeMode="tail">
        {title}
      </Text>
      
      {/* <TouchableOpacity 
        style={styles.chatButton} 
        onPress={handleChatPress}
      >
        <Ionicons name="chatbubble-ellipses-outline" size={24} color="#0066ff" />
      </TouchableOpacity> */}
      <TouchableOpacity
        style={[styles.chatButton, { marginLeft: 8 }]}
        onPress={handleResetPress}
        accessibilityLabel="Reset code to default"
      >
        <Ionicons name="refresh" size={24} color="#d9534f" />
      </TouchableOpacity>
    </View>
  );
};

export default EditorHeader;
