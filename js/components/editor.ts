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

    private initialize(): void {        // TODO this should maybe be in Main.ts
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
        $("#theme").on("click", () => {
            var nextTheme =
                self.theme == ThemeOption.Dark
                ? ThemeOption.Light
                : ThemeOption.Dark;
            self.setTheme(nextTheme);
        });
        $("#viewmode").on("click", () => {
            var nextViewmode =
                self.viewmode == Viewmode.Markdown
                ? Viewmode.HTML
                : Viewmode.Markdown
            self.setViewmode(nextViewmode);
        });
        $("#html").on("click", () => {
            var copyEvent = new ClipboardEvent('copy', { dataType: 'text/plain', data: 'Data to be copied' } );
            document.dispatchEvent(copyEvent);
            
            var html = markdown.toHTML(self.markdownContent);
            var w = window.open();
            $(w.document.body).text(html);
        });
    }

    /**
     * Applies theme to editor.
     * @param {ThemeOption} theme - the theme to apply
     */
    public setTheme(t: ThemeOption) {
        this.theme = t;
        var themeStr: string;
        var buttonClass: string;

        if (t === ThemeOption.Dark) {
            themeStr = "dark";
            buttonClass = "fa fa-sun-o";
        }
        else {
            themeStr = "light";
            buttonClass = "fa fa-moon-o";
        }

        $("body").removeClass("theme-light theme-dark");
        $("body").addClass(`theme-${themeStr}`);

        $("li#theme").children("i").removeClass().addClass(buttonClass);
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

            $("li#viewmode").children("i").removeClass().addClass("fa fa-edit");
        }
        else {
            $(this.editorElement)[0].innerText = this.markdownContent;
            $(this.editorElement).prop("contenteditable", true);
            $(this.editorElement).focus();

            $("li#viewmode").children("i").removeClass().addClass("fa fa-font");
        }
    }
}