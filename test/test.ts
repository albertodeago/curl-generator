const assert = require("assert");
var CurlGenerator = require("../dist/curl-generator.cjs").CurlGenerator;
const data = require("../example/example-parameters");

const params = data.params;
const results = data.results;

function test(params: Object, options: Object, result: string): void {
  const curlSnippet = CurlGenerator(params, options);
  assert.strictEqual(curlSnippet, result);
}

Object.keys(params).forEach((key) => {
  test(params[key], params[key].options, results[key]);
});

console.log(
  CurlGenerator({
    url: "https://example.com",
    method: "GET",
    body: {
      type: "file",
      fileName: "test.txt",
    },
    queries: {
      key: "val",
      key2: ["val1", "val2"],
      key3: "",
    },
  })
);
