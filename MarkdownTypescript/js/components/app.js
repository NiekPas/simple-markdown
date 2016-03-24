/// <reference path="references.ts"/>
/// <summary>Represents the application</summary>
var Application = (function () {
    function Application() {
        this.viewmode = Viewmode.Markdown;
        this.theme = ThemeOption.Dark;
        if (Application.instance) {
            throw new Error("Error: Instantiation failed: Use MarkdownDocument.getInstance() instead of new.");
        }
        Application.instance = this;
        this.document = MarkdownDocument.getInstance();
    }
    Application.getInstance = function () {
        return Application.instance;
    };
    Application.prototype.setTheme = function (theme) {
        this.theme = theme;
        var themeStr = theme === ThemeOption.Dark
            ? "dark"
            : "light";
        $("body").addClass("theme-" + themeStr);
    };
    Application.instance = new Application();
    return Application;
}());
//# sourceMappingURL=app.js.map