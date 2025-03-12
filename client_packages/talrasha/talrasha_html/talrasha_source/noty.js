(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("Noty", [], factory);
	else if(typeof exports === 'object')
		exports["Noty"] = factory();
	else
		root["Noty"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.css = exports.deepExtend = exports.animationEndEvents = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.inArray = inArray;
exports.stopPropagation = stopPropagation;
exports.generateID = generateID;
exports.outerHeight = outerHeight;
exports.addListener = addListener;
exports.hasClass = hasClass;
exports.addClass = addClass;
exports.removeClass = removeClass;
exports.remove = remove;
exports.classList = classList;
exports.visibilityChangeFlow = visibilityChangeFlow;
exports.createAudioElements = createAudioElements;

var _api = __webpack_require__(1);

var API = _interopRequireWildcard(_api);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var animationEndEvents = exports.animationEndEvents = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';

function inArray(needle, haystack, argStrict) {
  var key = void 0;
  var strict = !!argStrict;

  if (strict) {
    for (key in haystack) {
      if (haystack.hasOwnProperty(key) && haystack[key] === needle) {
        return true;
      }
    }
  } else {
    for (key in haystack) {
      if (haystack.hasOwnProperty(key) && haystack[key] === needle) {
        return true;
      }
    }
  }
  return false;
}

function stopPropagation(evt) {
  evt = evt || window.event;

  if (typeof evt.stopPropagation !== 'undefined') {
    evt.stopPropagation();
  } else {
    evt.cancelBubble = true;
  }
}

var deepExtend = exports.deepExtend = function deepExtend(out) {
  out = out || {};

  for (var i = 1; i < arguments.length; i++) {
    var obj = arguments[i];

    if (!obj) continue;

    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (Array.isArray(obj[key])) {
          out[key] = obj[key];
        } else if (_typeof(obj[key]) === 'object' && obj[key] !== null) {
          out[key] = deepExtend(out[key], obj[key]);
        } else {
          out[key] = obj[key];
        }
      }
    }
  }

  return out;
};

function generateID() {
  var prefix = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

  var id = 'noty_' + prefix + '_';

  id += 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0;
    var v = c === 'x' ? r : r & 0x3 | 0x8;
    return v.toString(16);
  });

  return id;
}

function outerHeight(el) {
  var height = el.offsetHeight;
  var style = window.getComputedStyle(el);

  height += parseInt(style.marginTop) + parseInt(style.marginBottom);
  return height;
}

var css = exports.css = function () {
  var cssPrefixes = ['Webkit', 'O', 'Moz', 'ms'];
  var cssProps = {};

  function camelCase(string) {
    return string.replace(/^-ms-/, 'ms-').replace(/-([\da-z])/gi, function (match, letter) {
      return letter.toUpperCase();
    });
  }

  function getVendorProp(name) {
    var style = document.body.style;
    if (name in style) return name;

    var i = cssPrefixes.length;
    var capName = name.charAt(0).toUpperCase() + name.slice(1);
    var vendorName = void 0;

    while (i--) {
      vendorName = cssPrefixes[i] + capName;
      if (vendorName in style) return vendorName;
    }

    return name;
  }

  function getStyleProp(name) {
    name = camelCase(name);
    return cssProps[name] || (cssProps[name] = getVendorProp(name));
  }

  function applyCss(element, prop, value) {
    prop = getStyleProp(prop);
    element.style[prop] = value;
  }

  return function (element, properties) {
    var args = arguments;
    var prop = void 0;
    var value = void 0;

    if (args.length === 2) {
      for (prop in properties) {
        if (properties.hasOwnProperty(prop)) {
          value = properties[prop];
          if (value !== undefined && properties.hasOwnProperty(prop)) {
            applyCss(element, prop, value);
          }
        }
      }
    } else {
      applyCss(element, args[1], args[2]);
    }
  };
}();

function addListener(el, events, cb) {
  var useCapture = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

  events = events.split(' ');
  for (var i = 0; i < events.length; i++) {
    if (document.addEventListener) {
      el.addEventListener(events[i], cb, useCapture);
    } else if (document.attachEvent) {
      el.attachEvent('on' + events[i], cb);
    }
  }
}

function hasClass(element, name) {
  var list = typeof element === 'string' ? element : classList(element);
  return list.indexOf(' ' + name + ' ') >= 0;
}

function addClass(element, name) {
  var oldList = classList(element);
  var newList = oldList + name;

  if (hasClass(oldList, name)) return;

  // Trim the opening space.
  element.className = newList.substring(1);
}

function removeClass(element, name) {
  var oldList = classList(element);
  var newList = void 0;

  if (!hasClass(element, name)) return;

  // Replace the class name.
  newList = oldList.replace(' ' + name + ' ', ' ');

  // Trim the opening and closing spaces.
  element.className = newList.substring(1, newList.length - 1);
}

function remove(element) {
  if (element.parentNode) {
    element.parentNode.removeChild(element);
  }
}

function classList(element) {
  return (' ' + (element && element.className || '') + ' ').replace(/\s+/gi, ' ');
}

function visibilityChangeFlow() {
  var hidden = void 0;
  var visibilityChange = void 0;
  if (typeof document.hidden !== 'undefined') {
    // Opera 12.10 and Firefox 18 and later support
    hidden = 'hidden';
    visibilityChange = 'visibilitychange';
  } else if (typeof document.msHidden !== 'undefined') {
    hidden = 'msHidden';
    visibilityChange = 'msvisibilitychange';
  } else if (typeof document.webkitHidden !== 'undefined') {
    hidden = 'webkitHidden';
    visibilityChange = 'webkitvisibilitychange';
  }

  function onVisibilityChange() {
    API.PageHidden = document[hidden];
    handleVisibilityChange();
  }

  function onBlur() {
    API.PageHidden = true;
    handleVisibilityChange();
  }

  function onFocus() {
    API.PageHidden = false;
    handleVisibilityChange();
  }

  function handleVisibilityChange() {
    if (API.PageHidden) stopAll();else resumeAll();
  }

  function stopAll() {
    setTimeout(function () {
      Object.keys(API.Store).forEach(function (id) {
        if (API.Store.hasOwnProperty(id)) {
          if (API.Store[id].options.visibilityControl) {
            API.Store[id].stop();
          }
        }
      });
    }, 100);
  }

  function resumeAll() {
    setTimeout(function () {
      Object.keys(API.Store).forEach(function (id) {
        if (API.Store.hasOwnProperty(id)) {
          if (API.Store[id].options.visibilityControl) {
            API.Store[id].resume();
          }
        }
      });
      API.queueRenderAll();
    }, 100);
  }

  addListener(document, visibilityChange, onVisibilityChange);
  addListener(window, 'blur', onBlur);
  addListener(window, 'focus', onFocus);
}

function createAudioElements(ref) {
  if (ref.hasSound) {
    var audioElement = document.createElement('audio');

    ref.options.sounds.sources.forEach(function (s) {
      var source = document.createElement('source');
      source.src = s;
      source.type = 'audio/' + getExtension(s);
      audioElement.appendChild(source);
    });

    if (ref.barDom) {
      ref.barDom.appendChild(audioElement);
    } else {
      document.querySelector('body').appendChild(audioElement);
    }

    audioElement.volume = ref.options.sounds.volume;

    if (!ref.soundPlayed) {
      audioElement.play();
      ref.soundPlayed = true;
    }

    audioElement.onended = function () {
      remove(audioElement);
    };
  }
}

function getExtension(fileName) {
  return fileName.match(/\.([^.]+)$/)[1];
}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Defaults = exports.Store = exports.Queues = exports.DefaultMaxVisible = exports.docTitle = exports.DocModalCount = exports.PageHidden = undefined;
exports.getQueueCounts = getQueueCounts;
exports.addToQueue = addToQueue;
exports.removeFromQueue = removeFromQueue;
exports.queueRender = queueRender;
exports.queueRenderAll = queueRenderAll;
exports.ghostFix = ghostFix;
exports.build = build;
exports.hasButtons = hasButtons;
exports.handleModal = handleModal;
exports.handleModalClose = handleModalClose;
exports.queueClose = queueClose;
exports.dequeueClose = dequeueClose;
exports.fire = fire;
exports.openFlow = openFlow;
exports.closeFlow = closeFlow;

var _utils = __webpack_require__(0);

var Utils = _interopRequireWildcard(_utils);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var PageHidden = exports.PageHidden = false;
var DocModalCount = exports.DocModalCount = 0;

var DocTitleProps = {
  originalTitle: null,
  count: 0,
  changed: false,
  timer: -1
};

var docTitle = exports.docTitle = {
  increment: function increment() {
    DocTitleProps.count++;

    docTitle._update();
  },

  decrement: function decrement() {
    DocTitleProps.count--;

    if (DocTitleProps.count <= 0) {
      docTitle._clear();
      return;
    }

    docTitle._update();
  },

  _update: function _update() {
    var title = document.title;

    if (!DocTitleProps.changed) {
      DocTitleProps.originalTitle = title;
      document.title = '(' + DocTitleProps.count + ') ' + title;
      DocTitleProps.changed = true;
    } else {
      document.title = '(' + DocTitleProps.count + ') ' + DocTitleProps.originalTitle;
    }
  },

  _clear: function _clear() {
    if (DocTitleProps.changed) {
      DocTitleProps.count = 0;
      document.title = DocTitleProps.originalTitle;
      DocTitleProps.changed = false;
    }
  }
};

var DefaultMaxVisible = exports.DefaultMaxVisible = 5;

var Queues = exports.Queues = {
  global: {
    maxVisible: DefaultMaxVisible,
    queue: []
  }
};

var Store = exports.Store = {};

