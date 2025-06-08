import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { lightFeedback } from '../../utils/haptics';
import { problems } from '../../data/problems';
import styles from './styles';

const STORAGE_KEY = 'finishedProblems';

const HomeScreen = ({ navigation }) => {
  const [finishedProblems, setFinishedProblems] = useState([]);

  // Load finishedProblems from storage on mount
  useEffect(() => {
    const loadFinishedProblems = async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored) setFinishedProblems(JSON.parse(stored));
      } catch (e) {
        // handle error if needed
      }
    };
    loadFinishedProblems();
  }, []);

  // Save finishedProblems to storage whenever it changes
  useEffect(() => {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(finishedProblems));
  }, [finishedProblems]);

  const handleProblemPress = (problemId) => {
    lightFeedback();
    navigation.navigate('CodeEditor', { problemId });
  };

  const handleProblemLongPress = (problemId) => {
    setFinishedProblems((prev) =>
      prev.includes(problemId)
        ? prev.filter((id) => id !== problemId)
        : [...prev, problemId]
    );
  };

  const renderProblemItem = ({ item }) => {
    const isFinished = finishedProblems.includes(item.id);
    return (
      <TouchableOpacity
        style={[
          styles.problemItem,
          item.id === 'blank' ? styles.blankEditorItem : null,
          { borderLeftColor: getBorderColor(item.difficulty) },
          isFinished ? { opacity: 0.5, backgroundColor: '#e0e0e0', paddingVertical: 8 } : null
        ]}
        onPress={() => handleProblemPress(item.id)}
        onLongPress={() => handleProblemLongPress(item.id)}
      >
        {isFinished && item.id !== 'blank' ? (
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={[styles.problemId, { marginRight: 8 }]}>#{item.id}</Text>
            <Text style={styles.problemTitle}>{item.title}</Text>
            <Text style={[
              styles.difficultyBadge,
              { backgroundColor: getDifficultyColor(item.difficulty), marginLeft: 8 }
            ]}>
              {item.difficulty}
            </Text>
          </View>
        ) : (
          <>
            <Text style={styles.problemTitle}>{item.title}</Text>
            {item.id !== 'blank' && (
              <View style={styles.problemDetails}>
                <Text style={styles.problemId}>#{item.id}</Text>
                <Text style={[
                  styles.difficultyBadge,
                  { backgroundColor: getDifficultyColor(item.difficulty) }
                ]}>
                  {item.difficulty}
                </Text>
              </View>
            )}
          </>
        )}
      </TouchableOpacity>
    );
  };

  const getBorderColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'easy': return '#5cb85c';
      case 'medium': return '#f0ad4e';
      case 'hard': return '#d9534f';
      default: return '#0275d8'; // For "blank" editor option
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'easy': return '#5cb85c';
      case 'medium': return '#f0ad4e';
      case 'hard': return '#d9534f';
      default: return '#0275d8';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>LeenCode</Text>
      </View>
      <FlatList
        data={problems}
        renderItem={renderProblemItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
