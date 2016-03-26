/// <reference path="references.ts"/>

class Editor {
    private markdownContent: string;
    private viewmode: Viewmode;
    private theme: ThemeOption;
    editorElement: HTMLElement;
    
    /** 
     * Represents the editor
     * @constructor
     * @param {HTMLElement} editorElement - the HTML element which serves as the main text field
    */
    constructor(el: HTMLElement) {
        this.editorElement = el;
        this.markdownContent = "# Markdown document example\n\nThis is a paragraph";
        this.initialize();
    }
    
    private initialize(): void {
        var self = this;
        $("body").on("keyup", e => {
            if (self.viewmode === Viewmode.Markdown) {
                self.markdownContent = $(self.editorElement)[0].innerText;
            }
            if (e.ctrlKey && e.keyCode == 32) {	    // CTRL+spacebar
                var nextViewmode = 
                    self.viewmode == Viewmode.Markdown
                    ? Viewmode.HTML
                    : Viewmode.Markdown
                self.setViewmode(nextViewmode);
            }
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
        if (m === Viewmode.HTML) {
            var htmlContent = markdown.toHTML(this.markdownContent);
            $(this.editorElement).html(htmlContent);
            $(this.editorElement).prop("contenteditable", false);
        }
        else {
            $(this.editorElement)[0].innerText = this.markdownContent;
            $(this.editorElement).prop("contenteditable", true);
            $(this.editorElement).focus();
        }
    }
}