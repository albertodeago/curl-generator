'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

let isNode = typeof module !== 'undefined' && module.exports;
/**
 * @param {string} [method]
 * @returns {string}
 */
const getCurlMethod = function (method) {
    let result = "";
    if (method) {
        const types = {
            GET: '-X GET',
            POST: '-X POST',
            PUT: '-X PUT',
            PATCH: '-X PATCH',
            DELETE: '-X DELETE',
            HEAD: '-X HEAD'
        };
        result = types[method.toUpperCase()];
    }
    return result;
};
/**
 * @param {StringMap} headers
 * @returns {string}
 */
const getCurlHeaders = function (headers) {
    let result = "";
    if (headers) {
        Object.keys(headers).map(val => {
            result += `-H "${val}: ${headers[val].replace(/(\\|")/g, '\\$1')}" `;
        });
    }
    return result.trim();
};
/**
 * @param {Object} body
 */
const getObjectCurlBody = function (body) {
    return `-d "${(JSON.stringify(body)).replace(/(\\|")/g, '\\$1')}"`;
};
/**
 *
 */
const getNodeCurlBody = function (body) {
    return __awaiter(this, void 0, void 0, function* () {
        if (Buffer.isBuffer(body)) {
            return `--data-binary ${body}`;
        }
        else {
            return getObjectCurlBody(body);
        }
    });
};
/**
 * @param {Object | Blob} body
 */
const getBrowserCurlBody = function (body) {
    return __awaiter(this, void 0, void 0, function* () {
        if (Blob && body instanceof Blob) {
            // binary data, Blob and we are in browser enviroment
            const byteArray = yield new Response(body).arrayBuffer();
            return `--data-binary ${byteArray}`;
        }
        else {
            return getObjectCurlBody(body);
        }
    });
};
/**
 * @param {Object | Blob} body
 * @returns {Promise<string>}
 */
const getCurlBody = function (body) {
    return __awaiter(this, void 0, void 0, function* () {
        let result = "";
        if (body) {
            if (isNode) {
                result += yield getNodeCurlBody(body);
            }
            else {
                result += yield getBrowserCurlBody(body);
            }
        }
        return result;
    });
};
/**
 * @param {CurlRequest} options
 * @returns {Promise<string>}
 */
const CurlGenerator = function (options) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            let curlSnippet = "curl ";
            curlSnippet += `"${options.url}" `;
            curlSnippet += getCurlMethod(options.method) + " ";
            curlSnippet += getCurlHeaders(options.headers) + " ";
            curlSnippet += yield getCurlBody(options.body);
            resolve(curlSnippet.trim());
        }));
    });
};

exports.CurlGenerator = CurlGenerator;
