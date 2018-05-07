import {Parser} from './Parser';
import * as fs from 'fs';

  export abstract class ComponentParser extends Parser {
        
    _extension?:string;
    constructor(description:string,possibleBaseDirs:string[],extension?:string)
    {
      super(description,possibleBaseDirs);
      
      if(extension)
      {
        this._extension=extension;
      }
    }
    abstract parse(selectedText: string): [boolean,string] ;

    protected buildComponentPath(matchedText: string):[boolean,string] {
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



  