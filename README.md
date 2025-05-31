# LeenCode

A mobile LeetCode-like app for coding practice on the go.

## Features

- Browse a list of coding problems with difficulty levels
- Code editor with syntax highlighting
- Run code and see execution results
- AI assistant for coding help

## Architecture

The project follows a component-based architecture with clear separation of concerns. Each screen has its own folder containing:
- `index.js` - Component logic
- `styles.js` - Component styles

For more details about the architecture, see [ARCHITECTURE.md](./src/ARCHITECTURE.md).

## Screens

1. **Home Screen**: Lists all available coding problems
2. **Code Editor Screen**: Editor with syntax highlighting and ability to run code
3. **AI Chat Screen**: Chat interface for getting help with coding problems

## Original Prompt
Create the skeleton for that architecture of a mobile leetcode app. With three main views. The home screen is a list of leetcode problems, the first item in the list is "blank editor" which when pressed transitions to the next view, the code editor view. If one of the leetcode list items are pressed to get here it is prepopulated with the boilerplate code for that problem, otherwise blank. The code editor view has a back button at the top left, run button in the middle which minimizes keyboard and brings up the console. And a chat icon which switches to the final view an ai chat view which has a back button to go back to the code editor view.