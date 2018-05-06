class RequestProcessor {
    _handlers: BaseHandler[] = [];
    constructor(public handlers: BaseHandler[]) {
        this._handlers = handlers;
    }
    Add(handler: BaseHandler) {
        this._handlers.push(handler);
    }
    Execute():vscode.Uri 
    {
        this._handlers.forEach(handler => {
            try {
                handler.handleRequest(1);

            } catch (error) {
                
            }
            
        });
    }

}