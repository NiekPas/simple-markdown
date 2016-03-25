/// <reference path="components/references.ts"/>

$(document).ready(() => {
    var e = new Editor($("#editor")[0])
    e.Viewmode = Viewmode.HTML;
    e.Theme = ThemeOption.Light;
});