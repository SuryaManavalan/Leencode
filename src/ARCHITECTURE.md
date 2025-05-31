# LeenCode Project Architecture

## Folder Structure

The project follows a component-based architecture with the following structure:

```
src/
├── components/         # Reusable UI components
├── data/               # Data files (problems, etc.)
├── navigation/         # Navigation-related files
├── screens/            # Application screens
│   ├── AIChatScreen/   # AI Chat screen
│   │   ├── index.js    # Component logic
│   │   └── styles.js   # Component styles
│   ├── CodeEditorScreen/
│   │   ├── components/   # Component-based architecture
│   │   │   ├── ActionBar.js
│   │   │   ├── CodeEditor.js
│   │   │   ├── ConsoleWindow.js
│   │   │   ├── EditorHeader.js
│   │   │   ├── ProblemDescription.js
│   │   │   └── index.js
│   │   ├── index.js
│   │   └── styles.js
│   └── HomeScreen/
│       ├── index.js
│       └── styles.js
└── utils/              # Utility functions
```

## Architecture

Each screen component follows a similar pattern:
- `index.js` - Contains the component logic and JSX
- `styles.js` - Contains the component styles using StyleSheet

This separation of concerns makes the codebase more maintainable and easier to understand.

### Component-Based Architecture for CodeEditorScreen

The `CodeEditorScreen` has been refactored to follow a more modular, component-based architecture. This approach divides the screen into smaller, focused components that are easier to maintain and test.

#### Components:

1. **EditorHeader** (`EditorHeader.js`)
   - Handles the navigation header with back button
   - Contains the title of the problem
   - Provides access to the AI Chat feature

2. **ProblemDescription** (`ProblemDescription.js`)
   - Displays the problem description text
   - Shows difficulty level with appropriate color coding
   - Conditionally renders based on whether it's a blank editor or a problem

3. **CodeEditor** (`CodeEditor.js`)
   - Provides the main code editing interface
   - Manages the text input for writing code
   - Handles code formatting and appearance

4. **ActionBar** (`ActionBar.js`)
   - Contains the "Run Code" button
   - Displays loading indicator during code execution
   - Manages the visual state of execution controls

5. **ConsoleWindow** (`ConsoleWindow.js`)
   - Shows execution results and errors
   - Provides a toggle mechanism to show/hide console
   - Adapts positioning based on keyboard visibility

#### Data Flow:

- The parent `CodeEditorScreen` component maintains all state
- State is passed down to child components as props
- Event handlers are passed down to allow components to trigger state changes
- This follows a unidirectional data flow pattern for predictable state management

#### Benefits:

- **Modularity**: Each component has a single responsibility
- **Maintainability**: Easier to update individual parts without affecting others
- **Reusability**: Components can potentially be reused in other screens
- **Readability**: Code is more organized and easier to understand
- **Testability**: Smaller components are easier to test in isolation

### Imports

When importing components:
- Use relative imports for local components
- Use absolute imports for third-party libraries

Example:
```javascript
// Correct imports for components
import HomeScreen from '../screens/HomeScreen';
import styles from './styles';
```

## Navigation

The app uses React Navigation with a stack navigator defined in `src/navigation/AppNavigator.js`.

## Styling

All styles are defined in separate `styles.js` files for each component to keep the component logic clean and focused.

For the component-based architecture in `CodeEditorScreen`, we've chosen to:
- Keep all styles in the parent component's `styles.js` file
- Import these styles into each child component
- This approach maintains consistency across components while keeping the style definitions centralized

Future improvements could include:
- Moving component-specific styles to individual style files
- Using a theme provider for consistent colors and dimensions
- Implementing responsive design patterns for different screen sizes