var Defaults = exports.Defaults = {
  type: 'alert',
  layout: 'topRight',
  theme: 'mint',
  text: '',
  svg: '<svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M12.5001 0C9.18496 0 6.00556 1.31697 3.66138 3.66115C1.3172 6.00533 0.00026629 9.1847 0.00026629 12.4999C-0.0150443 14.8223 0.630159 17.1012 1.86067 19.0709C3.09119 21.0406 4.85631 22.62 6.95019 23.6248C7.09792 23.697 7.25843 23.7394 7.42256 23.7496C7.58669 23.7598 7.75122 23.7375 7.90675 23.6841C8.06229 23.6307 8.20581 23.5472 8.32907 23.4384C8.45234 23.3295 8.55294 23.1975 8.62517 23.0498C8.69739 22.902 8.73983 22.7415 8.75002 22.5774C8.76021 22.4132 8.73795 22.2487 8.68456 22.0932C8.63117 21.9377 8.54767 21.7942 8.43882 21.6709C8.32997 21.5476 8.19792 21.447 8.05018 21.3747C6.37703 20.5762 4.96626 19.3171 3.98326 17.7452C3.00027 16.1733 2.48582 14.3538 2.50024 12.4999C2.5009 10.5756 3.05676 8.69228 4.10114 7.07604C5.14551 5.45979 6.63407 4.17923 8.38816 3.38795C10.1423 2.59667 12.0874 2.32828 13.9902 2.61502C15.893 2.90176 17.6727 3.73147 19.1157 5.00452C20.5588 6.27758 21.6038 7.93991 22.1255 9.79215C22.6472 11.6444 22.6234 13.6079 22.057 15.4469C21.4905 17.286 20.4055 18.9225 18.932 20.1602C17.4586 21.3979 15.6593 22.1842 13.7501 22.4248V14.9998C13.7501 14.6683 13.6184 14.3504 13.384 14.116C13.1496 13.8816 12.8316 13.7499 12.5001 13.7499C12.1686 13.7499 11.8507 13.8816 11.6163 14.116C11.3819 14.3504 11.2501 14.6683 11.2501 14.9998V23.7497C11.2501 24.0813 11.3819 24.3992 11.6163 24.6336C11.8507 24.868 12.1686 24.9997 12.5001 24.9997C15.8153 24.9997 18.9947 23.6828 21.3389 21.3386C23.6831 18.9944 25 15.815 25 12.4999C25 9.1847 23.6831 6.00533 21.3389 3.66115C18.9947 1.31697 15.8153 0 12.5001 0ZM16.2501 8.74991C16.2501 8.00823 16.0302 7.28325 15.6181 6.66657C15.2061 6.04989 14.6204 5.56918 13.9352 5.28536C13.25 5.00153 12.496 4.92727 11.7686 5.07197C11.0411 5.21666 10.373 5.57382 9.84853 6.09826C9.32409 6.6227 8.96692 7.29091 8.82223 8.01833C8.67754 8.74575 8.7518 9.49976 9.03562 10.185C9.31945 10.8702 9.80008 11.4558 10.4168 11.8679C11.0334 12.2799 11.7585 12.4999 12.5001 12.4999C13.4947 12.4999 14.4485 12.1048 15.1517 11.4016C15.855 10.6983 16.2501 9.74446 16.2501 8.74991ZM11.2501 8.74991C11.2501 8.50268 11.3234 8.26105 11.4608 8.05549C11.5981 7.84993 11.7934 7.68967 12.0218 7.59506C12.2502 7.50045 12.5015 7.47572 12.744 7.52395C12.9865 7.57218 13.2092 7.69124 13.384 7.86605C13.5588 8.04086 13.6779 8.2636 13.7261 8.50607C13.7743 8.74855 13.7496 8.99986 13.655 9.22826C13.5604 9.45667 13.4001 9.6519 13.1946 9.78925C12.989 9.9266 12.7474 9.99989 12.5001 9.99989C12.1686 9.99989 11.8507 9.86818 11.6163 9.63376C11.3819 9.39934 11.2501 9.08142 11.2501 8.74991Z" fill="white"/></svg>',
  timeout: false,
  progressBar: true,
  closeWith: ['click'],
  animation: {
    open: 'noty_effects_open',
    close: 'noty_effects_close'
  },
  id: false,
  force: false,
  killer: false,
  queue: 'global',
  container: false,
  buttons: [],
  callbacks: {
    beforeShow: null,
    onShow: null,
    afterShow: null,
    onClose: null,
    afterClose: null,
    onHover: null,
    onTemplate: null
  },
  sounds: {
    sources: [],
    volume: 1,
    conditions: []
  },
  titleCount: {
    conditions: []
  },
  modal: false,
  visibilityControl: true
};

/**
 * @param {string} queueName
 * @return {object}
 */
function getQueueCounts() {
  var queueName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'global';

  var count = 0;
  var max = DefaultMaxVisible;

  if (Queues.hasOwnProperty(queueName)) {
    max = Queues[queueName].maxVisible;
    Object.keys(Store).forEach(function (i) {
      if (Store[i].options.queue === queueName && !Store[i].closed) count++;
    });
  }

  return {
    current: count,
    maxVisible: max
  };
}

/**
 * @param {Noty} ref
 * @return {void}
 */
function addToQueue(ref) {
  if (!Queues.hasOwnProperty(ref.options.queue)) {
    Queues[ref.options.queue] = { maxVisible: DefaultMaxVisible, queue: [] };
  }

  Queues[ref.options.queue].queue.push(ref);
}

/**
 * @param {Noty} ref
 * @return {void}
 */
function removeFromQueue(ref) {
  if (Queues.hasOwnProperty(ref.options.queue)) {
    var queue = [];
    Object.keys(Queues[ref.options.queue].queue).forEach(function (i) {
      if (Queues[ref.options.queue].queue[i].id !== ref.id) {
        queue.push(Queues[ref.options.queue].queue[i]);
      }
    });
    Queues[ref.options.queue].queue = queue;
  }
}

/**
 * @param {string} queueName
 * @return {void}
 */
function queueRender() {
  var queueName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'global';

  if (Queues.hasOwnProperty(queueName)) {
    var noty = Queues[queueName].queue.shift();

    if (noty) noty.show();
  }
}

/**
 * @return {void}
 */
function queueRenderAll() {
  Object.keys(Queues).forEach(function (queueName) {
    queueRender(queueName);
  });
}

/**
 * @param {Noty} ref
 * @return {void}
 */
function ghostFix(ref) {
  var ghostID = Utils.generateID('ghost');
  var ghost = document.createElement('div');
  ghost.setAttribute('id', ghostID);
  Utils.css(ghost, {
    height: Utils.outerHeight(ref.barDom) + 'px'
  });

  ref.barDom.insertAdjacentHTML('afterend', ghost.outerHTML);

  Utils.remove(ref.barDom);
  ghost = document.getElementById(ghostID);
  Utils.addClass(ghost, 'noty_fix_effects_height');
  Utils.addListener(ghost, Utils.animationEndEvents, function () {
    Utils.remove(ghost);
  });
}

/**
 * @param {Noty} ref
 * @return {void}
 */
