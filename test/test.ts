const assert = require('assert');
const CurlGenerator = require('../dist/curl-generator.cjs').CurlGenerator;
const data = require("../example/example-parameters");

const params = data.params;
const results = data.results;


function test(params: Object, result: string): void {
	const curlSnippet = CurlGenerator(params)
	// console.log("Asserting \n" + curlSnippet + "\n" + result + "\n")
	assert.strictEqual(curlSnippet, result)
}


Object.keys(params).forEach(key => {
	test(params[key], results[key]);
})
