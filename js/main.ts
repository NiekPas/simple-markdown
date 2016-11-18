/// <reference path="components/references.ts"/>

$(document).ready(() => {
    $("#editor").focus();
    var e = new Editor(document.getElementById("editor"));
    e.setViewmode(Viewmode.Markdown);
    e.setTheme(ThemeOption.Dark);
    
    $("#options-visibility").on("click", () => {
        $("#editor-buttons").toggleClass("collapsed");
        $("#options-visibility i").toggleClass("fa-arrow-right").toggleClass("fa-arrow-left");
    });
});