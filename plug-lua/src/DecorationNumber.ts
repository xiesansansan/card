export class DecorationNumber {
    private timeout: NodeJS.Timer | undefined;
  
    constructor() {
      this.editor = window.activeTextEditor;
      this.timeout = undefined;
      window.onDidChangeActiveTextEditor(() => {
        this.editor = window.activeTextEditor;
        this.triggerUpdateDecorations(); 
      });
  
      workspace.onDidChangeTextDocument(() => {
        this.triggerUpdateDecorations();
      });
    }
  
    public triggerUpdateDecorations() {
      if(this.timeout) {
          clearTimeout(this.timeout);
          this.timeout = undefined;
      }
      this.timeout = setTimeout(this.DecNumber(), 500);
    }
  }