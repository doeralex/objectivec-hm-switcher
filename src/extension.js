const vscode = require('vscode');
const path = require('path');
const fs = require('fs');

/**
 * Called when the plugin is activated
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
    // Register command
    let disposable = vscode.commands.registerCommand('objectivec-hm-switcher.switch', function () {
        // Get the active editor
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showInformationMessage('No editor is open');
            return;
        }

        // Get the path of the current file
        const currentFilePath = editor.document.uri.fsPath;
        const currentExt = path.extname(currentFilePath);
        const currentBaseName = path.basename(currentFilePath, currentExt);
        const currentDir = path.dirname(currentFilePath);

        let targetExt = '';
        let targetDesc = '';

        // Determine the target file type based on the current file type
        if (currentExt.toLowerCase() === '.h') {
            targetExt = '.m';
            targetDesc = 'Implementation file';
            
            // Check if .m file does not exist, check if there is a .mm file (Objective-C++ mixed file)
            const mmPath = path.join(currentDir, currentBaseName + '.mm');
            if (fs.existsSync(mmPath)) {
                targetExt = '.mm';
            }
        } else if (currentExt.toLowerCase() === '.m' || currentExt.toLowerCase() === '.mm') {
            targetExt = '.h';
            targetDesc = 'Header file';
        } else {
            vscode.window.showInformationMessage('Current file is not an Objective-C file');
            return;
        }

        // Build the target file path
        const targetPath = path.join(currentDir, currentBaseName + targetExt);

        // Check if the target file exists
        if (fs.existsSync(targetPath)) {
            // Open the target file
            const targetUri = vscode.Uri.file(targetPath);
            vscode.workspace.openTextDocument(targetUri)
                .then(doc => vscode.window.showTextDocument(doc))
        } else {
            // Prompt not found
            vscode.window.showInformationMessage(`Not found: ${currentBaseName}${targetExt}`);
        }
    });

    context.subscriptions.push(disposable);
}

/**
 * Called when the plugin is deactivated
 */
function deactivate() {
    
}

module.exports = {
    activate,
    deactivate
}; 