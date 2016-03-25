var ThemeOption;
(function (ThemeOption) {
    ThemeOption[ThemeOption["Dark"] = 0] = "Dark";
    ThemeOption[ThemeOption["Light"] = 1] = "Light";
})(ThemeOption || (ThemeOption = {}));
var Viewmode;
(function (Viewmode) {
    Viewmode[Viewmode["Markdown"] = 0] = "Markdown";
    Viewmode[Viewmode["HTML"] = 1] = "HTML";
})(Viewmode || (Viewmode = {}));
var MarkdownDocument = (function () {
    function MarkdownDocument() {
        if (MarkdownDocument.instance) {
            throw new Error("Error: Instantiation failed: Use MarkdownDocument.getInstance() instead of new.");
        }
        MarkdownDocument.instance = this;
    }
    Object.defineProperty(MarkdownDocument.prototype, "MarkdownContent", {
        get: function () {
            return this.markdownContent;
        },
        set: function (v) {
            this.markdownContent = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MarkdownDocument.prototype, "HTMLcontent", {
        get: function () {
            throw new Error("Not implemented");
        },
        enumerable: true,
        configurable: true
    });
    MarkdownDocument.getInstance = function () {
        return MarkdownDocument.instance;
    };
    MarkdownDocument.instance = new MarkdownDocument();
    return MarkdownDocument;
}());
/// <reference path="references.ts"/>
var Editor = (function () {
    /**
     * Represents the editor
     * @constructor
     * @param {HTMLElement} editorElement - the HTML element which serves as the main text field
    */
    function Editor(el) {
        this.viewmode = Viewmode.Markdown;
        this.theme = ThemeOption.Dark;
        this.document = MarkdownDocument.getInstance();
        this.editorElement = el;
        this.initialize(); // TODO check if this actually runs
    }
    Editor.prototype.initialize = function () {
        var self = this;
        $("body").on("keyup", function (e) {
            if (e.ctrlKey && e.keyCode == 32) {
                var nextViewmode = self.viewmode == Viewmode.Markdown
                    ? Viewmode.HTML
                    : Viewmode.Markdown;
                self.setViewmode(nextViewmode);
            }
            self.document.MarkdownContent = $(self.editorElement).text();
        });
        $("#viewmode").on("click", function () {
            var nextTheme = self.theme == ThemeOption.Dark
                ? ThemeOption.Light
                : ThemeOption.Dark;
            self.setTheme(nextTheme);
        });
    };
    /**
     * Applies theme to editor.
     * @param {ThemeOption} theme - the theme to apply
     */
    Editor.prototype.setTheme = function (t) {
        this.theme = t;
        var themeStr = t === ThemeOption.Dark
            ? "dark"
            : "light";
        $("body").removeClass("theme-light theme-dark");
        $("body").addClass("theme-" + themeStr);
    };
    /**
     * Applies viewmode to editor.
     * @param {Viewmode} mode - the viewmode to apply
     */
    Editor.prototype.setViewmode = function (m) {
        this.viewmode = m;
        var viewmodeStr = m === Viewmode.Markdown
            ? "html"
            : "markdown";
        $("body").removeClass("viewmode-html");
        $("body").removeClass("viewmode-markdown");
        $("body").addClass("viewmode-" + viewmodeStr);
    };
    return Editor;
}());
var FileManager = (function () {
    function FileManager() {
    }
    FileManager.prototype.saveFile = function () {
    };
    FileManager.prototype.exportHtmlFile = function () {
    };
    FileManager.prototype.exportMarkdownFile = function () {
    };
    return FileManager;
}());
/// <reference path="typings/jquery.d.ts"/>
/// <reference path="enums.ts"/>
/// <reference path="MarkdownDocument.ts"/>
/// <reference path="Editor.ts"/>
/// <reference path="FileManager.ts"/> 
/// <reference path="components/references.ts"/>
$(document).ready(function () {
    var e = new Editor($("#editor")[0]);
    e.setViewmode(Viewmode.HTML);
    e.setTheme(ThemeOption.Light);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvZW51bXMudHMiLCJjb21wb25lbnRzL01hcmtkb3duRG9jdW1lbnQudHMiLCJjb21wb25lbnRzL0VkaXRvci50cyIsImNvbXBvbmVudHMvRmlsZU1hbmFnZXIudHMiLCJjb21wb25lbnRzL3JlZmVyZW5jZXMudHMiLCJtYWluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUssV0FHSjtBQUhELFdBQUssV0FBVztJQUNaLDZDQUFJLENBQUE7SUFDSiwrQ0FBSyxDQUFBO0FBQ1QsQ0FBQyxFQUhJLFdBQVcsS0FBWCxXQUFXLFFBR2Y7QUFFRCxJQUFLLFFBR0o7QUFIRCxXQUFLLFFBQVE7SUFDVCwrQ0FBUSxDQUFBO0lBQ1IsdUNBQUksQ0FBQTtBQUNSLENBQUMsRUFISSxRQUFRLEtBQVIsUUFBUSxRQUdaO0FDUkQ7SUFjSTtRQUNJLEVBQUUsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDNUIsTUFBTSxJQUFJLEtBQUssQ0FBQyxpRkFBaUYsQ0FBQyxDQUFDO1FBQ3ZHLENBQUM7UUFDRCxnQkFBZ0IsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO0lBQ3JDLENBQUM7SUFoQkQsc0JBQVcsNkNBQWU7YUFHMUI7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQztRQUNoQyxDQUFDO2FBTEQsVUFBMkIsQ0FBVTtZQUNqQyxJQUFJLENBQUMsZUFBZSxHQUFHLENBQUMsQ0FBQztRQUM3QixDQUFDOzs7T0FBQTtJQUtELHNCQUFXLHlDQUFXO2FBQXRCO1lBQ0ksTUFBTSxJQUFJLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBQ3ZDLENBQUM7OztPQUFBO0lBU2EsNEJBQVcsR0FBekI7UUFDSSxNQUFNLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDO0lBQ3JDLENBQUM7SUF0QmMseUJBQVEsR0FBcUIsSUFBSSxnQkFBZ0Is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