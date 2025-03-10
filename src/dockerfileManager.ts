import * as vscode from 'vscode';
import { fetchData } from './utils/fetch';

/**
 * Downloads and saves the selected Dockerfile.
 */
export async function downloadDockerfile(lang: string, workspaceFolder: vscode.WorkspaceFolder) {
    if (!workspaceFolder) {
        vscode.window.showErrorMessage("No workspace folder selected.");
        return;
    }

    if (!lang) {
        vscode.window.showErrorMessage("Invalid language selection.");
        return;
    }

    const dockerfileUrl = `https://raw.githubusercontent.com/Dockplate/dockerfiles/refs/heads/master/${lang}/Dockerfile`;
    const dockerfilePath = vscode.Uri.joinPath(workspaceFolder.uri, 'Dockerfile');

    try {
        const dockerfileContent = await fetchData<string>(dockerfileUrl, "text");

        // Check if file already exists
        try {
            await vscode.workspace.fs.stat(dockerfilePath);
            const overwrite = await vscode.window.showWarningMessage(
                `Dockerfile already exists. Do you want to overwrite it?`,
                'Yes', 'No'
            );
            if (overwrite !== 'Yes') return;
        } catch (err) {
            // File does not exist, continue
        }

        await vscode.workspace.fs.writeFile(dockerfilePath, Buffer.from(dockerfileContent));
        vscode.window.showInformationMessage(`Dockerfile for ${lang} created successfully!`);
    } catch (error: any) {
        vscode.window.showErrorMessage(`Failed to fetch Dockerfile: ${error.message}`);
    }
}
