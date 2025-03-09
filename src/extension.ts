import * as vscode from 'vscode';
import { selectDockerImage } from './commands';

export function activate(context: vscode.ExtensionContext) {
    const disposable = vscode.commands.registerCommand('dockplate.selectDockerImage', selectDockerImage);
    context.subscriptions.push(disposable);
}

export function deactivate() {}
