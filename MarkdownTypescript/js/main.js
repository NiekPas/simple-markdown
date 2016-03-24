var MarkdownDocument = (function () {
    function MarkdownDocument() {
        if (MarkdownDocument.instance) {
            throw new Error("Error: Instantiation failed: Use MarkdownDocument.getInstance() instead of new.");
        }
        MarkdownDocument.instance = this;
    }
    Object.defineProperty(MarkdownDocument.prototype, "MarkdownContent", {
        get: function () {
            return this.content;
        },
        enumerable: true,
        configurable: true
    });
    MarkdownDocument.getInstance = function () {
        return MarkdownDocument.instance;
    };
    MarkdownDocument.markdownToHtml = function (markdown) {
        throw new Error("Not implemented");
    };
    MarkdownDocument.instance = new MarkdownDocument();
    return MarkdownDocument;
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
/// <reference path="typings/jquery.d.ts"/>
/// <reference path="MarkdownDocument.ts"/>
/// <reference path="FileManager.ts"/>
/// <reference path="app.ts"/>
/// <reference path="enums.ts"/> 
/// <reference path="components/references.ts"/>
$(document).ready(function () {
    var app = Application.getInstance();
    app.setTheme(ThemeOption.Dark);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvTWFya2Rvd25Eb2N1bWVudC50cyIsImNvbXBvbmVudHMvRmlsZU1hbmFnZXIudHMiLCJjb21wb25lbnRzL2FwcC50cyIsImNvbXBvbmVudHMvZW51bXMudHMiLCJjb21wb25lbnRzL3JlZmVyZW5jZXMudHMiLCJtYWluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0lBT0k7UUFDSSxFQUFFLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQzVCLE1BQU0sSUFBSSxLQUFLLENBQUMsaUZBQWlGLENBQUMsQ0FBQztRQUN2RyxDQUFDO1FBQ0QsZ0JBQWdCLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztJQUNyQyxDQUFDO0lBVEQsc0JBQUksNkNBQWU7YUFBbkI7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUN4QixDQUFDOzs7T0FBQTtJQVNhLDRCQUFXLEdBQXpCO1FBQ0ksTUFBTSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQztJQUNyQyxDQUFDO0lBRWMsK0JBQWMsR0FBN0IsVUFBOEIsUUFBZ0I7UUFDMUMsTUFBTSxJQUFJLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFuQmMseUJBQVEsR0FBcUIsSUFBSSxnQkFBZ0IsRUFBRSxDQUFDO0lBb0J2RSx1QkFBQztBQUFELENBQUMsQUFyQkQsSUFxQkM7QUNyQkQ7SUFBQTtJQVlBLENBQUM7SUFYVSw4QkFBUSxHQUFmO0lBRUEsQ0FBQztJQUVPLG9DQUFjLEdBQXRCO0lBRUEsQ0FBQztJQUVPLHdDQUFrQixHQUExQjtJQUVBLENBQUM7SUFDTCxrQkFBQztBQUFELENBQUMsQUFaRCxJQVlDO0FDWkQscUNBQXFDO0FBRXJDLGlEQUFpRDtBQUNqRDtJQU1JO1FBSEEsYUFBUSxHQUFhLFFBQVEsQ0FBQyxRQUFRLENBQUM7UUFDdkMsVUFBSyxHQUFnQixXQUFXLENBQUMsSUFBSSxDQUFDO1FBR2xDLEVBQUUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ3ZCLE1BQU0sSUFBSSxLQUFLLENBQUMsaUZBQWlGLENBQUMsQ0FBQztRQUN2RyxDQUFDO1FBQ0QsV0FBVyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7UUFDNUIsSUFBSSxDQUFDLFFBQVEsR0FBRyxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNuRCxDQUFDO0lBRU0sdUJBQVcsR0FBbEI7UUFDSSxNQUFNLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQztJQUNoQyxDQUFDO0lBRU0sOEJBQVEsR0FBZixVQUFnQixLQUFrQjtRQUM5QixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNuQixJQUFJLFFBQVEsR0FBRyxLQUFLLEtBQUssV0FBVyxDQUFDLElBQUk7Y0FDbkMsTUFBTTtjQUNOLE9BQU8sQ0FBQztRQUNkLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxRQUFRLENBQUMsV0FBUyxRQUFVLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBdkJjLG9CQUFRLEdBQWdCLElBQUksV0FBVyxFQUFFLENBQUM7SUF3QjdELGtCQUFDO0FBQUQsQ0FBQyxBQXpCRCxJQXlCQztBQzVCRCxJQUFLLFdBR0o7QUFIRCxXQUFLLFdBQVc7SUFDWiw2Q0FBSSxDQUFBO0lBQ0osK0NBQUssQ0FBQTtBQUNULENBQUMsRUFISSxXQUFXLEtBQVgsV0FBVyxRQUdmO0FBRUQsSUFBSyxRQUdKO0FBSEQsV0FBSyxRQUFRO0lBQ1QsK0NBQVEsQ0FBQTtJQUNSLHVDQUFJLENBQUE7QUFDUixDQUFDLEVBSEksUUFBUSxLQUFSLFFBQVEsUUFHWjtBQ1JELDJDQUEyQztBQUUzQywyQ0FBMkM7QUFDM0Msc0NBQXNDO0FBQ3RDLDhCQUE4QjtBQUM5QixnQ0FBZ0M7QUNMaEMsZ0RBQWdEO0FBRWhELENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxLQUFLLENBQUM7SUFDZCxJQUFJLEdBQUcsR0FBRyxXQUFXLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDcEMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDbkMsQ0FBQyxDQUFDLENBQUMifQ==