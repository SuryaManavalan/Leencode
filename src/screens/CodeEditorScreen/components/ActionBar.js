import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, Keyboard, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { mediumFeedback } from '../../../utils/haptics';
import styles from '../styles';

// Component to contain all keyboard-related actions
const KeyboardActions = ({ onHideKeyboard, visible }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      fadeAnim.setValue(0);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <Animated.View style={[styles.keyboardActionsContainer, { opacity: fadeAnim }]}> 
      <TouchableOpacity 
        style={styles.hideKeyboardButton} 
        onPress={onHideKeyboard}
      >
        <MaterialCommunityIcons name="keyboard-close" size={24} color="#555" />
      </TouchableOpacity>
      {/* Future keyboard-related actions can be added here */}
    </Animated.View>
  );
};

const ActionBar = ({ onRunCode, isExecuting, keyboardVisible, keyboardActionsVisible }) => {
  const handleRunPress = () => {
    if (!isExecuting) {
      mediumFeedback();
      onRunCode();
    }
  };

  const handleHideKeyboard = () => {
    mediumFeedback();
    Keyboard.dismiss();
  };
  return (
    <View style={[styles.actionBar, { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }]}> 
      <KeyboardActions onHideKeyboard={handleHideKeyboard} visible={keyboardActionsVisible} />
      <View style={{ flex: 0, marginLeft: 'auto' }}>
        <TouchableOpacity 
          style={[styles.runButton, isExecuting && styles.runButtonDisabled, { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }]}
          onPress={handleRunPress}
          disabled={isExecuting}
        >
          {isExecuting ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Ionicons name="play" size={20} color="#fff" />
          )}
          {!keyboardVisible && (
            <Text style={styles.runButtonText}>Run Code</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ActionBar;
