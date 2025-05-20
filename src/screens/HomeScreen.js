import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { problems } from '../data/problems';

const HomeScreen = ({ navigation }) => {
  const renderProblemItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.problemItem,
        item.id === 'blank' ? styles.blankEditorItem : null,
        { borderLeftColor: getBorderColor(item.difficulty) }
      ]}
      onPress={() => navigation.navigate('CodeEditor', { problemId: item.id })}
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
    switch (difficulty) {
      case 'Easy': return '#00b8a3';
      case 'Medium': return '#ffc01e';
      case 'Hard': return '#ff375f';
      default: return '#0066ff';
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return '#00b8a3';
      case 'Medium': return '#ffc01e';
      case 'Hard': return '#ff375f';
      default: return '#0066ff';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" />
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    elevation: 2,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0066ff',
  },
  listContainer: {
    padding: 16,
  },
  problemItem: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    borderLeftWidth: 4,
    elevation: 1,
  },
  blankEditorItem: {
    backgroundColor: '#f0f8ff',
  },
  problemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  problemDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  problemId: {
    color: '#666',
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    fontSize: 12,
    color: '#fff',
  },
});

export default HomeScreen;