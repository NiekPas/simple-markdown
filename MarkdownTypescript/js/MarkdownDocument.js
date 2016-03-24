var MarkdownDocument = (function () {
    function MarkdownDocument() {
        if (MarkdownDocument.instance) {
            throw new Error("Error: Instantiation failed: Use MarkdownDocument.getInstance() instead of new.");
        }
        MarkdownDocument.instance = this;
    }
    Object.defineProperty(MarkdownDocument.prototype, "MarkdownContent", {
        get: function () {
            return this.content;
        },
        enumerable: true,
        configurable: true
    });
    MarkdownDocument.getInstance = function () {
        return MarkdownDocument.instance;
    };
    MarkdownDocument.markdownToHtml = function (markdown) {
        throw new Error("Not implemented");
    };
    MarkdownDocument.instance = new MarkdownDocument();
    return MarkdownDocument;
}());
//# sourceMappingURL=MarkdownDocument.js.map