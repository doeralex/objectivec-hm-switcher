# Objective-C Header/Implementation File Switcher

This is a visual studio code editor plugin for quickly switching between Objective-C header files (.h) and implementation files (.m/.mm).

All code and descriptions were created by AI.

## Features

- Quickly switch between .h files and corresponding .m/.mm files
- Automatically detect .m or .mm files
- If the target file doesn't exist, provides an option to create the file and automatically fills in template content
- Supports right-click menu and shortcut key operations

## Usage

When editing an Objective-C file (.h/.m/.mm), you can switch to the corresponding file via:

1. Using shortcuts:
   - macOS: `Cmd+Alt+O`
   - Windows/Linux: `Ctrl+Alt+O`
   
2. Through the command palette (`Cmd+Shift+P` or `Ctrl+Shift+P`), search and execute the "Switch to corresponding .h/.m file" command

3. Via the editor right-click menu, select "Switch to corresponding .h/.m file"

## Features

- Automatically detects and supports .mm files (Objective-C++)
- Generates standard templates when creating new files
- Simple and intuitive interface prompts

## Installation

1. Open the Extensions panel in the Cursor editor
2. Search for "Objective-C Switcher"
3. Click Install

## Build Instructions

If you want to build this extension from source:

1. Clone the repository
2. Run `npm install` to install dependencies
3. Press `F5` to start a debug session

## License

MIT

## About

This plugin aims to improve Objective-C development efficiency by avoiding the hassle of manually switching between header and implementation files. Hope it brings convenience to your Objective-C development! 