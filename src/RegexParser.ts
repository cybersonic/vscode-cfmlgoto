import {Parser} from './Parser';
import * as fs from 'fs';

  export class RegexParser extends Parser {
    
    _expression:RegExp;
    _extension?:string;
    constructor(description:string,possibleBaseDirs:string[], expr:RegExp,extension?:string)
    {
      super(description,possibleBaseDirs);
      this._expression=expr;
      if(extension)
      {
        this._extension=extension;
      }
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

    private buildComponentPath(matchedText: string):[boolean,string] {
        let result:[boolean,string]=[false,""];
        var componentName: string = matchedText;
        var componentpath: string = componentName;
        var componentFilePath:string ;
        if (componentName.indexOf(".") !== -1) {
          componentpath = componentName.split(".").join("\\");
        }
        for (let index = 0; index < this._possibleBaseDirs.length; index++) {
          const baseDir = this._possibleBaseDirs[index];
          componentFilePath = baseDir + "\\" + componentpath + this._extension;
           try {
            fs.accessSync(componentFilePath);
            result=[true,componentFilePath];
            return result;
          }
          catch (error) {   
            //don't do anything if file does not exist         
          }          
        }      
        return result;
      }
      
    
  }



  