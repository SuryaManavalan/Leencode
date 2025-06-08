import { StyleSheet, Platform } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginHorizontal: 8,
  },
  chatButton: {
    padding: 8,
  },  problemDescription: {
    backgroundColor: '#fff',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  descriptionHeader: {
    marginBottom: 8,
  },
  descriptionText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#333',
    marginBottom: 8,
  },
  difficultyText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  collapsedDescription: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  collapsedText: {
    fontSize: 12,
    color: '#666',
    marginRight: 4,
  },
  collapseButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  collapseText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 2,
  },
  codeContainer: {
    flex: 1,
    backgroundColor: '#1e1e1e',
    padding: 8,
  },
  codeEditor: {
    flex: 1,
    color: '#fff',
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    fontSize: 14,
    lineHeight: 20,
    padding: 8,
  },
  undoRedoButton: {
    backgroundColor: '#f0f0f0', // Match hideKeyboardButton background
    borderRadius: 6,
    padding: 8,
    marginHorizontal: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  undoRedoButtonDisabled: {
    backgroundColor: '#e0e0e0', // Light grey for disabled state
  },
  actionBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  actionBarDivider: {
    width: 1,
    height: 32,
    backgroundColor: '#e0e0e0',
    marginHorizontal: 10,
    alignSelf: 'center',
  },
  keyboardActionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  hideKeyboardButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderRadius: 4,
    marginRight: 10,
  },
  runButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0066ff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 4,
  },
  runButtonDisabled: {
    backgroundColor: '#99ccff',
  },
  runButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 8,
  },
  consoleContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#f8f8f8',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    maxHeight: '75%', // Use string for percentage in React Native
    minHeight: 150,
  },
  consoleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  consoleTitle: {
    fontWeight: 'bold',
    color: '#333',
  },
  consoleText: {
    padding: 8,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    fontSize: 12,
    color: '#333',
  },
  iphoneKeyButton: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#d1d1d6',
    paddingVertical: 6,
    paddingHorizontal: 10,
    marginHorizontal: 2,
    minWidth: 28,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.07,
    shadowRadius: 1,
    elevation: 1,
  },
  iphoneKeyButtonText: {
    fontSize: 18,
    color: '#222',
    fontWeight: '400',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
});

export default styles;
