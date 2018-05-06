class TemplateHandler extends BaseHandler {
  
    handleRequest(req: Number): void {
      if (req > 0) {
        console.log(`Hanlder A process ${req}`);
      } else {
        this.successor.handleRequest(req);
      }
    }
  }