function build(ref) {
  findOrCreateContainer(ref);
  var markup

if (ref.options.theme == 'gta') {

    if (ref.options.type == 'error') {
        ref.options.svg = '<svg width="26" height="25" viewBox="0 0 26 25" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M7.85419 9.63753L10.7167 12.5L7.85419 15.3625C7.7401 15.4807 7.65039 15.6202 7.59021 15.773C7.53004 15.9259 7.50057 16.0891 7.50347 16.2534C7.50637 16.4176 7.54162 16.5796 7.60715 16.7303C7.67268 16.8809 7.76724 17.0172 7.88543 17.1313C8.00362 17.2454 8.14312 17.335 8.29597 17.3952C8.44882 17.4553 8.61203 17.4848 8.77628 17.4819C8.94052 17.479 9.1026 17.4438 9.25323 17.3783C9.40386 17.3128 9.54011 17.2182 9.65419 17.1L17.1542 9.59999C17.359 9.36087 17.4659 9.05331 17.4538 8.73871C17.4416 8.42412 17.3112 8.12568 17.0886 7.90306C16.866 7.68045 16.5676 7.55 16.253 7.53785C15.9384 7.52569 15.6308 7.63275 15.3917 7.83753L12.4917 10.7375L9.62917 7.87499C9.39004 7.67021 9.08244 7.56323 8.76785 7.57538C8.45325 7.58753 8.15486 7.71791 7.93224 7.94052C7.70962 8.16314 7.57921 8.46158 7.56706 8.77617C7.55491 9.09077 7.66188 9.3984 7.86666 9.63753H7.85419ZM12.4917 7.97067e-06C12.1602 7.97067e-06 11.8422 0.131722 11.6078 0.366142C11.3734 0.600563 11.2417 0.918487 11.2417 1.25001C11.2417 1.58153 11.3734 1.89945 11.6078 2.13387C11.8422 2.36829 12.1602 2.50001 12.4917 2.50001C14.9299 2.47447 17.2935 3.3407 19.1378 4.93577C20.9822 6.53083 22.1801 8.74481 22.5064 11.1613C22.8327 13.5777 22.2649 16.0301 20.9097 18.0572C19.5545 20.0844 17.5053 21.5465 15.1476 22.1686C12.7899 22.7907 10.2861 22.5298 8.10726 21.4352C5.92837 20.3405 4.2245 18.4876 3.31615 16.2247C2.4078 13.9618 2.35755 11.445 3.17486 9.14765C3.99216 6.85031 5.62071 4.93073 7.75417 3.75001C7.89862 3.66793 8.0255 3.55824 8.12755 3.42713C8.2296 3.29602 8.30485 3.14603 8.34896 2.98585C8.39306 2.82567 8.40517 2.65839 8.38462 2.49352C8.36407 2.32865 8.31125 2.16945 8.22917 2.025C8.1471 1.88055 8.03737 1.75367 7.90626 1.65162C7.77515 1.54957 7.62523 1.47432 7.46505 1.43021C7.30487 1.38611 7.13756 1.37404 6.97269 1.39458C6.80782 1.41513 6.64862 1.46792 6.50417 1.54999C3.83649 3.01881 1.7968 5.411 0.768051 8.27729C-0.260698 11.1436 -0.207726 14.2868 0.917053 17.1168C2.04183 19.9468 4.16104 22.2688 6.87671 23.6468C9.59238 25.0249 12.7177 25.3642 15.6658 24.6011C18.614 23.8379 21.1821 22.0246 22.8879 19.5019C24.5938 16.9793 25.3201 13.9206 24.9304 10.9003C24.5407 7.88007 23.0619 5.10598 20.7715 3.09891C18.4812 1.09185 15.537 -0.0101059 12.4917 7.97067e-06ZM15.8792 14.1125C15.64 13.9077 15.3324 13.8007 15.0178 13.8129C14.7032 13.825 14.4049 13.9554 14.1822 14.178C13.9596 14.4006 13.8292 14.6991 13.8171 15.0137C13.8049 15.3283 13.9119 15.6359 14.1167 15.875L15.3667 17.125C15.6058 17.3298 15.9134 17.4368 16.228 17.4246C16.5426 17.4125 16.841 17.2821 17.0636 17.0595C17.2862 16.8369 17.4167 16.5384 17.4288 16.2238C17.441 15.9092 17.3339 15.6016 17.1292 15.3625L15.8792 14.1125Z" fill="white"/></svg>'
    } else if (ref.options.type == 'success') {
        ref.options.svg = '<svg width="24" height="17" viewBox="0 0 24 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22.8583 3.04743L22.8584 3.04742C23.1189 2.78845 23.25 2.46501 23.25 2.09307C23.25 1.71792 23.122 1.39219 22.8625 1.13434C22.6032 0.876489 22.2762 0.75 21.9001 0.75C21.5272 0.75 21.2025 0.879672 20.9419 1.13854L20.9418 1.13864L8.70009 13.3128L3.05811 7.6979L3.05802 7.69782C2.79743 7.43871 2.47266 7.30922 2.09987 7.30922C1.72381 7.30922 1.39677 7.43573 1.13733 7.69355C0.877843 7.95144 0.75 8.27722 0.75 8.65226C0.75 9.02405 0.881039 9.3476 1.14162 9.60659L1.14163 9.6066L7.74177 16.1658C8.00229 16.4247 8.32719 16.5543 8.70002 16.5543C9.07271 16.5543 9.39758 16.4247 9.65809 16.1658C9.65809 16.1658 9.6581 16.1658 9.65811 16.1658L22.8583 3.04743Z" fill="white" stroke="white" stroke-width="0.5"/></svg>'
    } else if (ref.options.type == 'info') {
        ref.options.svg = '<svg width="20" height="24" viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M20 18.8155C20.0008 18.6693 19.9728 18.5243 19.9175 18.389C19.8622 18.2536 19.7808 18.1305 19.6778 18.0267L17.7778 16.1266V11.0378C17.781 9.563 17.3649 8.11768 16.578 6.87042C15.7911 5.62315 14.6658 4.6254 13.3333 3.99336C13.3333 3.10931 12.9822 2.26144 12.357 1.63632C11.7319 1.0112 10.8841 0.660034 10 0.660034C9.11595 0.660034 8.26808 1.0112 7.64296 1.63632C7.01784 2.26144 6.66667 3.10931 6.66667 3.99336C5.33422 4.6254 4.2089 5.62315 3.42198 6.87042C2.63507 8.11768 2.21898 9.563 2.22224 11.0378V12.1489C2.22224 12.4435 2.33932 12.7262 2.54769 12.9346C2.75606 13.143 3.03866 13.26 3.33335 13.26C3.62803 13.26 3.91063 13.143 4.119 12.9346C4.32738 12.7262 4.44445 12.4435 4.44445 12.1489V11.0378C4.44253 10.0607 4.69833 9.10039 5.18603 8.25374C5.67373 7.4071 6.37606 6.70411 7.22223 6.21558C7.52629 6.67397 7.93906 7.04989 8.42374 7.31001C8.90841 7.57012 9.44993 7.70633 10 7.70633C10.5501 7.70633 11.0916 7.57012 11.5763 7.31001C12.0609 7.04989 12.4737 6.67397 12.7778 6.21558C13.6239 6.70411 14.3263 7.4071 14.814 8.25374C15.3017 9.10039 15.5575 10.0607 15.5555 11.0378V16.5933C15.5547 16.7395 15.5827 16.8845 15.638 17.0199C15.6933 17.1552 15.7748 17.2783 15.8777 17.3821L17.7666 19.2822V21.0377H2.22224V19.2711L3.78887 17.7044H12.2222C12.5169 17.7044 12.7995 17.5874 13.0079 17.379C13.2162 17.1707 13.3333 16.888 13.3333 16.5933C13.3333 16.2986 13.2162 16.0159 13.0079 15.8076C12.7995 15.5992 12.5169 15.4822 12.2222 15.4822H3.33335C3.18712 15.4813 3.04215 15.5094 2.90678 15.5647C2.7714 15.6199 2.64826 15.7015 2.54443 15.8045L0.322216 18.0267C0.219237 18.1305 0.137778 18.2536 0.0824837 18.389C0.0271898 18.5243 -0.000826857 18.6693 1.85785e-05 18.8155V22.1488C1.85785e-05 22.4435 0.117098 22.7262 0.325471 22.9346C0.533844 23.1429 0.816443 23.26 1.11113 23.26H18.8889C19.1836 23.26 19.4662 23.1429 19.6745 22.9346C19.8829 22.7262 20 22.4435 20 22.1488V18.8155ZM10 5.48221C9.78024 5.48221 9.56545 5.41699 9.38273 5.2949C9.20001 5.17281 9.05756 4.99934 8.97346 4.79631C8.88936 4.59328 8.86738 4.36989 8.91025 4.15436C8.95313 3.93882 9.05895 3.74077 9.21434 3.58538C9.36973 3.42998 9.56772 3.32416 9.78326 3.28129C9.99879 3.23841 10.2222 3.26053 10.4252 3.34463C10.6282 3.42872 10.8018 3.57111 10.9239 3.75383C11.046 3.93655 11.1111 4.15134 11.1111 4.3711C11.1111 4.66578 10.994 4.94845 10.7857 5.15682C10.5773 5.3652 10.2947 5.48221 10 5.48221Z" fill="white"/></svg>'
    }


    markup = '<div class="noty_body"><div class = "image">' + ref.options.svg + '<div class = "noty_romb" style="position: relative;width: 60.51px;height: 60.51px;border-radius: 12px;transform: rotate(45deg);" ></div><div class = "noty_back" style="position: absolute;width: 54.29px;top: 30px; right: 0;height: 54.29px;opacity: 1;filter: blur(45px);border-radius: 12px;transform: rotate(45deg);"></div></div><div class = "text">' + ref.options.text + '</div></div>' + buildButtons(ref) + (ref.options.progressBar ? '<div class="noty_progressbar_back"></div><div class="noty_progressbar"></div>' : '');

} else if (ref.options.theme == 'capts') {

    markup = '<div class="noty_body">' + ref.options.killed + '<img src="./img/capts/skull.png" width="30px" height="26px">' + ref.options.killer + '&nbsp;' + ref.options.gun + '</div>' + buildButtons(ref) + (ref.options.progressBar ? '<div class="noty_progressbar"></div>' : '');

} else {
    markup = '<div class="noty_body">' + ref.options.text + '</div>' + buildButtons(ref) + (ref.options.progressBar ? '<div class="noty_progressbar"></div>' : '');

}


  ref.barDom = document.createElement('div');
  ref.barDom.setAttribute('id', ref.id);
  Utils.addClass(ref.barDom, 'noty_bar noty_type__' + ref.options.type + ' noty_theme__' + ref.options.theme);

  ref.barDom.innerHTML = markup;

  fire(ref, 'onTemplate');
}

/**
 * @param {Noty} ref
 * @return {boolean}
 */
function hasButtons(ref) {
  return !!(ref.options.buttons && Object.keys(ref.options.buttons).length);
}

/**
 * @param {Noty} ref
 * @return {string}
 */
function buildButtons(ref) {
  if (hasButtons(ref)) {
    var buttons = document.createElement('div');
    Utils.addClass(buttons, 'noty_buttons');

    Object.keys(ref.options.buttons).forEach(function (key) {
      buttons.appendChild(ref.options.buttons[key].dom);
    });

    ref.options.buttons.forEach(function (btn) {
      buttons.appendChild(btn.dom);
    });
    return buttons.outerHTML;
  }
  return '';
}

/**
 * @param {Noty} ref
 * @return {void}
 */
function handleModal(ref) {
  if (ref.options.modal) {
    if (DocModalCount === 0) {
      createModal(ref);
    }

    exports.DocModalCount = DocModalCount += 1;
  }
}

/**
 * @param {Noty} ref
 * @return {void}
 */
function handleModalClose(ref) {
  if (ref.options.modal && DocModalCount > 0) {
    exports.DocModalCount = DocModalCount -= 1;

    if (DocModalCount <= 0) {
      var modal = document.querySelector('.noty_modal');

      if (modal) {
        Utils.removeClass(modal, 'noty_modal_open');
        Utils.addClass(modal, 'noty_modal_close');
        Utils.addListener(modal, Utils.animationEndEvents, function () {
          Utils.remove(modal);
        });
      }
    }
  }
}

