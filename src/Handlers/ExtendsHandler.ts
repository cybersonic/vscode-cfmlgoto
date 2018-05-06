
module Handlers
{
    export class ExtendsHandler extends Handlers.BaseHandler {
  
        handleRequest(req: Number): void {
          if (req > 0) {
            console.log(`Hanlder A process ${req}`);
          } else {
            this.successor.handleRequest(req);
          }
        }
      }
}
