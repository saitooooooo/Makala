(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[132],{

/***/ "./node_modules/prismjs/components/prism-gcode.js":
/*!********************************************************!*\
  !*** ./node_modules/prismjs/components/prism-gcode.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

Prism.languages.gcode = {
	'comment': /;.*|\B\(.*?\)\B/,
	'string': {
		pattern: /"(?:""|[^"])*"/,
		greedy: true
	},
	'keyword': /\b[GM]\d+(?:\.\d+)?\b/,
	'property': /\b[A-Z]/,
	'checksum': {
		pattern: /\*\d+/,
		alias: 'punctuation'
	},
	// T0:0:0
	'punctuation': /:/
};


/***/ })

}]);