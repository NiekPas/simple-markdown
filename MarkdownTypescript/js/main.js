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
    Object.defineProperty(Editor.prototype, "Viewmode", {
        set: function (v) {
            this.viewmode = v;
            this.applyViewmode(this.viewmode);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Editor.prototype, "Theme", {
        set: function (t) {
            this.theme = t;
            this.applyTheme(this.theme);
        },
        enumerable: true,
        configurable: true
    });
    Editor.prototype.initialize = function () {
        var _this = this;
        $(this.editorElement).on("keyup", function (e) {
            if (e.ctrlKey && e.keyCode == 32) {
                var nextTheme = _this.theme == ThemeOption.Dark
                    ? ThemeOption.Light
                    : ThemeOption.Dark;
                _this.applyTheme(_this.theme);
            }
            _this.document.MarkdownContent = $(_this.editorElement).text();
        });
    };
    /**
     * Applies theme to editor.
     * @param {ThemeOption} theme - the theme to apply
     */
    Editor.prototype.applyTheme = function (theme) {
        this.theme = theme;
        var themeStr = theme === ThemeOption.Dark
            ? "dark"
            : "light";
        $("body").addClass("theme-" + themeStr);
    };
    /**
     * Applies viewmode to editor.
     * @param {Viewmode} mode - the viewmode to apply
     */
    Editor.prototype.applyViewmode = function (mode) {
        var viewmodeStr = mode === Viewmode.Markdown
            ? "html"
            : "markdown";
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
    e.Viewmode = Viewmode.HTML;
    e.Theme = ThemeOption.Light;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvZW51bXMudHMiLCJjb21wb25lbnRzL01hcmtkb3duRG9jdW1lbnQudHMiLCJjb21wb25lbnRzL0VkaXRvci50cyIsImNvbXBvbmVudHMvRmlsZU1hbmFnZXIudHMiLCJjb21wb25lbnRzL3JlZmVyZW5jZXMudHMiLCJtYWluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUssV0FHSjtBQUhELFdBQUssV0FBVztJQUNaLDZDQUFJLENBQUE7SUFDSiwrQ0FBSyxDQUFBO0FBQ1QsQ0FBQyxFQUhJLFdBQVcsS0FBWCxXQUFXLFFBR2Y7QUFFRCxJQUFLLFFBR0o7QUFIRCxXQUFLLFFBQVE7SUFDVCwrQ0FBUSxDQUFBO0lBQ1IsdUNBQUksQ0FBQTtBQUNSLENBQUMsRUFISSxRQUFRLEtBQVIsUUFBUSxRQUdaO0FDUkQ7SUFjSTtRQUNJLEVBQUUsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDNUIsTUFBTSxJQUFJLEtBQUssQ0FBQyxpRkFBaUYsQ0FBQyxDQUFDO1FBQ3ZHLENBQUM7UUFDRCxnQkFBZ0IsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO0lBQ3JDLENBQUM7SUFoQkQsc0JBQVcsNkNBQWU7YUFHMUI7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQztRQUNoQyxDQUFDO2FBTEQsVUFBMkIsQ0FBVTtZQUNqQyxJQUFJLENBQUMsZUFBZSxHQUFHLENBQUMsQ0FBQztRQUM3QixDQUFDOzs7T0FBQTtJQUtELHNCQUFXLHlDQUFXO2FBQXRCO1lBQ0ksTUFBTSxJQUFJLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBQ3ZDLENBQUM7OztPQUFBO0lBU2EsNEJBQVcsR0FBekI7UUFDSSxNQUFNLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDO0lBQ3JDLENBQUM7SUF0QmMseUJBQVEsR0FBcUIsSUFBSSxnQkFBZ0Is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