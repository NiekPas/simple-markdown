/// <reference path="components/references.ts"/>

$(document).ready(() => {
    $("#editor").focus();
    var e = new Editor(document.getElementById("editor"));
    e.setViewmode(Viewmode.Markdown);
    e.setTheme(ThemeOption.Dark);
    
    $("#editor-buttons-arrow-wrapper").on("click", () => {
        $("#editor-buttons-wrapper").toggleClass("collapsed");
    });
});