# Zoom / Google & Google Meet for VS Code Extension

This **Zoom / Google & Google Meet** extension for Visual Studio Code allows you to **start new Zoom / Google / Google meetings directly from the editor**. It simplifies the process of creating Zoom / Google meetings by integrating the feature into your VS Code environment, making collaboration easier and more convenient.

### Features
- **Start Zoom / Google meetings directly from VS Code**: No need to open the Zoom / Google app or web browser.
- **Quick access** to Zoom / Google meetings from the **Activity Bar**.
- **Webview for direct interaction**: Start Zoom / Google meetings with a single click from the webview interface.


### Demo

![Demo](demo.gif) [](demo.gif)


## Installation

### Install via Visual Studio Code Marketplace

1. Open **VS Code**.
2. Navigate to the **Extensions View** (`Ctrl+Shift+X` or `Cmd+Shift+X`).
3. Search for **"Zoom Meet"**.
4. Click **Install**.

## Usage

Once installed, you will see a new icon in the **Activity Bar** with the label "Zoom / Google". You can access this to start a Zoom / Google meeting directly from the editor.

- Click the **Start Zoom Meeting / Start Google Meet** icon in the Activity Bar.
- Two buttons in the webview will allow you to **start a new Zoom / Google meeting**.
- You can also use the **command palette** or the keyboard shortcut (`Control+Option+Z` / `Control+Option+G`) to trigger the **Zoom / Google meeting** creation.

### Command

The extension registers the following command:

- `zoom.startMeet / googlemeet.startMeet`: Starts a new Zoom / Google meeting by opening the Zoom / Google website.

### Keybindings

You can use the following keyboard shortcut:

- **Windows/Linux**: `Ctrl+Alt+Z` / `Ctrl+Alt+G`
- **macOS**: `Control+Option+Z`

To modify or add additional keybindings, you can do so from the **Keyboard Shortcuts** (`Ctrl+K Ctrl+S`).

## Development

To contribute to this project or to modify it for your own needs, follow these steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/subham-available/ZoomMeet.git
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Compile the code:
    ```bash
    npm run compile
    ```

4. Start debugging the extension:
    - Press `F5` to open the **Extension Development Host** and test the extension.

5. After making changes, ensure the extension is properly compiled and reloaded.

---

## Acknowledgements

Thanks to the **Visual Studio Code API** and the **Zoom / Google** for making this extension possible!

---

Feel free to replace or add any additional information depending on your needs.
