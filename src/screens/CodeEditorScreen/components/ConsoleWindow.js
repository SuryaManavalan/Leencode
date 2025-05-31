import React, { useRef, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, PanResponder } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { lightFeedback } from '../../../utils/haptics';
import styles from '../styles';

const ConsoleWindow = ({ consoleOutput, onClose, keyboardVisible }) => {
  const handleClose = () => {
    lightFeedback();
    onClose();
  };

  // Draggable height logic
  const MIN_HEIGHT = 150;
  const MAX_HEIGHT = 1000;
  const DEFAULT_HEIGHT = 200;
  const [consoleHeight, setConsoleHeight] = useState(DEFAULT_HEIGHT);
  const lastHeight = useRef(DEFAULT_HEIGHT);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => Math.abs(gestureState.dy) > 2,
      onPanResponderGrant: () => {},
      onPanResponderMove: (evt, gestureState) => {
        let newHeight = lastHeight.current - gestureState.dy;
        if (newHeight < MIN_HEIGHT) newHeight = MIN_HEIGHT;
        if (newHeight > MAX_HEIGHT) newHeight = MAX_HEIGHT;
        setConsoleHeight(newHeight);
      },
      onPanResponderRelease: (evt, gestureState) => {
        let newHeight = lastHeight.current - gestureState.dy;
        if (newHeight < MIN_HEIGHT) newHeight = MIN_HEIGHT;
        if (newHeight > MAX_HEIGHT) newHeight = MAX_HEIGHT;
        lastHeight.current = newHeight;
        setConsoleHeight(newHeight);
      },
    })
  ).current;

  return (
    <View style={[
      styles.consoleContainer,
      { height: consoleHeight },
      keyboardVisible && { bottom: 0 }
    ]}>
      {/* Console Header: label left, drag bar absolutely centered, close right */}
      <View style={[styles.consoleHeader, { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', position: 'relative' }]}> 
        {/* Label on the left */}
        <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'center', zIndex: 2 }}>
          <Text style={styles.consoleTitle}>Console Output</Text>
        </View>
        {/* Close button on the right */}
        <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center', zIndex: 2 }}>
          <TouchableOpacity onPress={handleClose}>
            <Ionicons name="close" size={20} color="#333" />
          </TouchableOpacity>
        </View>
        {/* Drag bar absolutely centered, smaller touch area, above label */}
        <View
          {...panResponder.panHandlers}
          style={{ position: 'absolute', left: '40%', right: '40%', top: 0, bottom: 0, alignItems: 'center', justifyContent: 'center', zIndex: 3 }}
          hitSlop={{ top: 8, bottom: 8, left: 0, right: 0 }}
        >
          <View style={{ width: 40, height: 4, borderRadius: 2, backgroundColor: '#bbb' }} />
        </View>
      </View>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1, paddingBottom: 32 }}>
        <Text style={styles.consoleText}>{consoleOutput}</Text>
      </ScrollView>
    </View>
  );
};

export default ConsoleWindow;