/**
 * @return {void}
 */
function createModal() {
  var body = document.querySelector('body');
  var modal = document.createElement('div');
  Utils.addClass(modal, 'noty_modal');
  body.insertBefore(modal, body.firstChild);
  Utils.addClass(modal, 'noty_modal_open');

  Utils.addListener(modal, Utils.animationEndEvents, function () {
    Utils.removeClass(modal, 'noty_modal_open');
  });
}

/**
 * @param {Noty} ref
 * @return {void}
 */
function findOrCreateContainer(ref) {
  if (ref.options.container) {
    ref.layoutDom = document.querySelector(ref.options.container);
    return;
  }

  var layoutID = 'noty_layout__' + ref.options.layout;
  ref.layoutDom = document.querySelector('div#' + layoutID);

  if (!ref.layoutDom) {
    ref.layoutDom = document.createElement('div');
    ref.layoutDom.setAttribute('id', layoutID);
    Utils.addClass(ref.layoutDom, 'noty_layout');
    document.querySelector('body').appendChild(ref.layoutDom);
  }
}

/**
 * @param {Noty} ref
 * @return {void}
 */
function queueClose(ref) {
  if (ref.options.timeout) {
    if (ref.options.progressBar && ref.progressDom) {
      Utils.css(ref.progressDom, {
        transition: 'width ' + ref.options.timeout + 'ms linear',
        width: '0%'
      });
    }

    clearTimeout(ref.closeTimer);

    ref.closeTimer = setTimeout(function () {
      ref.close();
    }, ref.options.timeout);
  }
}

/**
 * @param {Noty} ref
 * @return {void}
 */
function dequeueClose(ref) {
  if (ref.options.timeout && ref.closeTimer) {
    clearTimeout(ref.closeTimer);
    ref.closeTimer = -1;

    if (ref.options.progressBar && ref.progressDom) {
      Utils.css(ref.progressDom, {
        transition: 'width 0ms linear',
        width: '79%'
      });
    }
  }
}

/**
 * @param {Noty} ref
 * @param {string} eventName
 * @return {void}
 */
function fire(ref, eventName) {
  if (ref.listeners.hasOwnProperty(eventName)) {
    ref.listeners[eventName].forEach(function (cb) {
      if (typeof cb === 'function') {
        cb.apply(ref);
      }
    });
  }
}

/**
 * @param {Noty} ref
 * @return {void}
 */
function openFlow(ref) {
  fire(ref, 'afterShow');
  queueClose(ref);

  Utils.addListener(ref.barDom, 'mouseenter', function () {
    dequeueClose(ref);
  });

  Utils.addListener(ref.barDom, 'mouseleave', function () {
    queueClose(ref);
  });
}

/**
 * @param {Noty} ref
 * @return {void}
 */
