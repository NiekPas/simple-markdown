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
/// <reference path="references.ts"/>
var Editor = (function () {
    /**
     * Represents the editor
     * @constructor
     * @param {HTMLElement} editorElement - the HTML element which serves as the main text field
    */
    function Editor(el) {
        this.editorElement = el;
        this.markdownContent = "# SimpleMarkdown\n\n(Tip: press ctrl+space to view this introduction in formatted version).\n\nSimpleMarkdown is a minimalist markdown editor, designed to allow you to work without distractions. Turn on the dark mode, switch to fullscreen mode, preview your work, and when you're done, download an .md or .html file, or copy your work to the clipboard.\n\nFor a complete Markdown guide, go [here](https://daringfireball.net/projects/markdown/basics).";
        this.initialize();
    }
    Editor.prototype.initialize = function () {
        var _this = this;
        var self = this;
        $("body").on("keyup", function (e) {
            if (self.viewmode === Viewmode.Markdown) {
                self.markdownContent = $(self.editorElement)[0].innerText;
            }
            if (e.ctrlKey && e.keyCode == 32) {
                var nextViewmode = self.viewmode == Viewmode.Markdown
                    ? Viewmode.HTML
                    : Viewmode.Markdown;
                self.setViewmode(nextViewmode);
            }
        });
        $("#theme").on("click", function () {
            var nextTheme = self.theme == ThemeOption.Dark
                ? ThemeOption.Light
                : ThemeOption.Dark;
            self.setTheme(nextTheme);
        });
        $("#viewmode").on("click", function () {
            var nextViewmode = self.viewmode == Viewmode.Markdown
                ? Viewmode.HTML
                : Viewmode.Markdown;
            self.setViewmode(nextViewmode);
        });
        $("#html").on("click", function () {
            if (_this.copyToClipboard()) {
                var tooltip = "<div class=\"tooltip\">Copied to clipboard!</div>";
                $("#html").append(tooltip);
                $(".tooltip").delay(2000).fadeOut(1000);
            }
            else {
                var html = markdown.toHTML(self.markdownContent);
                var w = window.open();
                $(w.document.body).text(html);
            }
        });
        $("#fullscreen").on('click', function () {
            var body = document.getElementsByTagName('body')[0];
            if (body.requestFullscreen) {
                body.requestFullscreen();
            }
            else if (body.mozRequestFullScreen) {
                body.mozRequestFullScreen();
            }
            else if (body.webkitRequestFullscreen) {
                body.webkitRequestFullscreen();
            }
            else if (body.msRequestFullscreen) {
                body.msRequestFullscreen();
            }
        });
        $("#options-visibility").on("click", function () {
            $("#editor-buttons").toggleClass("collapsed");
        });
    };
    Editor.prototype.copyToClipboard = function () {
        // This is messy, but:
        // 
        var ele = $("#editor");
        var text = ele.html();
        text = text.replace(/\<br\>/g, '\n');
        $("body").append("<textarea style=\"outline:0 !important;\" id=\"hidden-html\">" + "</textarea>");
        $("#hidden-html").val(text);
        $("#hidden-html").select();
        try {
            var successful = document.execCommand('copy');
            $("#hidden-html").remove();
            if (successful)
                return true;
            return false;
        }
        catch (err) {
            $("#hidden-html").remove();
            return false;
        }
    };
    /**
     * Applies theme to editor.
     * @param {ThemeOption} theme - the theme to apply
     */
    Editor.prototype.setTheme = function (t) {
        this.theme = t;
        var themeStr;
        var buttonClass;
        if (t === ThemeOption.Dark) {
            themeStr = "dark";
            buttonClass = "fa fa-sun-o";
        }
        else {
            themeStr = "light";
            buttonClass = "fa fa-moon-o";
        }
        $("body").removeClass("theme-light theme-dark");
        $("body").addClass("theme-" + themeStr);
        $("li#theme").children("i").removeClass().addClass(buttonClass);
    };
    /**
     * Applies viewmode to editor.
     * @param {Viewmode} mode - the viewmode to apply
     */
    Editor.prototype.setViewmode = function (m) {
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
/// <reference path="typings/markdownjs.d.ts" />
/// <reference path="enums.ts"/>
/// <reference path="editor.ts"/>
/// <reference path="FileManager.ts"/> 
/// <reference path="components/references.ts"/>
$(document).ready(function () {
    $("#editor").focus();
    var e = new Editor(document.getElementById("editor"));
    e.setViewmode(Viewmode.Markdown);
    e.setTheme(ThemeOption.Dark);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvZW51bXMudHMiLCJjb21wb25lbnRzL2VkaXRvci50cyIsImNvbXBvbmVudHMvRmlsZU1hbmFnZXIudHMiLCJjb21wb25lbnRzL3JlZmVyZW5jZXMudHMiLCJtYWluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUssV0FHSjtBQUhELFdBQUssV0FBVztJQUNaLDZDQUFJLENBQUE7SUFDSiwrQ0FBSyxDQUFBO0FBQ1QsQ0FBQyxFQUhJLFdBQVcsS0FBWCxXQUFXLFFBR2Y7QUFFRCxJQUFLLFFBR0o7QUFIRCxXQUFLLFFBQVE7SUFDVCwrQ0FBUSxDQUFBO0lBQ1IsdUNBQUksQ0FBQTtBQUNSLENBQUMsRUFISSxRQUFRLEtBQVIsUUFBUSxRQUdaO0FDUkQscUNBQXFDO0FBRXJDO0lBTUk7Ozs7TUFJRTtJQUNGLGdCQUFZLEVBQWU7UUFDdkIsSUFBSSxDQUFDLGFBQWEsR0FBRyxFQUFFLENBQUM7UUFDeEIsSUFBSSxDQUFDLGVBQWUsR0FBRyxvY0FNZ0UsQ0FBQztRQUN4RixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDdEIsQ0FBQztJQUVPLDJCQUFVLEdBQWxCO1FBQUEsaUJBdURDO1FBdERHLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztRQUNoQixDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxVQUFBLENBQUM7WUFDbkIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsS0FBSyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztnQkFDdEMsSUFBSSxDQUFDLGVBQWUsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztZQUM5RCxDQUFDO1lBQ0QsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLENBQUMsT0FBTyxJQUFJLEVB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