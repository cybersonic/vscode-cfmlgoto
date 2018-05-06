import * as vscode from 'vscode';

module Handlers
{
  export abstract class BaseHandler {
    abstract handleRequest(selectedText: string): vscode.Uri ;
  }  
}


  