function closeFlow(ref) {
  delete Store[ref.id];
  ref.closing = false;
  fire(ref, 'afterClose');

  Utils.remove(ref.barDom);

  if (ref.layoutDom.querySelectorAll('.noty_bar').length === 0 && !ref.options.container) {
    Utils.remove(ref.layoutDom);
  }

  if (Utils.inArray('docVisible', ref.options.titleCount.conditions) || Utils.inArray('docHidden', ref.options.titleCount.conditions)) {
    docTitle.decrement();
  }

  queueRender(ref.options.queue);
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NotyButton = undefined;

var _utils = __webpack_require__(0);

var Utils = _interopRequireWildcard(_utils);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NotyButton = exports.NotyButton = function NotyButton(html, classes, cb) {
  var _this = this;

  var attributes = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

  _classCallCheck(this, NotyButton);

  this.dom = document.createElement('button');
  this.dom.innerHTML = html;
  this.id = attributes.id = attributes.id || Utils.generateID('button');
  this.cb = cb;
  Object.keys(attributes).forEach(function (propertyName) {
    _this.dom.setAttribute(propertyName, attributes[propertyName]);
  });
  Utils.addClass(this.dom, classes || 'noty_btn');

  return this;
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Push = exports.Push = function () {
  function Push() {
    var workerPath = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '/service-worker.js';

    _classCallCheck(this, Push);

    this.subData = {};
    this.workerPath = workerPath;
    this.listeners = {
      onPermissionGranted: [],
      onPermissionDenied: [],
      onSubscriptionSuccess: [],
      onSubscriptionCancel: [],
      onWorkerError: [],
      onWorkerSuccess: [],
      onWorkerNotSupported: []
    };
    return this;
  }

  /**
   * @param {string} eventName
   * @param {function} cb
   * @return {Push}
   */


  _createClass(Push, [{
    key: 'on',
    value: function on(eventName) {
      var cb = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};

      if (typeof cb === 'function' && this.listeners.hasOwnProperty(eventName)) {
        this.listeners[eventName].push(cb);
      }

      return this;
    }
  }, {
    key: 'fire',
    value: function fire(eventName) {
      var _this = this;

      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

      if (this.listeners.hasOwnProperty(eventName)) {
        this.listeners[eventName].forEach(function (cb) {
          if (typeof cb === 'function') {
            cb.apply(_this, params);
          }
        });
      }
    }
  }, {
    key: 'create',
    value: function create() {
      console.log('NOT IMPLEMENTED YET');
    }

    /**
     * @return {boolean}
     */

  }, {
    key: 'isSupported',
    value: function isSupported() {
      var result = false;

      try {
        result = window.Notification || window.webkitNotifications || navigator.mozNotification || window.external && window.external.msIsSiteMode() !== undefined;
      } catch (e) {}

      return result;
    }

    /**
     * @return {string}
     */

  }, {
    key: 'getPermissionStatus',
    value: function getPermissionStatus() {
      var perm = 'default';

      if (window.Notification && window.Notification.permissionLevel) {
        perm = window.Notification.permissionLevel;
      } else if (window.webkitNotifications && window.webkitNotifications.checkPermission) {
        switch (window.webkitNotifications.checkPermission()) {
          case 1:
            perm = 'default';
            break;
          case 0:
            perm = 'granted';
            break;
          default:
            perm = 'denied';
        }
      } else if (window.Notification && window.Notification.permission) {
        perm = window.Notification.permission;
      } else if (navigator.mozNotification) {
        perm = 'granted';
      } else if (window.external && window.external.msIsSiteMode() !== undefined) {
        perm = window.external.msIsSiteMode() ? 'granted' : 'default';
      }

      return perm.toString().toLowerCase();
    }

    /**
     * @return {string}
     */

  }, {
    key: 'getEndpoint',
    value: function getEndpoint(subscription) {
      var endpoint = subscription.endpoint;
      var subscriptionId = subscription.subscriptionId;

      // fix for Chrome < 45
      if (subscriptionId && endpoint.indexOf(subscriptionId) === -1) {
        endpoint += '/' + subscriptionId;
      }

      return endpoint;
    }

    /**
     * @return {boolean}
     */

  }, {
    key: 'isSWRegistered',
    value: function isSWRegistered() {
      try {
        return navigator.serviceWorker.controller.state === 'activated';
      } catch (e) {
        return false;
      }
    }

    /**
     * @return {void}
     */

  }, {
    key: 'unregisterWorker',
    value: function unregisterWorker() {
      var self = this;
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.getRegistrations().then(function (registrations) {
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = registrations[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var registration = _step.value;

              registration.unregister();
              self.fire('onSubscriptionCancel');
            }
          } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
              }
            } finally {
              if (_didIteratorError) {
                throw _iteratorError;
              }
            }
          }
        });
      }
    }

    /**
     * @return {void}
     */

  }, {
    key: 'requestSubscription',
    value: function requestSubscription() {
      var _this2 = this;

      var userVisibleOnly = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

      var self = this;
      var current = this.getPermissionStatus();
      var cb = function cb(result) {
        if (result === 'granted') {
          _this2.fire('onPermissionGranted');

          if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register(_this2.workerPath).then(function () {
              navigator.serviceWorker.ready.then(function (serviceWorkerRegistration) {
                self.fire('onWorkerSuccess');
                serviceWorkerRegistration.pushManager.subscribe({
                  userVisibleOnly: userVisibleOnly
                }).then(function (subscription) {
                  var key = subscription.getKey('p256dh');
                  var token = subscription.getKey('auth');

                  self.subData = {
                    endpoint: self.getEndpoint(subscription),
                    p256dh: key ? window.btoa(String.fromCharCode.apply(null, new Uint8Array(key))) : null,
                    auth: token ? window.btoa(String.fromCharCode.apply(null, new Uint8Array(token))) : null
                  };

                  self.fire('onSubscriptionSuccess', [self.subData]);
                }).catch(function (err) {
                  self.fire('onWorkerError', [err]);
                });
              });
            });
          } else {
            self.fire('onWorkerNotSupported');
          }
        } else if (result === 'denied') {
          _this2.fire('onPermissionDenied');
          _this2.unregisterWorker();
        }
      };

      if (current === 'default') {
        if (window.Notification && window.Notification.requestPermission) {
          window.Notification.requestPermission(cb);
        } else if (window.webkitNotifications && window.webkitNotifications.checkPermission) {
          window.webkitNotifications.requestPermission(cb);
        }
      } else {
        cb(current);
      }
    }
  }]);

  return Push;
}();

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process, global) {var require;/*!
 * @overview es6-promise - a tiny implementation of Promises/A+.
 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
 * @license   Licensed under MIT license
 *            See https://raw.githubusercontent.com/stefanpenner/es6-promise/master/LICENSE
 * @version   4.1.0
 */

(function (global, factory) {
     true ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global.ES6Promise = factory());
}(this, (function () { 'use strict';

function objectOrFunction(x) {
  return typeof x === 'function' || typeof x === 'object' && x !== null;
}

function isFunction(x) {
  return typeof x === 'function';
}

var _isArray = undefined;
if (!Array.isArray) {
  _isArray = function (x) {
    return Object.prototype.toString.call(x) === '[object Array]';
  };
} else {
  _isArray = Array.isArray;
}

var isArray = _isArray;

var len = 0;
var vertxNext = undefined;
var customSchedulerFn = undefined;

var asap = function asap(callback, arg) {
  queue[len] = callback;
  queue[len + 1] = arg;
  len += 2;
  if (len === 2) {
    // If len is 2, that means that we need to schedule an async flush.
    // If additional callbacks are queued before the queue is flushed, they
    // will be processed by this flush that we are scheduling.
    if (customSchedulerFn) {
      customSchedulerFn(flush);
    } else {
      scheduleFlush();
    }
  }
};

function setScheduler(scheduleFn) {
  customSchedulerFn = scheduleFn;
}

function setAsap(asapFn) {
  asap = asapFn;
}

var browserWindow = typeof window !== 'undefined' ? window : undefined;
var browserGlobal = browserWindow || {};
var BrowserMutationObserver = browserGlobal.MutationObserver || browserGlobal.WebKitMutationObserver;
var isNode = typeof self === 'undefined' && typeof process !== 'undefined' && ({}).toString.call(process) === '[object process]';

// test for web worker but not in IE10
var isWorker = typeof Uint8ClampedArray !== 'undefined' && typeof importScripts !== 'undefined' && typeof MessageChannel !== 'undefined';

// node
function useNextTick() {
  // node version 0.10.x displays a deprecation warning when nextTick is used recursively
  // see https://github.com/cujojs/when/issues/410 for details
  return function () {
    return process.nextTick(flush);
  };
}

// vertx
function useVertxTimer() {
  if (typeof vertxNext !== 'undefined') {
    return function () {
      vertxNext(flush);
    };
  }

  return useSetTimeout();
}

function useMutationObserver() {
  var iterations = 0;
  var observer = new BrowserMutationObserver(flush);
  var node = document.createTextNode('');
  observer.observe(node, { characterData: true });

  return function () {
    node.data = iterations = ++iterations % 2;
  };
}

// web worker
function useMessageChannel() {
  var channel = new MessageChannel();
  channel.port1.onmessage = flush;
  return function () {
    return channel.port2.postMessage(0);
  };
}

function useSetTimeout() {
  // Store setTimeout reference so es6-promise will be unaffected by
  // other code modifying setTimeout (like sinon.useFakeTimers())
  var globalSetTimeout = setTimeout;
  return function () {
    return globalSetTimeout(flush, 1);
  };
}

var queue = new Array(1000);
function flush() {
  for (var i = 0; i < len; i += 2) {
    var callback = queue[i];
    var arg = queue[i + 1];

    callback(arg);

    queue[i] = undefined;
    queue[i + 1] = undefined;
  }

  len = 0;
}

function attemptVertx() {
  try {
    var r = require;
    var vertx = __webpack_require__(9);
    vertxNext = vertx.runOnLoop || vertx.runOnContext;
    return useVertxTimer();
  } catch (e) {
    return useSetTimeout();
  }
}

var scheduleFlush = undefined;
// Decide what async method to use to triggering processing of queued callbacks:
if (isNode) {
  scheduleFlush = useNextTick();
} else if (BrowserMutationObserver) {
  scheduleFlush = useMutationObserver();
} else if (isWorker) {
  scheduleFlush = useMessageChannel();
} else if (browserWindow === undefined && "function" === 'function') {
  scheduleFlush = attemptVertx();
} else {
  scheduleFlush = useSetTimeout();
}

function then(onFulfillment, onRejection) {
  var _arguments = arguments;

  var parent = this;

  var child = new this.constructor(noop);

  if (child[PROMISE_ID] === undefined) {
    makePromise(child);
  }

  var _state = parent._state;

  if (_state) {
    (function () {
      var callback = _arguments[_state - 1];
      asap(function () {
        return invokeCallback(_state, child, callback, parent._result);
      });
    })();
  } else {
    subscribe(parent, child, onFulfillment, onRejection);
  }

  return child;
}

/**
  `Promise.resolve` returns a promise that will become resolved with the
  passed `value`. It is shorthand for the following:

  ```javascript
  let promise = new Promise(function(resolve, reject){
    resolve(1);
  });

  promise.then(function(value){
    // value === 1
  });
  ```

  Instead of writing the above, your code now simply becomes the following:

  ```javascript
  let promise = Promise.resolve(1);

  promise.then(function(value){
    // value === 1
  });
  ```

  @method resolve
  @static
  @param {Any} value value that the returned promise will be resolved with
  Useful for tooling.
  @return {Promise} a promise that will become fulfilled with the given
  `value`
*/
function resolve(object) {
  /*jshint validthis:true */
  var Constructor = this;

  if (object && typeof object === 'object' && object.constructor === Constructor) {
    return object;
  }

  var promise = new Constructor(noop);
  _resolve(promise, object);
  return promise;
}

var PROMISE_ID = Math.random().toString(36).substring(16);

function noop() {}

var PENDING = void 0;
var FULFILLED = 1;
var REJECTED = 2;

var GET_THEN_ERROR = new ErrorObject();

function selfFulfillment() {
  return new TypeError("You cannot resolve a promise with itself");
}

function cannotReturnOwn() {
  return new TypeError('A promises callback cannot return that same promise.');
}

function getThen(promise) {
  try {
    return promise.then;
  } catch (error) {
    GET_THEN_ERROR.error = error;
    return GET_THEN_ERROR;
  }
}

function tryThen(then, value, fulfillmentHandler, rejectionHandler) {
  try {
    then.call(value, fulfillmentHandler, rejectionHandler);
  } catch (e) {
    return e;
  }
}

function handleForeignThenable(promise, thenable, then) {
  asap(function (promise) {
    var sealed = false;
    var error = tryThen(then, thenable, function (value) {
      if (sealed) {
        return;
      }
      sealed = true;
      if (thenable !== value) {
        _resolve(promise, value);
      } else {
        fulfill(promise, value);
      }
    }, function (reason) {
      if (sealed) {
        return;
      }
      sealed = true;

      _reject(promise, reason);
    }, 'Settle: ' + (promise._label || ' unknown promise'));

    if (!sealed && error) {
      sealed = true;
      _reject(promise, error);
    }
  }, promise);
}

function handleOwnThenable(promise, thenable) {
  if (thenable._state === FULFILLED) {
    fulfill(promise, thenable._result);
  } else if (thenable._state === REJECTED) {
    _reject(promise, thenable._result);
  } else {
    subscribe(thenable, undefined, function (value) {
      return _resolve(promise, value);
    }, function (reason) {
      return _reject(promise, reason);
    });
  }
}

function handleMaybeThenable(promise, maybeThenable, then$$) {
  if (maybeThenable.constructor === promise.constructor && then$$ === then && maybeThenable.constructor.resolve === resolve) {
    handleOwnThenable(promise, maybeThenable);
  } else {
    if (then$$ === GET_THEN_ERROR) {
      _reject(promise, GET_THEN_ERROR.error);
      GET_THEN_ERROR.error = null;
    } else if (then$$ === undefined) {
      fulfill(promise, maybeThenable);
    } else if (isFunction(then$$)) {
      handleForeignThenable(promise, maybeThenable, then$$);
    } else {
      fulfill(promise, maybeThenable);
    }
  }
}

function _resolve(promise, value) {
  if (promise === value) {
    _reject(promise, selfFulfillment());
  } else if (objectOrFunction(value)) {
    handleMaybeThenable(promise, value, getThen(value));
  } else {
    fulfill(promise, value);
  }
}

function publishRejection(promise) {
  if (promise._onerror) {
    promise._onerror(promise._result);
  }

  publish(promise);
}

function fulfill(promise, value) {
  if (promise._state !== PENDING) {
    return;
  }

  promise._result = value;
  promise._state = FULFILLED;

  if (promise._subscribers.length !== 0) {
    asap(publish, promise);
  }
}

function _reject(promise, reason) {
  if (promise._state !== PENDING) {
    return;
  }
  promise._state = REJECTED;
  promise._result = reason;

  asap(publishRejection, promise);
}

function subscribe(parent, child, onFulfillment, onRejection) {
  var _subscribers = parent._subscribers;
  var length = _subscribers.length;

  parent._onerror = null;

  _subscribers[length] = child;
  _subscribers[length + FULFILLED] = onFulfillment;
  _subscribers[length + REJECTED] = onRejection;

  if (length === 0 && parent._state) {
    asap(publish, parent);
  }
}

function publish(promise) {
  var subscribers = promise._subscribers;
  var settled = promise._state;

  if (subscribers.length === 0) {
    return;
  }

  var child = undefined,
      callback = undefined,
      detail = promise._result;

  for (var i = 0; i < subscribers.length; i += 3) {
    child = subscribers[i];
    callback = subscribers[i + settled];

    if (child) {
      invokeCallback(settled, child, callback, detail);
    } else {
      callback(detail);
    }
  }

  promise._subscribers.length = 0;
}

function ErrorObject() {
  this.error = null;
}

var TRY_CATCH_ERROR = new ErrorObject();

function tryCatch(callback, detail) {
  try {
    return callback(detail);
  } catch (e) {
    TRY_CATCH_ERROR.error = e;
    return TRY_CATCH_ERROR;
  }
}

function invokeCallback(settled, promise, callback, detail) {
  var hasCallback = isFunction(callback),
      value = undefined,
      error = undefined,
      succeeded = undefined,
      failed = undefined;

  if (hasCallback) {
    value = tryCatch(callback, detail);

    if (value === TRY_CATCH_ERROR) {
      failed = true;
      error = value.error;
      value.error = null;
    } else {
      succeeded = true;
    }

    if (promise === value) {
      _reject(promise, cannotReturnOwn());
      return;
    }
  } else {
    value = detail;
    succeeded = true;
  }

  if (promise._state !== PENDING) {
    // noop
  } else if (hasCallback && succeeded) {
      _resolve(promise, value);
    } else if (failed) {
      _reject(promise, error);
    } else if (settled === FULFILLED) {
      fulfill(promise, value);
    } else if (settled === REJECTED) {
      _reject(promise, value);
    }
}

function initializePromise(promise, resolver) {
  try {
    resolver(function resolvePromise(value) {
      _resolve(promise, value);
    }, function rejectPromise(reason) {
      _reject(promise, reason);
    });
  } catch (e) {
    _reject(promise, e);
  }
}

var id = 0;
function nextId() {
  return id++;
}

function makePromise(promise) {
  promise[PROMISE_ID] = id++;
  promise._state = undefined;
  promise._result = undefined;
  promise._subscribers = [];
}

function Enumerator(Constructor, input) {
  this._instanceConstructor = Constructor;
  this.promise = new Constructor(noop);

  if (!this.promise[PROMISE_ID]) {
    makePromise(this.promise);
  }

  if (isArray(input)) {
    this._input = input;
    this.length = input.length;
    this._remaining = input.length;

    this._result = new Array(this.length);

    if (this.length === 0) {
      fulfill(this.promise, this._result);
    } else {
      this.length = this.length || 0;
      this._enumerate();
      if (this._remaining === 0) {
        fulfill(this.promise, this._result);
      }
    }
  } else {
    _reject(this.promise, validationError());
  }
}

function validationError() {
  return new Error('Array Methods must be provided an Array');
};

Enumerator.prototype._enumerate = function () {
  var length = this.length;
  var _input = this._input;

  for (var i = 0; this._state === PENDING && i < length; i++) {
    this._eachEntry(_input[i], i);
  }
};

Enumerator.prototype._eachEntry = function (entry, i) {
  var c = this._instanceConstructor;
  var resolve$$ = c.resolve;

  if (resolve$$ === resolve) {
    var _then = getThen(entry);

    if (_then === then && entry._state !== PENDING) {
      this._settledAt(entry._state, i, entry._result);
    } else if (typeof _then !== 'function') {
      this._remaining--;
      this._result[i] = entry;
    } else if (c === Promise) {
      var promise = new c(noop);
      handleMaybeThenable(promise, entry, _then);
      this._willSettleAt(promise, i);
    } else {
      this._willSettleAt(new c(function (resolve$$) {
        return resolve$$(entry);
      }), i);
    }
  } else {
    this._willSettleAt(resolve$$(entry), i);
  }
};

Enumerator.prototype._settledAt = function (state, i, value) {
  var promise = this.promise;

  if (promise._state === PENDING) {
    this._remaining--;

    if (state === REJECTED) {
      _reject(promise, value);
    } else {
      this._result[i] = value;
    }
  }

  if (this._remaining === 0) {
    fulfill(promise, this._result);
  }
};

Enumerator.prototype._willSettleAt = function (promise, i) {
  var enumerator = this;

  subscribe(promise, undefined, function (value) {
    return enumerator._settledAt(FULFILLED, i, value);
  }, function (reason) {
    return enumerator._settledAt(REJECTED, i, reason);
  });
};

/**
  `Promise.all` accepts an array of promises, and returns a new promise which
  is fulfilled with an array of fulfillment values for the passed promises, or
  rejected with the reason of the first passed promise to be rejected. It casts all
  elements of the passed iterable to promises as it runs this algorithm.

  Example:

  ```javascript
  let promise1 = resolve(1);
  let promise2 = resolve(2);
  let promise3 = resolve(3);
  let promises = [ promise1, promise2, promise3 ];

  Promise.all(promises).then(function(array){
    // The array here would be [ 1, 2, 3 ];
  });
  ```

  If any of the `promises` given to `all` are rejected, the first promise
  that is rejected will be given as an argument to the returned promises's
  rejection handler. For example:

  Example:

  ```javascript
  let promise1 = resolve(1);
  let promise2 = reject(new Error("2"));
  let promise3 = reject(new Error("3"));
  let promises = [ promise1, promise2, promise3 ];

  Promise.all(promises).then(function(array){
    // Code here never runs because there are rejected promises!
  }, function(error) {
    // error.message === "2"
  });
  ```

  @method all
  @static
  @param {Array} entries array of promises
  @param {String} label optional string for labeling the promise.
  Useful for tooling.
  @return {Promise} promise that is fulfilled when all `promises` have been
  fulfilled, or rejected if any of them become rejected.
  @static
*/
function all(entries) {
  return new Enumerator(this, entries).promise;
}

/**
  `Promise.race` returns a new promise which is settled in the same way as the
  first passed promise to settle.

  Example:

  ```javascript
  let promise1 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 1');
    }, 200);
  });

  let promise2 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 2');
    }, 100);
  });

  Promise.race([promise1, promise2]).then(function(result){
    // result === 'promise 2' because it was resolved before promise1
    // was resolved.
  });
  ```

  `Promise.race` is deterministic in that only the state of the first
  settled promise matters. For example, even if other promises given to the
  `promises` array argument are resolved, but the first settled promise has
  become rejected before the other promises became fulfilled, the returned
  promise will become rejected:

  ```javascript
  let promise1 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 1');
    }, 200);
  });

  let promise2 = new Promise(function(resolve, reject){
    setTimeout(function(){
      reject(new Error('promise 2'));
    }, 100);
  });

  Promise.race([promise1, promise2]).then(function(result){
    // Code here never runs
  }, function(reason){
    // reason.message === 'promise 2' because promise 2 became rejected before
    // promise 1 became fulfilled
  });
  ```

  An example real-world use case is implementing timeouts:

  ```javascript
  Promise.race([ajax('foo.json'), timeout(5000)])
  ```

  @method race
  @static
  @param {Array} promises array of promises to observe
  Useful for tooling.
  @return {Promise} a promise which settles in the same way as the first passed
  promise to settle.
*/
function race(entries) {
  /*jshint validthis:true */
  var Constructor = this;

  if (!isArray(entries)) {
    return new Constructor(function (_, reject) {
      return reject(new TypeError('You must pass an array to race.'));
    });
  } else {
    return new Constructor(function (resolve, reject) {
      var length = entries.length;
      for (var i = 0; i < length; i++) {
        Constructor.resolve(entries[i]).then(resolve, reject);
      }
    });
  }
}

/**
  `Promise.reject` returns a promise rejected with the passed `reason`.
  It is shorthand for the following:

  ```javascript
  let promise = new Promise(function(resolve, reject){
    reject(new Error('WHOOPS'));
  });

  promise.then(function(value){
    // Code here doesn't run because the promise is rejected!
  }, function(reason){
    // reason.message === 'WHOOPS'
  });
  ```

  Instead of writing the above, your code now simply becomes the following:

  ```javascript
  let promise = Promise.reject(new Error('WHOOPS'));

  promise.then(function(value){
    // Code here doesn't run because the promise is rejected!
  }, function(reason){
    // reason.message === 'WHOOPS'
  });
  ```

  @method reject
  @static
  @param {Any} reason value that the returned promise will be rejected with.
  Useful for tooling.
  @return {Promise} a promise rejected with the given `reason`.
*/
function reject(reason) {
  /*jshint validthis:true */
  var Constructor = this;
  var promise = new Constructor(noop);
  _reject(promise, reason);
  return promise;
}

function needsResolver() {
  throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
}

function needsNew() {
  throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
}

/**
  Promise objects represent the eventual result of an asynchronous operation. The
  primary way of interacting with a promise is through its `then` method, which
  registers callbacks to receive either a promise's eventual value or the reason
  why the promise cannot be fulfilled.

  Terminology
  -----------

  - `promise` is an object or function with a `then` method whose behavior conforms to this specification.
  - `thenable` is an object or function that defines a `then` method.
  - `value` is any legal JavaScript value (including undefined, a thenable, or a promise).
  - `exception` is a value that is thrown using the throw statement.
  - `reason` is a value that indicates why a promise was rejected.
  - `settled` the final resting state of a promise, fulfilled or rejected.

  A promise can be in one of three states: pending, fulfilled, or rejected.

  Promises that are fulfilled have a fulfillment value and are in the fulfilled
  state.  Promises that are rejected have a rejection reason and are in the
  rejected state.  A fulfillment value is never a thenable.

  Promises can also be said to *resolve* a value.  If this value is also a
  promise, then the original promise's settled state will match the value's
  settled state.  So a promise that *resolves* a promise that rejects will
  itself reject, and a promise that *resolves* a promise that fulfills will
  itself fulfill.


  Basic Usage:
  ------------

  ```js
  let promise = new Promise(function(resolve, reject) {
    // on success
    resolve(value);

    // on failure
    reject(reason);
  });

  promise.then(function(value) {
    // on fulfillment
  }, function(reason) {
    // on rejection
  });
  ```

  Advanced Usage:
  ---------------

  Promises shine when abstracting away asynchronous interactions such as
  `XMLHttpRequest`s.

  ```js
  function getJSON(url) {
    return new Promise(function(resolve, reject){
      let xhr = new XMLHttpRequest();

      xhr.open('GET', url);
      xhr.onreadystatechange = handler;
      xhr.responseType = 'json';
      xhr.setRequestHeader('Accept', 'application/json');
      xhr.send();

      function handler() {
        if (this.readyState === this.DONE) {
          if (this.status === 200) {
            resolve(this.response);
          } else {
            reject(new Error('getJSON: `' + url + '` failed with status: [' + this.status + ']'));
          }
        }
      };
    });
  }

  getJSON('/posts.json').then(function(json) {
    // on fulfillment
  }, function(reason) {
    // on rejection
  });
  ```

  Unlike callbacks, promises are great composable primitives.

  ```js
  Promise.all([
    getJSON('/posts'),
    getJSON('/comments')
  ]).then(function(values){
    values[0] // => postsJSON
    values[1] // => commentsJSON

    return values;
  });
  ```

  @class Promise
  @param {function} resolver
  Useful for tooling.
  @constructor
*/
function Promise(resolver) {
  this[PROMISE_ID] = nextId();
  this._result = this._state = undefined;
  this._subscribers = [];

  if (noop !== resolver) {
    typeof resolver !== 'function' && needsResolver();
    this instanceof Promise ? initializePromise(this, resolver) : needsNew();
  }
}

Promise.all = all;
Promise.race = race;
Promise.resolve = resolve;
Promise.reject = reject;
Promise._setScheduler = setScheduler;
Promise._setAsap = setAsap;
Promise._asap = asap;

Promise.prototype = {
  constructor: Promise,

  /**
    The primary way of interacting with a promise is through its `then` method,
    which registers callbacks to receive either a promise's eventual value or the
    reason why the promise cannot be fulfilled.
  
    ```js
    findUser().then(function(user){
      // user is available
    }, function(reason){
      // user is unavailable, and you are given the reason why
    });
    ```
  
    Chaining
    --------
  
    The return value of `then` is itself a promise.  This second, 'downstream'
    promise is resolved with the return value of the first promise's fulfillment
    or rejection handler, or rejected if the handler throws an exception.
  
    ```js
    findUser().then(function (user) {
      return user.name;
    }, function (reason) {
      return 'default name';
    }).then(function (userName) {
      // If `findUser` fulfilled, `userName` will be the user's name, otherwise it
      // will be `'default name'`
    });
  
    findUser().then(function (user) {
      throw new Error('Found user, but still unhappy');
    }, function (reason) {
      throw new Error('`findUser` rejected and we're unhappy');
    }).then(function (value) {
      // never reached
    }, function (reason) {
      // if `findUser` fulfilled, `reason` will be 'Found user, but still unhappy'.
      // If `findUser` rejected, `reason` will be '`findUser` rejected and we're unhappy'.
    });
    ```
    If the downstream promise does not specify a rejection handler, rejection reasons will be propagated further downstream.
  
    ```js
    findUser().then(function (user) {
      throw new PedagogicalException('Upstream error');
    }).then(function (value) {
      // never reached
    }).then(function (value) {
      // never reached
    }, function (reason) {
      // The `PedgagocialException` is propagated all the way down to here
    });
    ```
  
    Assimilation
    ------------
  
    Sometimes the value you want to propagate to a downstream promise can only be
    retrieved asynchronously. This can be achieved by returning a promise in the
    fulfillment or rejection handler. The downstream promise will then be pending
    until the returned promise is settled. This is called *assimilation*.
  
    ```js
    findUser().then(function (user) {
      return findCommentsByAuthor(user);
    }).then(function (comments) {
      // The user's comments are now available
    });
    ```
  
    If the assimliated promise rejects, then the downstream promise will also reject.
  
    ```js
    findUser().then(function (user) {
      return findCommentsByAuthor(user);
    }).then(function (comments) {
      // If `findCommentsByAuthor` fulfills, we'll have the value here
    }, function (reason) {
      // If `findCommentsByAuthor` rejects, we'll have the reason here
    });
    ```
  
    Simple Example
    --------------
  
    Synchronous Example
  
    ```javascript
    let result;
  
    try {
      result = findResult();
      // success
    } catch(reason) {
      // failure
    }
    ```
  
    Errback Example
  
    ```js
    findResult(function(result, err){
      if (err) {
        // failure
      } else {
        // success
      }
    });
    ```
  
    Promise Example;
  
    ```javascript
    findResult().then(function(result){
      // success
    }, function(reason){
      // failure
    });
    ```
  
    Advanced Example
    --------------
  
    Synchronous Example
  
    ```javascript
    let author, books;
  
    try {
      author = findAuthor();
      books  = findBooksByAuthor(author);
      // success
    } catch(reason) {
      // failure
    }
    ```
  
    Errback Example
  
    ```js
  
    function foundBooks(books) {
  
    }
  
    function failure(reason) {
  
    }
  
    findAuthor(function(author, err){
      if (err) {
        failure(err);
        // failure
      } else {
        try {
          findBoooksByAuthor(author, function(books, err) {
            if (err) {
              failure(err);
            } else {
              try {
                foundBooks(books);
              } catch(reason) {
                failure(reason);
              }
            }
          });
        } catch(error) {
          failure(err);
        }
        // success
      }
    });
    ```
  
    Promise Example;
  
    ```javascript
    findAuthor().
      then(findBooksByAuthor).
      then(function(books){
        // found books
    }).catch(function(reason){
      // something went wrong
    });
    ```
  
    @method then
    @param {Function} onFulfilled
    @param {Function} onRejected
    Useful for tooling.
    @return {Promise}
  */
  then: then,

  /**
    `catch` is simply sugar for `then(undefined, onRejection)` which makes it the same
    as the catch block of a try/catch statement.
  
    ```js
    function findAuthor(){
      throw new Error('couldn't find that author');
    }
  
    // synchronous
    try {
      findAuthor();
    } catch(reason) {
      // something went wrong
    }
  
    // async with promises
    findAuthor().catch(function(reason){
      // something went wrong
    });
    ```
  
    @method catch
    @param {Function} onRejection
    Useful for tooling.
    @return {Promise}
  */
  'catch': function _catch(onRejection) {
    return this.then(null, onRejection);
  }
};

function polyfill() {
    var local = undefined;

    if (typeof global !== 'undefined') {
        local = global;
    } else if (typeof self !== 'undefined') {
        local = self;
    } else {
        try {
            local = Function('return this')();
        } catch (e) {
            throw new Error('polyfill failed because global object is unavailable in this environment');
        }
    }

    var P = local.Promise;

    if (P) {
        var promiseToString = null;
        try {
            promiseToString = Object.prototype.toString.call(P.resolve());
        } catch (e) {
            // silently ignored
        }

        if (promiseToString === '[object Promise]' && !P.cast) {
            return;
        }
    }

    local.Promise = Promise;
}

// Strange compat..
Promise.polyfill = polyfill;
Promise.Promise = Promise;

return Promise;

})));
//# sourceMappingURL=es6-promise.map

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7), __webpack_require__(8)))

