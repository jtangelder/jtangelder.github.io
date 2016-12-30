(function(e, a) { for(var i in a) e[i] = a[i]; }(this, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

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

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "assets";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ exports["a"] = isValidColor;
/* harmony export (immutable) */ exports["b"] = colorToRGB;
function createCanvas() {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    return canvas.getContext('2d');
}
function fillCanvas(ctx, color) {
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, 1, 1);
}
function isValidColor(color) {
    // fully transparent pixel on the canvas means an invalid color
    const ctx = createCanvas();
    fillCanvas(ctx, color);
    const d = ctx.getImageData(0, 0, 1, 1).data;
    return !(d[0] === 0 && d[1] === 0 && d[2] === 0 && d[3] === 255);
}
function colorToRGB(color, bgColor = 'white') {
    // start with an white canvas so rgba() colors can be calculated
    const ctx = createCanvas();
    ['white', bgColor, color].forEach(fillCanvas.bind(null, ctx));
    const d = ctx.getImageData(0, 0, 1, 1).data;
    return [d[0], d[1], d[2]];
}


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ exports["c"] = round;
/* harmony export (immutable) */ exports["a"] = getElement;
/* harmony export (immutable) */ exports["b"] = setElementText;
function round(number, precision) {
    const factor = Math.pow(10, precision);
    return Math.round(number * factor) / factor;
}
function getElement(selector, context = document) {
    return context.querySelector(selector);
}
function setElementText(text, selector, context = undefined) {
    getElement(selector, context).textContent = text;
}


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__colors__ = __webpack_require__(0);
/* harmony export (immutable) */ exports["a"] = getContrastRatio;


function getLuminance(rgb) {
    // see https://www.w3.org/TR/WCAG/#relativeluminancedef
    const [r, g, b] = rgb
        .map(c => c / 255)
        .map(c => ((c <= 0.03928) ? (c / 12.92) : Math.pow((c + 0.055) / 1.055, 2.4)));
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
function getContrastRatio(color1, color2) {
    // see https://www.w3.org/TR/WCAG/#contrast-ratiodef
    const lums = [
        getLuminance(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__colors__["b" /* colorToRGB */])(color1)),
        getLuminance(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__colors__["b" /* colorToRGB */])(color2, color1))
    ];
    const l1 = Math.max(...lums);
    const l2 = Math.min(...lums);
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["c" /* round */])((l1 + 0.05) / (l2 + 0.05), 2);
}


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ exports["a"] = getWCAGScores;
function getScoreEntry(contrast, required) {
    return {
        valid: contrast >= required,
        actual: contrast,
        required
    };
}
function getScoreSet(contrast, reqRegular, reqLarge) {
    return {
        regular: getScoreEntry(contrast, reqRegular),
        large: getScoreEntry(contrast, reqLarge),
    };
}
function getWCAGScores(contrast) {
    return {
        a: getScoreSet(contrast, 1, 1),
        aa: getScoreSet(contrast, 4.5, 3),
        aaa: getScoreSet(contrast, 7, 4.5)
    };
}


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__colors__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__contrast__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__score__ = __webpack_require__(3);




function setPageColors(background, foreground) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["a" /* getElement */])('meta[name="theme-color"]').content = background;
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["a" /* getElement */])('body').style.background = background;
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["a" /* getElement */])('body').style.color = foreground;
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["a" /* getElement */])('body').style.borderColor = foreground;
}
function onSubmitForm(ev) {
    ev.preventDefault();
    const color1 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["a" /* getElement */])('input[name="color1"]').value.trim();
    const color2 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["a" /* getElement */])('input[name="color2"]').value.trim();
    if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__colors__["a" /* isValidColor */])(color1) || !__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__colors__["a" /* isValidColor */])(color2)) {
        alert('Invalid color provided!');
        return;
    }
    const contrastRatio = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__contrast__["a" /* getContrastRatio */])(color1, color2);
    const scores = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__score__["a" /* getWCAGScores */])(contrastRatio);
    setPageColors(color1, color2);
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["b" /* setElementText */])(contrastRatio, '.ratio');
    Object.keys(scores).forEach(level => {
        const row = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["a" /* getElement */])(`tr.level-${level}`);
        Object.keys(scores[level]).forEach(type => {
            const result = scores[level][type];
            const cell = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["a" /* getElement */])(`td.${type}`, row);
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["b" /* setElementText */])(result.valid, `.score`, cell);
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["b" /* setElementText */])(result.required, `.minimal`, cell);
            cell.classList.remove('false', 'true');
            cell.classList.add(result.valid.toString());
        });
    });
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["a" /* getElement */])('#results').classList.remove('hidden');
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["a" /* getElement */])('form').addEventListener('submit', onSubmitForm);


/***/ }
/******/ ])));