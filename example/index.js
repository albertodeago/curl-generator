const fs = require("fs");
const CurlGenerator = require("../dist/curl-generator.cjs").CurlGenerator;
const params = require("./example-parameters").params;

const runExamples = async function() {
    const get1 = await CurlGenerator(params.get1)
    console.log(get1)
    
    const get2 = await CurlGenerator(params.get2)
    console.log(get2)
    
    const getWithHeaders = await CurlGenerator(params.getWithHeaders)
    console.log(getWithHeaders)
    
    const escapeQuotes = await CurlGenerator(params.getEscapeHeaders)
    console.log(escapeQuotes)
    
    const post1 = await CurlGenerator(params.post1)
    console.log(post1)
    
    const put1 = await CurlGenerator(params.put1)
    console.log(put1)
    
    const patch1 = await CurlGenerator(params.patch1)
    console.log(patch1)
    
    const del1 = await CurlGenerator(params.del1)
    console.log(del1)
    
    // const byteArray = fs.readFileSync('./example/image.png');
    const byteArray = fs.readFileSync('./example/payload.txt');
    const binary1 = await CurlGenerator({
        method: "post",
        url: "prova",
        body: byteArray
    })
    console.log(binary1)
}

runExamples()
