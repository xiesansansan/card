// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { CompletionContext } from 'vscode';
import { systemDefaultPlatform } from 'vscode-test/out/util';

let editor;
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
/**
 * 
 * @param context 
 */
export function activate(context: vscode.ExtensionContext) {


	editor = vscode.window.activeTextEditor;
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "plug-lua" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('extension.demoCmd', () => {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		// vscode.window.showInformationMessage('Hello World from plug-lua!');
		// vscode.window.activeTextEditor?.edit((e)=>{e.insert(new vscode.Position(1,0),'--this is a test!\r\n--本来就没有')});
		editor = vscode.window.activeTextEditor;
		let index = editor?.selection.start.line || 0;
		vscode.window.showInformationMessage(index.toString());
		let line = editor?.document.lineAt(index);
		if (line) {
			// if(line.text=='--')
			// {
			editor?.edit((e) => { e.insert(new vscode.Position(index, 0), '--this is a test2\r\n--本来就没有,1,2') });
			// }
		}


	});

	context.subscriptions.push(disposable);

	// let qq = vscode.workspace.onDidChangeTextDocument(e=>{
	// 	editor = vscode.window.activeTextEditor;
	// 	let index = editor?.selection.start.line || 0;
	// 	vscode.window.showInformationMessage(index.toString());
	// 	let line = editor?.document.lineAt(index);
	// 	if(line)
	// 	{
	// 		if(line.text=='--')
	// 		{
	// 			editor?.edit((e)=>{e.insert(new vscode.Position(index,0),'--this is a test2\r\n--本来就没有,1,2')});
	// 		}
	// 	}
	// });

	// context.subscriptions.push(qq);
	// vscode.window.activeTextEditor?.insertSnippet


	let demoProvider2 = new demoProvider();
	let cppPv = vscode.languages.registerCompletionItemProvider("lua", demoProvider2, '-');
	context.subscriptions.push(cppPv);
}

// this method is called when your extension is deactivated
export function deactivate() { }


export class demoProvider implements vscode.CompletionItemProvider {
	public provideCompletionItems(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken, context: vscode.CompletionContext): vscode.CompletionItem[] {


		var completionItems: vscode.CompletionItem[] = [];
		var completionItem = new vscode.CompletionItem("lua-comment");
		completionItem.kind = vscode.CompletionItemKind.Constructor;
		completionItem.detail = "aaa";
		completionItem.filterText = "lua";

		completionItem.insertText = new vscode.SnippetString(this.getInsertStr());

		let index = vscode.window.activeTextEditor?.selection.start.line || 0;
		let lineCount = vscode.window.activeTextEditor?.document.lineCount || 0;
		let line = vscode.window.activeTextEditor?.document.lineAt(index);
		let lineText = line?.text || '';
		if (lineText.startsWith('--') && lineText.trim() == '--') {
			if (index < lineCount - 1) {
				let nextLine = vscode.window.activeTextEditor?.document.lineAt(index + 1);
				let nextLineText = nextLine?.text || '';
				if (nextLineText.match(/.*function.*\(.*\)/)) {
					completionItems.push(completionItem);
				}
			}
		}


		return completionItems;
	}
	public resolveCompletionItem(item: vscode.CompletionItem, token: vscode.CancellationToken): any {

		return item;
	}
	dispose() {

		let index = vscode.window.activeTextEditor?.selection.start.line || 0;
		vscode.window.activeTextEditor?.edit((e) => {
			e.delete(new vscode.Range(new vscode.Position(index, 0), new vscode.Position(index, 1)));
		});
	}


	getInsertStr() {

		let str = " ${1:返回值}";
		let index = vscode.window.activeTextEditor?.selection.start.line || 0;
		let sum = vscode.window.activeTextEditor?.document.lineCount || 0;
		if (index < sum) {
			let line = vscode.window.activeTextEditor?.document.lineAt(index + 1);
			let paramStr = line?.text.replace(/.*\(/, '').replace(/\).*/, '').trim();
			let paramArr = paramStr?.split(',') || [];
			if (paramStr != '' && paramArr?.length > 0) {
				for (let i = 0; i < paramArr.length; i++) {
					str += "\r\n-- @param " + paramArr[i] + " 参数描述";
				}
			}
		}


		return str;
	}

}

