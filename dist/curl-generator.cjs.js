'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function isCurlFileBody(body) {
    return typeof body === "object" && body !== null && "type" in body && body.type === "file" && "fileName" in body;
}
function fileBodyToString(body) {
    return "@" + body.fileName;
}
function fileBodyToCommand(body) {
    return "--data-binary " + fileBodyToString(body);
}

function isCurlRawBody(body) {
    return typeof body === "object" && body !== null && "type" in body && body.type === "raw" && "content" in body;
}
function rawBodyToString(body) {
    return body.content;
}
function rawBodyToCommand(body) {
    return "-d '" + rawBodyToString(body) + "'";
}

function isCurlJsonBody(body) {
    return typeof body === "object" && body !== null && "type" in body && body.type === "json" && "content" in body;
}
function jsonContentToString(content) {
    return JSON.stringify(content).replace(/([\\'])/g, "\\$1");
}
function jsonBodyToString(body) {
    return jsonContentToString(body.content);
}
function jsonBodyToCommand(body) {
    return "-d '" + jsonBodyToString(body) + "'";
}

function isCurlFormBody(body) {
    return typeof body === "object" && body !== null && "type" in body && body.type === "form" && "content" in body;
}
function formBodyToCommand(body) {
    if (body.content instanceof URLSearchParams) {
        return "-d '" + body.content.toString() + "'";
    }
    return Object.entries(body.content)
        .map(function (_a) {
        var key = _a[0], value = _a[1];
        if (typeof value === "string") {
            return "-F " + key + "=" + value;
        }
        if (value.type === "file") {
            return "-F " + key + "=@" + value.fileName;
        }
        if (value.type === "raw") {
            return "-F " + key + "=" + value.content;
        }
        throw new Error("Invalid form body value type: " + value);
    })
        .join(" \\\n ");
}

function bodyToCommand(body) {
    if (typeof body === "string") {
        return "-d '" + body + "'";
    }
    else if (body instanceof URLSearchParams) {
        return "-d '" + body.toString() + "'";
    }
    else if (isCurlFileBody(body)) {
        return fileBodyToCommand(body);
    }
    else if (isCurlRawBody(body)) {
        return rawBodyToCommand(body);
    }
    else if (isCurlJsonBody(body)) {
        return jsonBodyToCommand(body);
    }
    else if (isCurlFormBody(body)) {
        return formBodyToCommand(body);
    }
    else if (typeof body === "object") {
        return "-d '" + jsonContentToString(body) + "'";
    }
    throw new Error("Invalid body type: " + body);
}

// slash for connecting previous breakup line to current line for running cURL directly in Command Prompt
var slash = " \\";
var newLine = "\n";
/**
 * @param {string} [method]
 * @param {boolean} [noValidation]
 * @returns {string}
 */
var getCurlMethod = function (method, noValidation) {
    var result = "";
    if (method) {
        if (noValidation) {
            result = " -X " + method;
        }
        else {
            var types = {
                GET: "-X GET",
                POST: "-X POST",
                PUT: "-X PUT",
                PATCH: "-X PATCH",
                DELETE: "-X DELETE",
                HEAD: "-X HEAD",
                OPTIONS: "-X OPTIONS",
                CONNECT: "-X CONNECT",
                TRACE: "-X TRACE",
                QUERY: "-X QUERY",
            };
            result = " " + types[method.toUpperCase()];
        }
    }
    return slash + newLine + result;
};
/**
 * @param {StringMap} headers
 * @returns {string}
 */
var getCurlHeaders = function (headers) {
    var result = "";
    if (headers) {
        Object.keys(headers).map(function (val) {
            result += "" + slash + newLine + " -H '" + val + ": " + headers[val].replace(/(\\|')/g, "\\$1") + "'";
        });
    }
    return result;
};
/**
 * @param {CurlBody} body
 * @returns {string}
 */
var getCurlBody = function (body) {
    var result = "";
    if (body) {
        result += "" + slash + newLine + " " + bodyToCommand(body);
    }
    return result;
};
/**
 * Given the curl additional options, turn them into curl syntax
 * @param {CurlAdditionalOptions} [options]
 * @returns {string}
 */
var getCurlOptions = function (options) {
    var result = "";
    if (options) {
        Object.keys(options).forEach(function (key) {
            var kebabKey = key.replace(/[A-Z]/g, function (letter) { return "-" + letter.toLowerCase(); });
            if (!options[key]) {
                throw new Error("Invalid Curl option " + key);
            }
            else if (typeof options[key] === "boolean" && options[key]) {
                // boolean option, we just add --opt
                result += " --" + kebabKey;
            }
            else if (typeof options[key] === "string") {
                // string option, we have to add --opt=value
                result += " --" + kebabKey + " " + options[key];
            }
        });
    }
    return result ? "" + slash + newLine + result : result;
};
/**
 * @param {CurlRequest} params
 * @param {CurlAdditionalOptions} [options]
 * @returns {string}
 */
var CurlGenerator = function (params, options) {
    var curlSnippet = "curl ";
    curlSnippet += params.url;
    curlSnippet += getCurlMethod(params.method, params.noValidation);
    curlSnippet += getCurlHeaders(params.headers);
    curlSnippet += getCurlBody(params.body);
    curlSnippet += getCurlOptions(options);
    return curlSnippet.trim();
};

exports.CurlGenerator = CurlGenerator;
