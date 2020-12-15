module.exports =
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.demoProvider = exports.deactivate = exports.activate = void 0;
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = __webpack_require__(1);
let editor;
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
/**
 *
 * @param context
 */
function activate(context) {
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
        let index = (editor === null || editor === void 0 ? void 0 : editor.selection.start.line) || 0;
        vscode.window.showInformationMessage(index.toString());
        let line = editor === null || editor === void 0 ? void 0 : editor.document.lineAt(index);
        if (line) {
            // if(line.text=='--')
            // {
            editor === null || editor === void 0 ? void 0 : editor.edit((e) => { e.insert(new vscode.Position(index, 0), '--this is a test2\r\n--本来就没有,1,2'); });
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
    let cppPv = vscode.languages.registerCompletionItemProvider("lua", demoProvider2);
    context.subscriptions.push(cppPv);
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
class demoProvider {
    provideCompletionItems(document, position, token) {
        var completionItems = [];
        var completionItem = new vscode.CompletionItem("lua-comment");
        completionItem.kind = vscode.CompletionItemKind.TypeParameter;
        completionItem.detail = "aaa";
        completionItem.filterText = "lua";
        completionItem.insertText = new vscode.SnippetString(this.getInsertStr());
        completionItems.push(completionItem);
        return completionItems;
    }
    resolveCompletionItem(item, token) {
        vscode.window.showInformationMessage('这一次,......');
        vscode.window.registerCustomEditorProvider;
        return item;
    }
    dispose() {
        var _a, _b;
        let index = ((_a = vscode.window.activeTextEditor) === null || _a === void 0 ? void 0 : _a.selection.start.line) || 0;
        (_b = vscode.window.activeTextEditor) === null || _b === void 0 ? void 0 : _b.edit((e) => {
            e.delete(new vscode.Range(new vscode.Position(index, 0), new vscode.Position(index, 1)));
        });
    }
    getInsertStr() {
        var _a, _b, _c;
        let str = "-- ${1:返回值}";
        let index = ((_a = vscode.window.activeTextEditor) === null || _a === void 0 ? void 0 : _a.selection.start.line) || 0;
        let sum = ((_b = vscode.window.activeTextEditor) === null || _b === void 0 ? void 0 : _b.document.lineCount) || 0;
        if (index < sum) {
            let line = (_c = vscode.window.activeTextEditor) === null || _c === void 0 ? void 0 : _c.document.lineAt(index + 1);
            let paramStr = line === null || line === void 0 ? void 0 : line.text.replace(/.*\(/, '').replace(/\).*/, '').trim();
            let paramArr = (paramStr === null || paramStr === void 0 ? void 0 : paramStr.split(',')) || [];
            if (paramStr != '' && (paramArr === null || paramArr === void 0 ? void 0 : paramArr.length) > 0) {
                for (let i = 0; i < paramArr.length; i++) {
                    str += "\r\n-- @param " + paramArr[i] + " 参数描述";
                }
            }
        }
        return str;
    }
}
exports.demoProvider = demoProvider;


/***/ }),
/* 1 */
/***/ ((module) => {

module.exports = require("vscode");;

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	// module exports must be returned from runtime so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })()
;
//# sourceMappingURL=extension.js.map