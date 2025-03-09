import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

	const disposable = vscode.commands.registerCommand('dockplate.selectDockerImage', async () => {
		const url = 'https://raw.githubusercontent.com/Dockplate/dockerfiles/refs/heads/master/data/data.json';
		const response = await fetch(url);
		const data: string[] = await response.json() as string[];

		const capitalizedData = data.map((item: string) => item.charAt(0).toUpperCase() + item.slice(1));

		const selectedOption = await vscode.window.showQuickPick(capitalizedData as any[], {
			placeHolder: 'Select a Docker Image'
		});

		if (selectedOption) {
			const lang = selectedOption.toLowerCase();
			const workspaceFolder = vscode.workspace.workspaceFolders ? vscode.workspace.workspaceFolders[0] : undefined;
			if (workspaceFolder) {
				const dockerfilePath = vscode.Uri.joinPath(workspaceFolder.uri, 'Dockerfile');
				const dockerfileUri = vscode.Uri.parse(dockerfilePath.toString());
				const dockerfileUrl = `https://raw.githubusercontent.com/Dockplate/dockerfiles/refs/heads/master/${lang}/Dockerfile`;
				const dockerfileResponse = await fetch(dockerfileUrl);
				const dockerfileContent = await dockerfileResponse.text();
				await vscode.workspace.fs.writeFile(dockerfileUri, Buffer.from(dockerfileContent));
				vscode.window.showInformationMessage(`Dockerfile for ${selectedOption} created successfully!`);
			} else {
				vscode.window.showErrorMessage('Unable to create Dockerfile. No workspace folder found.');
			}
		}
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}
