# 🚢 Dockplate VS Code Extension

A VS Code extension that allows users to quickly select and generate Dockerfiles for various programming languages.

## 📌 Features
- Fetches a list of available Docker images from [Dockplate's GitHub repository](https://github.com/Dockplate/dockerfiles).
- Displays a **Quick Pick** menu to select a Docker image.
- Downloads and saves the corresponding **Dockerfile** in the workspace root.
- Caches the fetched data to improve performance.

## 🛠️ Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/dockplate-vscode-extension.git
   cd dockplate-vscode-extension
   ```
2. Install dependencies:
   ```sh
   yarn install
   ```
3. Open the project in **VS Code** and press `F5` to launch a development instance.

## 🚀 Usage
1. Open a workspace in **VS Code**.
2. Run the command **"Select Docker Image"** from the Command Palette (`Ctrl+Shift+P`).
3. Choose a Docker image from the list.
4. The corresponding **Dockerfile** will be downloaded to your workspace.

## 📝 Development
- Run `npm run lint` to check for errors.
- Use `npm run compile` to compile the extension.
- Test in VS Code by pressing `F5`.