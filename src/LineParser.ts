import { ComponentParser } from './ComponentParser';

export class LineParser extends ComponentParser
{
    _cursorPos:number=0;
    constructor(description:string,possibleBaseDirs:string[],cursorPos:number,extension:string)
    {
      super(description,possibleBaseDirs,extension);
      this._cursorPos=cursorPos;
      
    }
    parse(selectedText: string): [boolean,string] {

        var currentCurPos=this._cursorPos;
        var startCurPos:number=-1,endCurPos:number=-1;
        while (currentCurPos!==0) {
            if(selectedText[currentCurPos]==="'" || selectedText[currentCurPos]==="\"")
            {
                startCurPos=currentCurPos;
                break;
            }
            currentCurPos--;
        }
        currentCurPos=this._cursorPos;
        while (currentCurPos!==0) {
            if(selectedText[currentCurPos]==="'" || selectedText[currentCurPos]==="\"")
            {
                endCurPos=currentCurPos;
                break;
            }
            currentCurPos++;
        }
        if (startCurPos!==-1 && endCurPos!==-1) {
            selectedText=selectedText.substr(startCurPos+1,(endCurPos-(startCurPos+1)));
            return this.buildComponentPath(selectedText);    
        }
        else
        {
            return [false,""];
        }        
        
    }
}