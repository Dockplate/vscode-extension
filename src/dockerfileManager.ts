import * as vscode from 'vscode';
import { fetchData } from './utils/fetch';

/**
 * Downloads and saves the selected Dockerfile.
 */
export async function downloadDockerfile(lang: string, workspaceFolder: vscode.WorkspaceFolder) {
    const dockerfileUrl = `https://raw.githubusercontent.com/Dockplate/dockerfiles/refs/heads/master/${lang}/Dockerfile`;
    const dockerfilePath = vscode.Uri.joinPath(workspaceFolder.uri, 'Dockerfile');

    try {
        const dockerfileContent = await fetchData<string>(dockerfileUrl, "text");
        await vscode.workspace.fs.writeFile(dockerfilePath, Buffer.from(dockerfileContent));
        vscode.window.showInformationMessage(`Dockerfile for ${lang} created successfully!`);
    } catch (error:any) {
        vscode.window.showErrorMessage(`Failed to fetch Dockerfile: ${error.message}`);
    }
}
