const vscode = require("vscode");

/**
 * Activates the extension.
 */
function activate(context) {
  const startZoomMeet = vscode.commands.registerCommand("zoom.startMeet", async () => {
    const zoomLink = "https://us04web.zoom.us/start/videomeeting";
    await vscode.env.openExternal(vscode.Uri.parse(zoomLink));
  });

  const startGoogleMeet = vscode.commands.registerCommand("googlemeet.startMeet", async () => {
    const googleMeetLink = "https://meet.google.com/new";
    await vscode.env.openExternal(vscode.Uri.parse(googleMeetLink));
  });

  context.subscriptions.push(startZoomMeet, startGoogleMeet);

  const provider = new MeetingWebviewProvider(context.extensionUri);
  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(MeetingWebviewProvider.viewType, provider)
  );
}

/**
 * Webview provider showing both Zoom and Google Meet buttons.
 */
class MeetingWebviewProvider {
  static viewType = "meetings.view";

  constructor(extensionUri) {
    this._extensionUri = extensionUri;
  }

  resolveWebviewView(webviewView, context, _token) {
    webviewView.webview.options = {
      enableScripts: true,
      localResourceRoots: [this._extensionUri]
    };

    webviewView.webview.html = this._getHtml();
  }

  _getHtml() {
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Meetings</title>
        <style>
          body {
            font-family: sans-serif;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 100vh;
            gap: 20px;
          }
          button {
            padding: 12px 24px;
            font-size: 16px;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            color: white;
          }
          .zoom {
            width: 240px;
            background-color: #2d8cff;
          }
          .google {
            width: 240px;
            background-color: #34a853;
          }
          button:hover {
            opacity: 0.9;
          }
        </style>
      </head>
      <body>
        <a href="https://us04web.zoom.us/start/videomeeting" target="_blank">
          <button class="zoom">Start Zoom Meeting</button>
        </a>
        <a href="https://meet.google.com/new" target="_blank">
          <button class="google">Start Google Meet</button>
        </a>
      </body>
      </html>
    `;
  }
}

module.exports = {
  activate
};
