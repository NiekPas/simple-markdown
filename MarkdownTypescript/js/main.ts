/// <reference path="components/references.ts"/>

$(document).ready(() => {
    $("#editor").focus();
    
    var e = new Editor($("#editor")[0]);
    e.setViewmode(Viewmode.Markdown);
    e.setTheme(ThemeOption.Dark);
});