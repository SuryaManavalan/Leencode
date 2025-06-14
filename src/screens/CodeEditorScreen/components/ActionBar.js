import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, Keyboard, Animated, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { mediumFeedback } from '../../../utils/haptics';
import styles from '../styles';

// Component to contain all keyboard-related actions
const KeyboardActions = ({ onHideKeyboard, visible, onUndo, onRedo, canUndo, canRedo, onIndent, onInsertParen }) => {
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
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        keyboardShouldPersistTaps="always"
        contentContainerStyle={{ flexDirection: 'row', alignItems: 'center' }}
      >
        <TouchableOpacity
          style={styles.hideKeyboardButton}
          onPress={onHideKeyboard}
        >
          <MaterialCommunityIcons name="keyboard-close" size={24} color="#555" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.undoRedoButton, !canUndo && styles.undoRedoButtonDisabled]}
          onPress={onUndo}
          disabled={!canUndo}
        >
          <Ionicons name="arrow-undo" size={20} color={!canUndo ? '#aaa' : '#555'} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.undoRedoButton, !canRedo && styles.undoRedoButtonDisabled]}
          onPress={onRedo}
          disabled={!canRedo}
        >
          <Ionicons name="arrow-redo" size={20} color={!canRedo ? '#aaa' : '#555'} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.undoRedoButton}
          onPress={onIndent}
        >
          <Ionicons name="arrow-forward" size={20} color={'#555'} />
        </TouchableOpacity>
        {/* Most used JS characters: () {} [] ; = . : ? */}
        {/* Parenthesis buttons */}
        <TouchableOpacity
          style={styles.iphoneKeyButton}
          onPress={() => onInsertParen && onInsertParen('(')}
        >
          <Text style={styles.iphoneKeyButtonText}>(</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iphoneKeyButton}
          onPress={() => onInsertParen && onInsertParen(')')}
        >
          <Text style={styles.iphoneKeyButtonText}>)</Text>
        </TouchableOpacity>
        {/* Curly braces buttons */}
        <TouchableOpacity
          style={styles.iphoneKeyButton}
          onPress={() => onInsertParen && onInsertParen('{')}
        >
          <Text style={styles.iphoneKeyButtonText}>{'{'}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iphoneKeyButton}
          onPress={() => onInsertParen && onInsertParen('}')}
        >
          <Text style={styles.iphoneKeyButtonText}>{'}'}</Text>
        </TouchableOpacity>
        {/* Brackets buttons */}
        <TouchableOpacity
          style={styles.iphoneKeyButton}
          onPress={() => onInsertParen && onInsertParen('[')}
        >
          <Text style={styles.iphoneKeyButtonText}>[</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iphoneKeyButton}
          onPress={() => onInsertParen && onInsertParen(']')}
        >
          <Text style={styles.iphoneKeyButtonText}>]</Text>
        </TouchableOpacity>
        {/* Single quote button */}
        <TouchableOpacity
          style={styles.iphoneKeyButton}
          onPress={() => onInsertParen && onInsertParen("'")}
        >
          <Text style={styles.iphoneKeyButtonText}>'</Text>
        </TouchableOpacity>
        {/* Backtick button */}
        <TouchableOpacity
          style={styles.iphoneKeyButton}
          onPress={() => onInsertParen && onInsertParen('`')}
        >
          <Text style={styles.iphoneKeyButtonText}>{'`'}</Text>
        </TouchableOpacity>
        {/* Semicolon button */}
        <TouchableOpacity
          style={styles.iphoneKeyButton}
          onPress={() => onInsertParen && onInsertParen(';')}
        >
          <Text style={styles.iphoneKeyButtonText}>;</Text>
        </TouchableOpacity>
        {/* Equals button */}
        <TouchableOpacity
          style={styles.iphoneKeyButton}
          onPress={() => onInsertParen && onInsertParen('=')}
        >
          <Text style={styles.iphoneKeyButtonText}>=</Text>
        </TouchableOpacity>
        {/* Dot button */}
        <TouchableOpacity
          style={styles.iphoneKeyButton}
          onPress={() => onInsertParen && onInsertParen('.')}
        >
          <Text style={styles.iphoneKeyButtonText}>.</Text>
        </TouchableOpacity>
        {/* Double quote button */}
        <TouchableOpacity
          style={styles.iphoneKeyButton}
          onPress={() => onInsertParen && onInsertParen('"')}
        >
          <Text style={styles.iphoneKeyButtonText}>"</Text>
        </TouchableOpacity>
        {/* Colon button */}
        <TouchableOpacity
          style={styles.iphoneKeyButton}
          onPress={() => onInsertParen && onInsertParen(':')}
        >
          <Text style={styles.iphoneKeyButtonText}>:</Text>
        </TouchableOpacity>
        {/* Question mark button */}
        <TouchableOpacity
          style={styles.iphoneKeyButton}
          onPress={() => onInsertParen && onInsertParen('?')}
        >
          <Text style={styles.iphoneKeyButtonText}>?</Text>
        </TouchableOpacity>
        {/* Future keyboard-related actions can be added here */}
      </ScrollView>
    </Animated.View>
  );
};

const ActionBar = ({
  onRunCode,
  isExecuting,
  keyboardVisible,
  keyboardActionsVisible,
  onUndo,
  onRedo,
  canUndo,
  canRedo,
  onIndent,
  onInsertParen
}) => {
  const handleRunPress = () => {
    if (!isExecuting) {
      mediumFeedback();
      handleHideKeyboard(); // doesn't work for some reason
      onRunCode();
    }
  };

  const handleHideKeyboard = () => {
    mediumFeedback();
    Keyboard.dismiss();
  };
  return (
    <View style={[styles.actionBar, { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }]}> 
      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
        <KeyboardActions
          onHideKeyboard={handleHideKeyboard}
          visible={keyboardActionsVisible}
          onUndo={onUndo}
          onRedo={onRedo}
          canUndo={canUndo}
          canRedo={canRedo}
          onIndent={onIndent}
          onInsertParen={onInsertParen}
        />
      </View>
      {/* Divider between keyboard actions and run button, only when keyboard is up */}
      {keyboardActionsVisible && <View style={styles.actionBarDivider} />}
      <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 0 }}>
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
