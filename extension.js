// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const fs = require('fs');
const path = require('path');

const indexJsContent = fs.readFileSync(path.join(__dirname, 'templates', 'index.js.template'), 'UTF-8');
const componentJsxContent = fs.readFileSync(path.join(__dirname, 'templates', 'component.jsx.template'), 'UTF-8');
const styleCssContent = fs.readFileSync(path.join(__dirname, 'templates', 'style.css.template'), 'UTF-8');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('extension.createComponent', function (folderPathObject) {
		// The code you place here will be executed every time your command is executed
		const folderPath = folderPathObject.fsPath;

		vscode.window.showInputBox({ placeHolder: 'Имя нового компонента' }).then(filename => {
			if(!filename) return;

			const targetDir = `${folderPath}/${filename}`;

			if (!fs.existsSync(targetDir)){
				fs.mkdirSync(targetDir);
			}

			const preparedIndexJsContent = indexJsContent.replace(new RegExp('{filename}', 'g'), filename);

			let preparedComponentJsxContent = componentJsxContent.replace(new RegExp('{filename}', 'g'), filename);
			preparedComponentJsxContent = preparedComponentJsxContent.replace(new RegExp('{filenameLowerCase}', 'g'), filename.toLowerCase());

			let preparedStyleCssContent = styleCssContent.replace(new RegExp('{filename}', 'g'), filename);
			preparedStyleCssContent = preparedStyleCssContent.replace(new RegExp('{filenameLowerCase}', 'g'), filename.toLowerCase());

			fs.writeFileSync(`${targetDir}/index.js`, preparedIndexJsContent); 
			fs.writeFileSync(`${targetDir}/${filename}.jsx`, preparedComponentJsxContent); 
			fs.writeFileSync(`${targetDir}/${filename}.css`, preparedStyleCssContent); 

			// vscode.workspace.openTextDocument();
			vscode.workspace.openTextDocument(vscode.Uri.file(`${targetDir}/${filename}.jsx`)).then(doc => vscode.window.showTextDocument(doc))

			// var openPath = vscode.Uri.parse("file:///" + filePath); //A request file path
			// vscode.workspace.openTextDocument(openPath).then(doc => {
			// vscode.window.showTextDocument(doc);
			// });

		});

		// Display a message box to the user
	});

	context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
