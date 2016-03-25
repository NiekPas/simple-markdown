/// <reference path="components/references.ts"/>

$(document).ready(() => {
    var e = new Editor($("#editor")[0]);
    e.setViewmode(Viewmode.HTML);
    e.setTheme(ThemeOption.Light);
});