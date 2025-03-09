import * as vscode from 'vscode';
import { getDockerImages } from './utils/fetch';
import { downloadDockerfile } from './dockerfileManager';

/**
 * Handles the Docker image selection process.
 */
export async function selectDockerImage() {
    try {
        const dockerImages = await getDockerImages();
        const selectedOption = await vscode.window.showQuickPick(dockerImages, {
            placeHolder: 'Select a Docker Image'
        });

        if (!selectedOption) return;

        const lang = selectedOption.toLowerCase();
        const workspaceFolder = vscode.workspace.workspaceFolders?.[0];

        if (!workspaceFolder) {
            vscode.window.showErrorMessage('Unable to create Dockerfile. No workspace folder found.');
            return;
        }

        await downloadDockerfile(lang, workspaceFolder);
    } catch (error:any) {
        vscode.window.showErrorMessage(`Error: ${error.message}`);
    }
}
