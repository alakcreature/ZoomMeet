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

    const scriptUri = webviewView.webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, "media", "script.js")
    );


    const cssUri = webviewView.webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, "media", "styles.css")
    );

    webviewView.webview.html = this._getHtml(cssUri, scriptUri);
  }

  _getHtml(cssUri, scriptUri) {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Meeting Launcher Pro</title>
        <link href="${cssUri}" rel="stylesheet" />
    </head>
    <body>
        <div class="card">
            <div class="card-header">
                <h1 class="card-title">Meeting Launcher Pro</h1>
                <p class="card-description">Quickly launch your meetings</p>
            </div>
            <div class="card-content">
                <!-- Zoom Meeting Section -->
                <div class="meeting-section zoom-section">
                    <h2 class="section-title">Zoom Meeting</h2>
                    <div class="input-group">
                        <input type="text" class="link-input" id="zoom-link" placeholder="Enter your personal Zoom link">
                        <button class="copy-button" id="copy-zoom" aria-label="Copy Zoom link">
                            <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                            </svg>
                        </button>
                    </div>
                    <a href="#" class="launch-link zoom-button" id="launch-zoom">
                        Start Zoom Meeting
                        <svg class="icon arrow-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                            <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                    </a>
                    <p class="helper-text">Your link will be saved automatically when entered</p>
                </div>
                
                <!-- Google Meet Section -->
                <div class="meeting-section google-section">
                    <h2 class="section-title">Google Meet</h2>
                    <div class="input-group">
                        <input type="text" class="link-input" id="google-link" placeholder="Enter your personal Google Meet link">
                        <button class="copy-button" id="copy-google" aria-label="Copy Google Meet link">
                            <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                            </svg>
                        </button>
                    </div>
                    <a href="#" class="launch-link google-button" id="launch-google">
                        Start Google Meeting
                        <svg class="icon arrow-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                            <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                    </a>
                    <p class="helper-text">Your link will be saved automatically when entered</p>
                </div>
            </div>
            <div class="card-footer">
                Launch your meetings with one click
            </div>
        </div>
    
        <div class="toast" id="toast">Copied to clipboard!</div>
    
        <script src="${scriptUri}"></script>
    </body>
    </html>`;
}
}

module.exports = {
  activate
};
