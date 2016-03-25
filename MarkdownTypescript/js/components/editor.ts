/// <reference path="references.ts"/>

class Editor {
    private document: MarkdownDocument;
    private viewmode: Viewmode = Viewmode.Markdown;
    private theme: ThemeOption = ThemeOption.Dark;
    editorElement: HTMLElement;
    
    /** 
     * Represents the editor
     * @constructor
     * @param {HTMLElement} editorElement - the HTML element which serves as the main text field
    */
    constructor(el: HTMLElement) {
        this.document = MarkdownDocument.getInstance();
        this.editorElement = el;
        this.initialize();	// TODO check if this actually runs
    }
    
    private initialize(): void {
        var self = this;
        $("body").on("keyup", e => {
            if (e.ctrlKey && e.keyCode == 32) {	    // CTRL+spacebar
                var nextViewmode = 
                    self.viewmode == Viewmode.Markdown
                    ? Viewmode.HTML
                    : Viewmode.Markdown
                self.setViewmode(nextViewmode);
            }
            self.document.MarkdownContent = $(self.editorElement).text();
        });
        $("#viewmode").on("click", () => {
            var nextTheme = 
                self.theme == ThemeOption.Dark 
                ? ThemeOption.Light 
                : ThemeOption.Dark;
            self.setTheme(nextTheme);
        });
    }
    
    /**
     * Applies theme to editor.
     * @param {ThemeOption} theme - the theme to apply
     */
    public setTheme(t: ThemeOption) {
        this.theme = t;
        var themeStr = t === ThemeOption.Dark
            ? "dark"
            : "light";
        $("body").removeClass("theme-light theme-dark");
        $("body").addClass(`theme-${themeStr}`);
    }
    
    /** 
     * Applies viewmode to editor.
     * @param {Viewmode} mode - the viewmode to apply
     */
    public setViewmode(m: Viewmode): void {
        this.viewmode = m;
        var viewmodeStr = m === Viewmode.Markdown
            ? "html"
            : "markdown"
        $("body").removeClass("viewmode-html");
        $("body").removeClass("viewmode-markdown");
        $("body").addClass(`viewmode-${viewmodeStr}`);
    }
}