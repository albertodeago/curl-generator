(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global['curl-generator'] = {}));
}(this, (function (exports) { 'use strict';

	/**
	 * @param {string} [method]
	 * @returns {string}
	 */
	var getCurlMethod = function (method) {
	    var result = "";
	    if (method) {
	        var types = {
	            GET: '-X GET',
	            POST: '-X POST',
	            PUT: '-X PUT',
	            PATCH: '-X PATCH',
	            DELETE: '-X DELETE',
	        };
	        result = types[method.toUpperCase()];
	    }
	    return result;
	};
	/**
	 * @param {StringMap} headers
	 * @returns {string}
	 */
	var getCurlHeaders = function (headers) {
	    var result = "";
	    if (headers) {
	        Object.keys(headers).map(function (val) {
	            result += "-H \"" + val + ": " + headers[val].replace(/(\\|")/g, '\\$1') + "\" ";
	        });
	    }
	    return result.trim();
	};
	/**
	 * @param {Object} body
	 * @returns {string}
	 */
	var getCurlBody = function (body) {
	    var result = "";
	    if (body) {
	        result += "-d \"" + (JSON.stringify(body)).replace(/(\\|")/g, '\\$1') + "\"";
	    }
	    return result;
	};
	/**
	 * @param {CurlRequest} options
	 * @returns {string}
	 */
	var CurlGenerator = function (options) {
	    var curlSnippet = "curl ";
	    curlSnippet += "\"" + options.url + "\" ";
	    curlSnippet += getCurlMethod(options.method) + " ";
	    curlSnippet += getCurlHeaders(options.headers) + " ";
	    curlSnippet += getCurlBody(options.body);
	    return curlSnippet.trim();
	};

	exports.CurlGenerator = CurlGenerator;

	Object.defineProperty(exports, '__esModule', { value: true });

})));
