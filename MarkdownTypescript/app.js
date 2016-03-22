var OptionsManager = (function () {
    function OptionsManager() {
        this.theme = ThemeOption.Dark;
    }
    OptionsManager.prototype.setTheme = function (theme) {
        this.theme = theme;
        this.applyTheme();
    };
    OptionsManager.prototype.applyTheme = function () {
        // $().removeClass, addClass() etc.
    };
    return OptionsManager;
}());
var DocumentManager = (function () {
    function DocumentManager() {
    }
    Object.defineProperty(DocumentManager.prototype, "markdownContent", {
        get: function () {
            return this._markdownContent;
        },
        enumerable: true,
        configurable: true
    });
    DocumentManager.markdownToHtml = function (markdown) {
        throw new Error("Not implemented");
    };
    return DocumentManager;
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
var ThemeOption;
(function (ThemeOption) {
    ThemeOption[ThemeOption["Dark"] = 0] = "Dark";
    ThemeOption[ThemeOption["Light"] = 1] = "Light";
})(ThemeOption || (ThemeOption = {}));
//# sourceMappingURL=app.js.map