import {Parser} from "./Parser";
 import * as vscode from 'vscode';

export class RequestProcessor {
    _handlers: Parser[] = [];    
    constructor() {        
    }
    add(handler: Parser) {
        this._handlers.push(handler);
    }
    execute(selectedText:string):vscode.Uri|undefined 
    {
        for (let index = 0; index < this._handlers.length; index++) {
            const handler = this._handlers[index];
            try {
                let result=handler.parse(selectedText);
                if (result[0]) {
                    return vscode.Uri.file(result[1]);
                }
            } catch (error) {                
            }                       
        }        
    }

}