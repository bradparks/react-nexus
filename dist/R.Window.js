"use strict";

var _toArray = function (arr) {
  return Array.isArray(arr) ? arr : Array.from(arr);
};

var _slice = Array.prototype.slice;
var _extends = function (child, parent) {
  child.prototype = Object.create(parent.prototype, {
    constructor: {
      value: child,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  child.__proto__ = parent;
};

require("6to5/polyfill");var Promise = (global || window).Promise = require("lodash-next").Promise;var __DEV__ = (process.env.NODE_ENV !== "production");var __PROD__ = !__DEV__;var __BROWSER__ = (typeof window === "object");var __NODE__ = !__BROWSER__;module.exports = function (R) {
  var _ = R._;

  var defaultParams = {
    width: 1280,
    height: 720,
    scrollTop: 0,
    scrollLeft: 0 };

  function Plugin(_ref) {
    var storeName = _ref.storeName;
    var dispatcherName = _ref.dispatcherName;
    var params = _ref.params;
    params = params || {};
    _.dev(function () {
      return storeName.should.be.a.String && dispatcherName.should.be.a.String && params.should.be.an.Object;
    });
    _.defaults(params, defaultParams);

    var Window = (function (R) {
      var Window = function Window(_ref2) {
        var _this = this;
        var flux = _ref2.flux;
        var window = _ref2.window;
        var req = _ref2.req;
        var headers = _ref2.headers;
        // jshint unused:false
        R.App.Plugin.call.apply(R.App.Plugin, [this].concat(_slice.call(arguments))); // Actually used in super(...arguments)
        this.store = flux.getStore(storeName);

        if (window) {
          (function () {
            var dispatcher = flux.getDispatcher(dispatcherName);
            dispatcher.addActionHandler("/Window/scrollTo", function (_ref3) {
              var top = _ref3.top;
              var left = _ref3.left;
              return Promise["try"](function () {
                _.dev(function () {
                  return top.should.be.a.Number && left.should.be.a.Number;
                });
                window.scrollTo(top, left);
              });
            });

            window.addEventListener("scroll", function () {
              return _this.updateScroll({ window: window });
            });
            window.addEventListener("resize", function () {
              return _this.updateSize({ window: window });
            });
          })();
        }

        this.updateScroll({ window: window });
        this.updateSize({ window: window });
      };

      _extends(Window, R.App.Plugin);

      Window.prototype.destroy = function () {};

      Window.prototype.getDisplayName = function () {
        return "Window";
      };

      Window.prototype.updateScroll = function (_ref4) {
        var window = _ref4.window;
        var _ref5 = window || params;
        var scrollTop = _ref5.scrollTop;
        var scrollLeft = _ref5.scrollLeft;
        this.store.set("/Window/scroll", { scrollTop: scrollTop, scrollLeft: scrollLeft });
      };

      Window.prototype.updateSize = function (_ref6) {
        var window = _ref6.window;
        var height = params.height;
        var width = params.width;
        if (window) {
          var innerHeight = window.innerHeight;
          var innerWidth = window.innerWidth;
          var _ref7 = [innerHeight, innerWidth];
          var _ref8 = _toArray(_ref7);

          height = _ref8[0];
          width = _ref8[1];
        }
        this.store.set("/Window/size", { height: height, width: width });
      };

      return Window;
    })(R);

    _.extend(Window.prototype, {
      store: null });

    return Window;
  }

  return Plugin;
};