type StringMap = {[key: string]: string}
type CurlRequest = {
	method?: "GET" | "get" | "POST" | "post" | "PUT" | "put" | "PATCH" | "patch" | "DELETE" | "delete" | "HEAD" | "head",
	headers?: StringMap,
	body?: Object | Blob | Buffer,
	url: string,
}

let isNode: boolean = typeof module !== 'undefined' && module.exports

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
			HEAD: '-X HEAD'
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
 */
const getObjectCurlBody = function(body: Object): string {
	return `-d "${(JSON.stringify(body)).replace(/(\\|")/g, '\\$1')}"`
};

/**
 * 
 */
const getNodeCurlBody = async function(body: Object | Buffer): Promise<string> {
	if (Buffer.isBuffer(body)) {
		return `--data-binary ${body}`
	} else {
		return getObjectCurlBody(body)
	}
}

/**
 * @param {Object | Blob} body 
 */
const getBrowserCurlBody = async function(body: Object | Blob): Promise<string> {
	if (Blob && body instanceof Blob) {
		// binary data, Blob and we are in browser enviroment
		const byteArray = await new Response(body).arrayBuffer()
		return `--data-binary ${byteArray}`
	} else {
		return getObjectCurlBody(body)
	}
}


/**
 * @param {Object | Blob} body
 * @returns {Promise<string>}
 */
const getCurlBody = async function(body?: Object | Blob | Buffer): Promise<string> {
	let result = ""
	if (body) {
		if (isNode) {
			result += await getNodeCurlBody(body)
		} else {
			result += await getBrowserCurlBody(body)
		}
	}
	return result
}

/**
 * @param {CurlRequest} options
 * @returns {Promise<string>}
 */
const CurlGenerator = async function(options: CurlRequest): Promise<string> {
	return new Promise(async (resolve: Function) => {
		let curlSnippet = "curl "
		curlSnippet += `"${options.url}" `
		curlSnippet += getCurlMethod(options.method) + " "
		curlSnippet += getCurlHeaders(options.headers) + " "
		curlSnippet += await getCurlBody(options.body)
		resolve(curlSnippet.trim())
	})
	
}

export { CurlGenerator }
