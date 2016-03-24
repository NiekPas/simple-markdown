class MarkdownDocument {
    private static instance: MarkdownDocument = new MarkdownDocument();
    private markdownContent: string;
    public set MarkdownContent(v : string) {
        this.markdownContent = v;
    }
    public get MarkdownContent() : string {
        return this.markdownContent;
    }
    
    public get HTMLcontent() : string {
        throw new Error("Not implemented");
    }
    
    constructor() {
        if (MarkdownDocument.instance) {
            throw new Error("Error: Instantiation failed: Use MarkdownDocument.getInstance() instead of new.");
        }
        MarkdownDocument.instance = this;
    }

    public static getInstance(): MarkdownDocument {
        return MarkdownDocument.instance;
    }
}