type StringMap = {[key: string]: string}
type CurlRequest = {
	method?: "GET" | "get" | "POST" | "post" | "PUT" | "put" | "PATCH" | "patch" | "DELETE" | "delete",
	headers?: StringMap,
	body?: string,
	url: string,
}

/**
 * @param {string} [method] 
 * @returns {string}
 */
const getCurlMethod = function(method?: string): string {
	let result: string = "";
	if (method) {
		const types: StringMap = {
			GET: '-X GET',
			POST: '-X POST',
			PUT: '-X PUT',
			PATCH: '-X PATCH',
			DELETE: '-X DELETE',
		}
		result = types[method.toUpperCase()];
	}
	return result;
}

/**
 * @param {StringMap} headers
 * @returns {string}
 */
const getCurlHeaders = function(headers?: StringMap): string {
	let result = ""
	if (headers) {
		Object.keys(headers).map(val => {
			result+= `-H "${val}: ${headers[val].replace(/(\\|")/g, '\\$1')}" `;
		})
	}
	return result.trim()
}

/**
 * @param {Object} body
 * @returns {string}
 */
const getCurlBody = function(body?: Object): string {
	let result = ""
	if (body) {
		result += `-d "${(JSON.stringify(body)).replace(/(\\|")/g, '\\$1')}"`
	}
	return result
}

/**
 * @param {CurlRequest} options
 * @returns {string}
 */
const CurlGenerator = function(options: CurlRequest):string {
	let curlSnippet = "curl "
	curlSnippet += `"${options.url}" `
	curlSnippet += getCurlMethod(options.method) + " "
	curlSnippet += getCurlHeaders(options.headers) + " "
	curlSnippet += getCurlBody(options.body)
	return curlSnippet.trim();
}

export { CurlGenerator }
