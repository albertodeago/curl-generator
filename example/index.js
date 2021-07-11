const CurlGenerator = require("../dist/curl-generator.cjs").CurlGenerator;
const params = require("./example-parameters").params;

const get1 = CurlGenerator(params.get1)
console.log(get1 + "\n")

const get2 = CurlGenerator(params.get2)
console.log(get2 + "\n")

const getWithHeaders = CurlGenerator(params.getWithHeaders)
console.log(getWithHeaders + "\n")

const escapeQuotes = CurlGenerator(params.getEscapeHeaders)
console.log(escapeQuotes + "\n")

const post1 = CurlGenerator(params.post1)
console.log(post1 + "\n")

const put1 = CurlGenerator(params.put1)
console.log(put1 + "\n")

const patch1 = CurlGenerator(params.patch1)
console.log(patch1 + "\n")

const del1 = CurlGenerator(params.del1)
console.log(del1 + "\n")

const opt1 = CurlGenerator(params.opt1, params.opt1.options)
console.log(opt1 + "\n")

const opt2 = CurlGenerator(params.opt2, params.opt2.options)
console.log(opt2 + "\n")

