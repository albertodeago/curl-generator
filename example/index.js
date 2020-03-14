const CurlGenerator = require("../dist/curl-generator.cjs").CurlGenerator;
const params = require("./example-parameters").params;

const get1 = CurlGenerator(params.get1)
console.log(get1)

const get2 = CurlGenerator(params.get2)
console.log(get2)

const getWithHeaders = CurlGenerator(params.getWithHeaders)
console.log(getWithHeaders)

const escapeQuotes = CurlGenerator(params.getEscapeHeaders)
console.log(escapeQuotes)

const post1 = CurlGenerator(params.post1)
console.log(post1)

const put1 = CurlGenerator(params.put1)
console.log(put1)

const patch1 = CurlGenerator(params.patch1)
console.log(patch1)

const del1 = CurlGenerator(params.del1)
console.log(del1)
