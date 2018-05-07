import {ComponentParser} from './ComponentParser';
import * as fs from 'fs';

  export class RegexParser extends ComponentParser {
    
    _expression:RegExp;
    _extension?:string;
    constructor(description:string,possibleBaseDirs:string[], expr:RegExp,extension?:string)
    {
      super(description,possibleBaseDirs,extension);
      this._expression=expr;
      
    }
    parse(selectedText: string): [boolean,string] {
      let result:[boolean,string]=[false,""];
      var match=this._expression.exec(selectedText);
      if(match!==null)
      {
        if (this._extension && this._extension==='.cfc')
        {
          result=this.buildComponentPath(match[1]);
        }
        else
        {
          for (let index = 0; index < this._possibleBaseDirs.length; index++) {
            const baseDir = this._possibleBaseDirs[index];
            try {
              var templatePath=baseDir + "\\" + match[1];
              fs.accessSync(templatePath);
              return [true,templatePath];              
            }
            catch (error) {   
              //don't do anything if file does not exist         
            }            
          }          
        }        
      }
      else
      {
        result=[false,""];
      }
      return result;
    }
  }



  