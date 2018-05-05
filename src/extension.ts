'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as path from "path";
import * as fs from "fs";
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    //console.log('Congratulations, your extension "cfgoto" is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('extension.CFGoto', () => {
        // The code you place here will be executed every time your command is executed
        let editor = vscode.window.activeTextEditor;
        if (!editor) {
            return; // No open text editor
        }

        let selection = editor.selection;
        let textLine = editor.document.lineAt(selection.start.line);


        var templateRegex: RegExp = /template=\"(.*)\"/;
        var newRegex: RegExp = /new\D([a-zA-Z0-9\.]*)\(.*/;
        var extendsRegex: RegExp = /\s+extends\s?=\s?[\'\"]([^\s]+)[\'\"]/;
        var implementsRegex: RegExp = /\s+implements\s?=\s?[\'\"]([^\s]+)[\'\"]/;
        var createObjRegex:RegExp=/createObject\(\"component\"\,\"([^\s]+)\"/;
        var match = templateRegex.exec(textLine.text);
        var currentDirName = path.dirname(editor.document.uri.fsPath);
        var gotoDocPath: vscode.Uri | null = null;
        if (match !== null) {
            gotoDocPath = vscode.Uri.file(currentDirName + "\\" + match[1]);

        }
        else {
            match = newRegex.exec(textLine.text);
            if (match === null) {
                match = extendsRegex.exec(textLine.text);
            }
            if(match===null)
            {
                match=implementsRegex.exec(textLine.text);
            }
            if(match===null)
            {
                match=createObjRegex.exec(textLine.text);
            }
            if (match !== null) {
                var componentName: string = match[1];
                var componentpath: string = componentName;
                if (componentName.indexOf(".") !== -1) {
                    componentpath = componentName.split(".").join("\\");
                }
                var componentFilePath = vscode.workspace.rootPath + "\\" + componentpath + ".cfc";

                try {
                    fs.accessSync(componentFilePath);
                } catch (error) {
                    componentFilePath = currentDirName + "\\" + componentpath + ".cfc";
                }
                
               

                gotoDocPath = vscode.Uri.file(componentFilePath);
            }
        }


        if (gotoDocPath !== null) {
            vscode.workspace.openTextDocument(gotoDocPath)
                .then(doc => vscode.window.showTextDocument(doc),
                    error => vscode.window.showInformationMessage(error));
        }

        // Display a message box to the user
        //vscode.window.showInformationMessage('Selected characters: ' + text.length);
        // Display a message box to the user
        //vscode.window.showInformationMessage('Hello World!');
    });

    context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {
}