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
                // const tooltip = "<div class=\"tooltip-wrapper\"><div class=\"tooltip-arrow\"></div><div class=\"tooltip\">Copied to clipboard!</div></div>"
                // $("#html").append(tooltip);
                // $(".tooltip-wrapper").delay(2000).fadeOut(1000);
                var button_1 = $("#html i.fa-code");
                // Change the fa-code to a fa-check
                button_1.removeClass("fa-code").addClass("fa-check");
                // wait 1000 milliseconds, then:
                setTimeout(function () {
                    // fadeout in 250 milliseconds, without affecting layout (thus 'animate', not fadeOut()).
                    button_1.animate({
                        opacity: 0
                    }, 150, "swing", function () {
                        // When fadeout is done, change the fa-check back to a fa-code and fade back in
                        button_1.removeClass("fa-check").addClass("fa-code");
                        button_1.animate({
                            opacity: 1
                        }, 150);
                    });
                }, 1000);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvZW51bXMudHMiLCJjb21wb25lbnRzL2VkaXRvci50cyIsImNvbXBvbmVudHMvRmlsZU1hbmFnZXIudHMiLCJjb21wb25lbnRzL3JlZmVyZW5jZXMudHMiLCJtYWluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUssV0FHSjtBQUhELFdBQUssV0FBVztJQUNaLDZDQUFJLENBQUE7SUFDSiwrQ0FBSyxDQUFBO0FBQ1QsQ0FBQyxFQUhJLFdBQVcsS0FBWCxXQUFXLFFBR2Y7QUFFRCxJQUFLLFFBR0o7QUFIRCxXQUFLLFFBQVE7SUFDVCwrQ0FBUSxDQUFBO0lBQ1IsdUNBQUksQ0FBQTtBQUNSLENBQUMsRUFISSxRQUFRLEtBQVIsUUFBUSxRQUdaO0FDUkQscUNBQXFDO0FBRXJDO0lBT0k7Ozs7TUFJRTtJQUNGLGdCQUFZLEVBQWU7UUFSbkIsZUFBVSxHQUFZLEtBQUssQ0FBQztRQVNoQyxJQUFJLENBQUMsYUFBYSxHQUFHLEVBQUUsQ0FBQztRQUN4QixJQUFJLENBQUMsZUFBZSxHQUFHLG9jQU1nRSxDQUFDO1FBQ3hGLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUN0QixDQUFDO0lBRU8sMkJBQVUsR0FBbEI7UUFBQSxpQkEyRkM7UUExRkcsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2hCLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLFVBQUEsQ0FBQztZQUNuQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxLQUFLLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO2dCQUN0QyxJQUFJLENBQUMsZUFBZSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO1lBQzlELENBQUM7WUFDRCxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxJ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