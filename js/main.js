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
        this.fullscreen = false;
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
                var tooltip = "<div class=\"tooltip-wrapper\"><div class=\"tooltip-arrow\"></div><div class=\"tooltip\">Copied to clipboard!</div></div>";
                $("#html").append(tooltip);
                $(".tooltip-wrapper").delay(2000).fadeOut(1000);
            }
            else {
                var html = markdown.toHTML(self.markdownContent);
                var w = window.open();
                $(w.document.body).text(html);
            }
        });
        $("#fullscreen").on('click', function () {
            var body = document.getElementsByTagName('body')[0];
            if (!_this.fullscreen) {
                if (body.requestFullscreen) {
                    body.requestFullscreen();
                    _this.fullscreen = true;
                }
                else if (body.mozRequestFullScreen) {
                    body.mozRequestFullScreen();
                    _this.fullscreen = true;
                }
                else if (body.webkitRequestFullscreen) {
                    body.webkitRequestFullscreen();
                    _this.fullscreen = true;
                }
                else if (body.msRequestFullscreen) {
                    body.msRequestFullscreen();
                    _this.fullscreen = true;
                }
            }
            else {
                if (body.exitFullscreen) {
                    body.exitFullscreen();
                    _this.fullscreen = false;
                }
                else if (body.mozCancelFullScreen) {
                    body.mozCancelFullScreen();
                    _this.fullscreen = false;
                }
                else if (body.webkitExitFullscreen) {
                    body.webkitExitFullscreen();
                    _this.fullscreen = false;
                }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvZW51bXMudHMiLCJjb21wb25lbnRzL2VkaXRvci50cyIsImNvbXBvbmVudHMvRmlsZU1hbmFnZXIudHMiLCJjb21wb25lbnRzL3JlZmVyZW5jZXMudHMiLCJtYWluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUssV0FHSjtBQUhELFdBQUssV0FBVztJQUNaLDZDQUFJLENBQUE7SUFDSiwrQ0FBSyxDQUFBO0FBQ1QsQ0FBQyxFQUhJLFdBQVcsS0FBWCxXQUFXLFFBR2Y7QUFFRCxJQUFLLFFBR0o7QUFIRCxXQUFLLFFBQVE7SUFDVCwrQ0FBUSxDQUFBO0lBQ1IsdUNBQUksQ0FBQTtBQUNSLENBQUMsRUFISSxRQUFRLEtBQVIsUUFBUSxRQUdaO0FDUkQscUNBQXFDO0FBRXJDO0lBT0k7Ozs7TUFJRTtJQUNGLGdCQUFZLEVBQWU7UUFSbkIsZUFBVSxHQUFZLEtBQUssQ0FBQztRQVNoQyxJQUFJLENBQUMsYUFBYSxHQUFHLEVBQUUsQ0FBQztRQUN4QixJQUFJLENBQUMsZUFBZSxHQUFHLG9jQU1nRSxDQUFDO1FBQ3hGLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUN0QixDQUFDO0lBRU8sMkJBQVUsR0FBbEI7UUFBQSxpQkEwRUM7UUF6RUcsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2hCLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLFVBQUEsQ0FBQztZQUNuQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxLQUFLLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO2dCQUN0QyxJQUFJLENBQUMsZUFBZSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO1lBQzlELENBQUM7WUFDRCxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxJ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