export abstract class Parser {
    _description:string;
    _possibleBaseDirs:string[];
    
    constructor(description:string,possibleDirs:string[])
    {
      this._description=description;
      this._possibleBaseDirs=possibleDirs;
      
    }
    abstract parse(selectedText: string): [boolean,string] ;
  }  