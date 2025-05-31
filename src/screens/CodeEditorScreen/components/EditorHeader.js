import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { lightFeedback, mediumFeedback } from '../../../utils/haptics';
import styles from '../styles';

const EditorHeader = ({ navigation, title, problemId, code }) => {
  const handleBackPress = () => {
    lightFeedback();
    navigation.goBack();
  };

  const handleChatPress = () => {
    mediumFeedback();
    navigation.navigate('AIChat', { problemId, code });
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
      
      <TouchableOpacity 
        style={styles.chatButton} 
        onPress={handleChatPress}
      >
        <Ionicons name="chatbubble-ellipses-outline" size={24} color="#0066ff" />
      </TouchableOpacity>
    </View>
  );
};

export default EditorHeader;
