import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { lightFeedback } from '../../../utils/haptics';
import styles from '../styles';

const ProblemDescription = ({ problem }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  const toggleCollapse = (collapsed) => {
    lightFeedback();
    setIsCollapsed(collapsed);
  };
  
  if (problem.id === 'blank') {
    return null;
  }
  
  return (
    <View>
      {isCollapsed ? (
        <TouchableOpacity 
          style={styles.collapsedDescription}
          onPress={() => toggleCollapse(false)}
          activeOpacity={0.7}
        >
          <Text style={styles.collapsedText}>Show Description</Text>
          <MaterialIcons name="keyboard-arrow-down" size={16} color="#666" />
        </TouchableOpacity>
      ) : (
        <View style={styles.problemDescription}>
          <View style={styles.descriptionHeader}>
            <Text style={styles.descriptionText}>{problem.description}</Text>
            <Text style={[styles.difficultyText, { color: getDifficultyColor(problem.difficulty) }]}>
              Difficulty: {problem.difficulty}
            </Text>
          </View>
          <TouchableOpacity 
            style={styles.collapseButton}
            onPress={() => toggleCollapse(true)}
            activeOpacity={0.7}
          >
            <MaterialIcons name="keyboard-arrow-up" size={16} color="#666" />
            <Text style={styles.collapseText}>Hide</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const getDifficultyColor = (difficulty) => {
  switch (difficulty?.toLowerCase()) {
    case 'easy': return '#5cb85c';
    case 'medium': return '#f0ad4e';
    case 'hard': return '#d9534f';
    default: return '#0275d8';
  }
};

export default ProblemDescription;
