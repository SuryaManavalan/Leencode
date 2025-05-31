import React from 'react';
import { View, Text, FlatList, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import { lightFeedback } from '../../utils/haptics';
import { problems } from '../../data/problems';
import styles from './styles';

const HomeScreen = ({ navigation }) => {
  const handleProblemPress = (problemId) => {
    lightFeedback();
    navigation.navigate('CodeEditor', { problemId });
  };

  const renderProblemItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.problemItem,
        item.id === 'blank' ? styles.blankEditorItem : null,
        { borderLeftColor: getBorderColor(item.difficulty) }
      ]}
      onPress={() => handleProblemPress(item.id)}
    >
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
    </TouchableOpacity>
  );

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
