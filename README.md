# CurlGenerator

CurlGenerator is a **small** (~1kb), dependecy free, library to generate curl snippets.
Currently it has only 1 API, but I'm open to suggestion on how to improve and to integrate with different http request libraries.


## Getting started

install in your project
```bash
npm install curl-generator
```

Or you can download the file you need from the dist folder

#### Using it
```js
import {CurlGenerator} from "curl-generator";

const curlSnippet = CurlGenerator({url: "https://jsonplaceholder.typicode.com/posts/1"}); 
// curlSnippet => curl "https://jsonplaceholder.typicode.com/posts/101"
```

If you are going to import it with in node via require
```js
const CurlGenerator = require("curl-generator").CurlGenerator;
```

#### API

Currently the library export just CurlGenerator, and it's a function with just 1 object parameter with the following description:
```js
/**
 * @param {string} url - the request url
 * @param {string} [param.method] - a value between ("GET" | "POST" | "PUT" | "PATCH" | "DELETE") it's case insensitive
 * @param {Object<string, string>} [param.headers] - an object containing the headers of the request
 * @param {Object} [body] - the body of the request
 */
```

Example of a more "andvanced" use
```js
import {CurlGenerator} from "curl-generator";

const params = {
    url: "https://jsonplaceholder.typicode.com/posts",
    method: "POST",
    headers: {
        "Content-type": "application/json; charset=UTF-8"
    },
    body: {
        "id": "123-456-789",
        "key1": "value 1",
        "key2": `a "complex" value`
    }
}
const curlSnippet = CurlGenerator(params); 
// curlSnippet => curl "https://jsonplaceholder.typicode.com/posts" -X POST -H "Content-type: application/json; charset=UTF-8" -d "{\"id\":\"123-456-789\",\"key1\":\"value 1\",\"key2\":\"a \\\"complex\\\" value\"}"
```

You can also pass Curl options as additional options:
```js
import {CurlGenerator} from "curl-generator";

const params = {
    url: "https://jsonplaceholder.typicode.com/posts/1"
}
const options = {
    output: "test.txt",
    silent: true
}
const curlSnippet = CurlGenerator(params, options); 
// curl "https://jsonplaceholder.typicode.com/posts/1" --output test.txt --silent
```
Currently the following options are supported (you can submit a PR if you need others):
- `compressed`: `boolean`,
- `compressedSsh`: `boolean`,
- `fail`: `boolean`,
- `failEarly`: `boolean`,
- `head`: `boolean`,
- `include`: `boolean`,
- `insecure`: `boolean`,
- `ipv4`: `boolean`,
- `ipv6`: `boolean`,
- `listOnly`: `boolean`,
- `location`: `boolean`,
- `locationTrusted`: `boolean`,
- `noKeepalive`: `boolean`,
- `output`: `string`,
- `showError`: `boolean`,
- `silent`: `boolean`,
- `ssl`: `boolean`,
- `sslv2`: `boolean`,
- `sslv3`: `boolean`,
- `verbose`: `boolean`,

## Contributing

The library is written in typescript (it's my first typescript project so I'm very open to tips and suggestions) and it comes with 3 scripts
Dev build with watch
```bash
npm run dev
```
Build bundle
```bash
npm run build
```
Test (I plan to move testing with jest if the library grows)
```bash
npm run test
```

The build generate three files:
* `dist/curl-generator.cjs.js`
    A CommonJS bundle, suitable for use in Node.js, that `require`s the external dependency. This corresponds to the `"main"` field in package.json
* `dist/curl-generator.esm.js`
    an ES module bundle, suitable for use in other people's libraries and applications, that `import`s the external dependency. This corresponds to the `"module"` field in package.json
* `dist/curl-generator.umd.js`
    a UMD build, suitable for use in any environment (including the browser, as a `<script>` tag), that includes the external dependency. This corresponds to the `"browser"` field in package.json

Feel free to open up an issue to suggest an improvement or an integration with an http library like axios

## Author and License

[Alberto De Agostini](https://twitter.com/albertodeago88)
[MIT](LICENSE).