/***/ }),
/* 5 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* global VERSION */

__webpack_require__(5);

var _es6Promise = __webpack_require__(4);

var _es6Promise2 = _interopRequireDefault(_es6Promise);

var _utils = __webpack_require__(0);

var Utils = _interopRequireWildcard(_utils);

var _api = __webpack_require__(1);

var API = _interopRequireWildcard(_api);

var _button = __webpack_require__(2);

var _push = __webpack_require__(3);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var info_amount = 0;

var Noty = function () {
  /**
   * @param {object} options
   * @return {Noty}
   */
  function Noty() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Noty);

    this.options = Utils.deepExtend({}, API.Defaults, options);
    this.id = this.options.id || Utils.generateID('bar');
    this.closeTimer = -1;
    this.barDom = null;
    this.layoutDom = null;
    this.progressDom = null;
    this.showing = false;
    this.shown = false;
    this.closed = false;
    this.closing = false;
    this.killable = this.options.timeout || this.options.closeWith.length > 0;
    this.hasSound = this.options.sounds.sources.length > 0;
    this.soundPlayed = false;
    this.listeners = {
      beforeShow: [],
      onShow: [],
      afterShow: [],
      onClose: [],
      afterClose: [],
      onHover: [],
      onTemplate: []
    };
    this.promises = {
      show: null,
      close: null
    };
    this.on('beforeShow', this.options.callbacks.beforeShow);
    this.on('onShow', this.options.callbacks.onShow);
    this.on('afterShow', this.options.callbacks.afterShow);
    this.on('onClose', this.options.callbacks.onClose);
    this.on('afterClose', this.options.callbacks.afterClose);
    this.on('onHover', this.options.callbacks.onHover);
    this.on('onTemplate', this.options.callbacks.onTemplate);

    return this;
  }

  /**
   * @param {string} eventName
   * @param {function} cb
   * @return {Noty}
   */


  _createClass(Noty, [{
    key: 'on',
    value: function on(eventName) {
      var cb = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};

      if (typeof cb === 'function' && this.listeners.hasOwnProperty(eventName)) {
        this.listeners[eventName].push(cb);
      }

      return this;
    }

    /**
     * @return {Noty}
     */

  }, {
    key: 'show',
    value: function show() {
      var _this = this;

      if (this.options.killer === true && !API.PageHidden) {
        
        info_amount += 1;
        if (info_amount >= 4) {
          info_amount = 0;
          Noty.closeAll();
        }
      
      } else if (typeof this.options.killer === 'string' && !API.PageHidden) {
        
        info_amount += 1;
        if (info_amount >= 4) {
          info_amount = 0;
          Noty.closeAll(this.options.killer);
        }
        
      } else {
        /*var queueCounts = API.getQueueCounts(this.options.queue);

        if (queueCounts.current >= queueCounts.maxVisible || API.PageHidden) {
          API.addToQueue(this);

          if (API.PageHidden && this.hasSound && Utils.inArray('docHidden', this.options.sounds.conditions)) {
            Utils.createAudioElements(this);
          }

          if (API.PageHidden && Utils.inArray('docHidden', this.options.titleCount.conditions)) {
            API.docTitle.increment();
          }

          return this;
        }*/

        info_amount += 1;
        if (info_amount >= 4) {
          info_amount = 0;
          Noty.closeAll();
        }

      }

      API.Store[this.id] = this;

      API.fire(this, 'beforeShow');

      this.showing = true;

      if (this.closing) {
        this.showing = false;
        return this;
      }

      API.build(this);
      API.handleModal(this);

      if (this.options.force) {
        this.layoutDom.insertBefore(this.barDom, this.layoutDom.firstChild);
      } else {
        this.layoutDom.appendChild(this.barDom);
      }

      if (this.hasSound && !this.soundPlayed && Utils.inArray('docVisible', this.options.sounds.conditions)) {
        Utils.createAudioElements(this);
      }

      if (Utils.inArray('docVisible', this.options.titleCount.conditions)) {
        API.docTitle.increment();
      }

      this.shown = true;
      this.closed = false;

      // bind button events if any
      if (API.hasButtons(this)) {
        Object.keys(this.options.buttons).forEach(function (key) {
          var btn = _this.barDom.querySelector('#' + _this.options.buttons[key].id);
          Utils.addListener(btn, 'click', function (e) {
            Utils.stopPropagation(e);
            _this.options.buttons[key].cb();
          });
        });
      }

      this.progressDom = this.barDom.querySelector('.noty_progressbar');

      if (Utils.inArray('click', this.options.closeWith)) {
        Utils.addClass(this.barDom, 'noty_close_with_click');
        Utils.addListener(this.barDom, 'click', function (e) {
          Utils.stopPropagation(e);
          _this.close();
        }, false);
      }

      Utils.addListener(this.barDom, 'mouseenter', function () {
        API.fire(_this, 'onHover');
      }, false);

      if (this.options.timeout) Utils.addClass(this.barDom, 'noty_has_timeout');

      if (Utils.inArray('button', this.options.closeWith)) {
        Utils.addClass(this.barDom, 'noty_close_with_button');

        var closeButton = document.createElement('div');
        Utils.addClass(closeButton, 'noty_close_button');
        closeButton.innerHTML = '×';
        this.barDom.appendChild(closeButton);

        Utils.addListener(closeButton, 'click', function (e) {
          Utils.stopPropagation(e);
          _this.close();
        }, false);
      }

      API.fire(this, 'onShow');

      if (this.options.animation.open === null) {
        this.promises.show = new _es6Promise2.default(function (resolve) {
          resolve();
        });
      } else if (typeof this.options.animation.open === 'function') {
        this.promises.show = new _es6Promise2.default(this.options.animation.open.bind(this));
      } else {
        Utils.addClass(this.barDom, this.options.animation.open);
        this.promises.show = new _es6Promise2.default(function (resolve) {
          Utils.addListener(_this.barDom, Utils.animationEndEvents, function () {
            Utils.removeClass(_this.barDom, _this.options.animation.open);
            resolve();
          });
        });
      }

      this.promises.show.then(function () {
        var _t = _this;
        setTimeout(function () {
          API.openFlow(_t);
        }, 100);
      });

      return this;
    }

    /**
     * @return {Noty}
     */

  }, {
    key: 'stop',
    value: function stop() {
      API.dequeueClose(this);
      return this;
    }

    /**
     * @return {Noty}
     */

  }, {
    key: 'resume',
    value: function resume() {
      API.queueClose(this);
      return this;
    }

    /**
     * @param {int|boolean} ms
     * @return {Noty}
     */

  }, {
    key: 'setTimeout',
    value: function (_setTimeout) {
      function setTimeout(_x) {
        return _setTimeout.apply(this, arguments);
      }

      setTimeout.toString = function () {
        return _setTimeout.toString();
      };

      return setTimeout;
    }(function (ms) {
      this.stop();
      this.options.timeout = ms;

      if (this.barDom) {
        if (this.options.timeout) {
          Utils.addClass(this.barDom, 'noty_has_timeout');
        } else {
          Utils.removeClass(this.barDom, 'noty_has_timeout');
        }

        var _t = this;
        setTimeout(function () {
          // ugly fix for progressbar display bug
          _t.resume();
        }, 100);
      }

      return this;
    })

    /**
     * @param {string} html
     * @param {boolean} optionsOverride
     * @return {Noty}
     */

  }, {
    key: 'setText',
    value: function setText(html) {
      var optionsOverride = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      if (this.barDom) {
        this.barDom.querySelector('.noty_body').innerHTML = html;
      }

      if (optionsOverride) this.options.text = html;

      return this;
    }

    /**
     * @param {string} type
     * @param {boolean} optionsOverride
     * @return {Noty}
     */

  }, {
    key: 'setType',
    value: function setType(type) {
      var _this2 = this;

      var optionsOverride = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      if (this.barDom) {
        var classList = Utils.classList(this.barDom).split(' ');

        classList.forEach(function (c) {
          if (c.substring(0, 11) === 'noty_type__') {
            Utils.removeClass(_this2.barDom, c);
          }
        });

        Utils.addClass(this.barDom, 'noty_type__' + type);
      }

      if (optionsOverride) this.options.type = type;

      return this;
    }

    /**
     * @param {string} theme
     * @param {boolean} optionsOverride
     * @return {Noty}
     */

  }, {
    key: 'setTheme',
    value: function setTheme(theme) {
      var _this3 = this;

      var optionsOverride = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      if (this.barDom) {
        var classList = Utils.classList(this.barDom).split(' ');

        classList.forEach(function (c) {
          if (c.substring(0, 12) === 'noty_theme__') {
            Utils.removeClass(_this3.barDom, c);
          }
        });

        Utils.addClass(this.barDom, 'noty_theme__' + theme);
      }

      if (optionsOverride) this.options.theme = theme;

      return this;
    }

    /**
     * @return {Noty}
     */

  }, {
    key: 'close',
    value: function close() {
      var _this4 = this;

      if (this.closed) return this;

      if (!this.shown) {
        // it's in the queue
        API.removeFromQueue(this);
        return this;
      }

      API.fire(this, 'onClose');

      this.closing = true;

      if (this.options.animation.close === null) {
        this.promises.close = new _es6Promise2.default(function (resolve) {
          resolve();
        });
      } else if (typeof this.options.animation.close === 'function') {
        this.promises.close = new _es6Promise2.default(this.options.animation.close.bind(this));
      } else {
        Utils.addClass(this.barDom, this.options.animation.close);
        this.promises.close = new _es6Promise2.default(function (resolve) {
          Utils.addListener(_this4.barDom, Utils.animationEndEvents, function () {
            if (_this4.options.force) {
              Utils.remove(_this4.barDom);
            } else {
              API.ghostFix(_this4);
            }
            resolve();
          });
        });
      }

      this.promises.close.then(function () {
        API.closeFlow(_this4);
        API.handleModalClose(_this4);
      });

      this.closed = true;

      return this;
    }

    // API functions

    /**
     * @param {boolean|string} queueName
     * @return {Noty}
     */

  }], [{
    key: 'closeAll',
    value: function closeAll() {
      var queueName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      Object.keys(API.Store).forEach(function (id) {
        if (queueName) {
          if (API.Store[id].options.queue === queueName && API.Store[id].killable) {
            API.Store[id].close();
          }
        } else if (API.Store[id].killable) {
          API.Store[id].close();
        }
      });
      return this;
    }

    /**
     * @param {Object} obj
     * @return {Noty}
     */

  }, {
    key: 'overrideDefaults',
    value: function overrideDefaults(obj) {
      API.Defaults = Utils.deepExtend({}, API.Defaults, obj);
      return this;
    }

    /**
     * @param {int} amount
     * @param {string} queueName
     * @return {Noty}
     */

  }, {
    key: 'setMaxVisible',
    value: function setMaxVisible() {
      var amount = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : API.DefaultMaxVisible;
      var queueName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'global';

      if (!API.Queues.hasOwnProperty(queueName)) {
        API.Queues[queueName] = { maxVisible: amount, queue: [] };
      }

      API.Queues[queueName].maxVisible = amount;
      return this;
    }

    /**
     * @param {string} innerHtml
     * @param {String} classes
     * @param {Function} cb
     * @param {Object} attributes
     * @return {NotyButton}
     */

  }, {
    key: 'button',
    value: function button(innerHtml) {
      var classes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var cb = arguments[2];
      var attributes = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

      return new _button.NotyButton(innerHtml, classes, cb, attributes);
    }

    /**
     * @return {string}
     */

  }, {
    key: 'version',
    value: function version() {
      return "3.1.0";
    }

    /**
     * @param {String} workerPath
     * @return {Push}
     */

  }, {
    key: 'Push',
    value: function Push(workerPath) {
      return new _push.Push(workerPath);
    }
  }]);

  return Noty;
}();

// Document visibility change controller


exports.default = Noty;
Utils.visibilityChangeFlow();
module.exports = exports['default'];

/***/ }),
/* 7 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 8 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 9 */
/***/ (function(module, exports) {

/* (ignored) */

/***/ })
/******/ ]);
});
//# sourceMappingURL=noty.js.map


window.pNotify = {
    show: (info) => {
        if (info.options) {
            var options = info.options;
            new Noty(options).show();
        } else {
            var maxNotifications = info.maxNotifications;
            Noty.setMaxVisible(maxNotifications.max, maxNotifications.queue);
        };
    }
};
