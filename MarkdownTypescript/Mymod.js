var Mymod;
(function (Mymod) {
    var Greeter = (function () {
        function Greeter() {
        }
        Greeter.prototype.start = function () {
            alert(" dasjkld");
        };
        Greeter.prototype.stop = function () {
            alert("stop");
        };
        return Greeter;
    }());
    Mymod.Greeter = Greeter;
})(Mymod || (Mymod = {}));
//# sourceMappingURL=Mymod.js.map