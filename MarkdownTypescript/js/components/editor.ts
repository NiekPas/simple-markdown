/// <reference path="references.ts"/>

class Editor {
    private document: MarkdownDocument;
    private viewmode: Viewmode = Viewmode.Markdown;
    public set Viewmode(v : Viewmode) {
        this.viewmode = v;
        this.applyViewmode(this.viewmode);
    }
    private theme: ThemeOption = ThemeOption.Dark;
    public set Theme(t: ThemeOption) {
        this.theme = t;
        this.applyTheme(this.theme);
    }
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
        $(this.editorElement).on("keyup", e => {
            if (e.ctrlKey && e.keyCode == 32) {	    // CTRL+spacebar 
                var nextTheme = 
                    this.theme == ThemeOption.Dark 
                    ? ThemeOption.Light 
                    : ThemeOption.Dark;
                this.applyTheme(this.theme);
            }
            this.document.MarkdownContent = $(this.editorElement).text();
        });
    }
    
    /**
     * Applies theme to editor.
     * @param {ThemeOption} theme - the theme to apply
     */
    private applyTheme(theme: ThemeOption) {
        this.theme = theme;
        var themeStr = theme === ThemeOption.Dark
            ? "dark"
            : "light";
        $("body").addClass(`theme-${themeStr}`);
    }
    
    /** 
     * Applies viewmode to editor.
     * @param {Viewmode} mode - the viewmode to apply
     */
    private applyViewmode(mode: Viewmode): void {
        var viewmodeStr = mode === Viewmode.Markdown
            ? "html"
            : "markdown"
        $("body").addClass(`viewmode-${viewmodeStr}`);
    }
}