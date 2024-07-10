import { bodyToCommand, CurlBody } from "./bodies/body";

type StringMap = { [key: string]: string };

type CurlQueries = {
  [key: string]: string | string[];
};

/**
 * Additional options for curl command.
 *
 * --compressed        ->   Request compressed response
 * --compressed-ssh    ->   Enable SSH compression
 * --fail              ->   Fail silently (no output at all) on HTTP errors
 * --fail-early        ->   Fail on first transfer error, do not continue
 * --head              ->   Show document info only
 * --include           ->   Include protocol response headers in the output
 * --insecure          ->   Allow insecure server connections when using SSL
 * --ipv4              ->   Resolve names to IPv4 addresses
 * --ipv6              ->   Resolve names to IPv6 addresses
 * --list-only         ->   List only mode
 * --location          ->   Follow redirects
 * --location-trusted  ->   Like --location, and send auth to other hosts
 * --no-keepalive      ->   Disable TCP keepalive on the connection
 * --show-error        ->   Show error even when -s is used
 * --silent            ->   Silent mode
 * --ssl               ->   Try SSL/TLS
 * --sslv2             ->   Use SSLv2
 * --sslv3             ->   Use SSLv3
 * --verbose           ->   Make the operation more talkative
 */
type CurlAdditionalOptions = {
  compressed: boolean;
  compressedSsh: boolean;
  fail: boolean;
  failEarly: boolean;
  head: boolean;
  include: boolean;
  insecure: boolean;
  ipv4: boolean;
  ipv6: boolean;
  listOnly: boolean;
  location: boolean;
  locationTrusted: boolean;
  noKeepalive: boolean;
  output: string;
  showError: boolean;
  silent: boolean;
  ssl: boolean;
  sslv2: boolean;
  sslv3: boolean;
  verbose: boolean;
};

type CurlRequest = {
  method?:
    | "GET"
    | "get"
    | "POST"
    | "post"
    | "PUT"
    | "put"
    | "PATCH"
    | "patch"
    | "DELETE"
    | "delete";
  headers?: StringMap;
  body?: CurlBody;
  queries?: CurlQueries;
  url: string;
};

// slash for connecting previous breakup line to current line for running cURL directly in Command Prompt
const slash = " \\";
const newLine = "\n";

/**
 * @param {string} [method]
 * @returns {string}
 */
const getCurlMethod = function (method?: string): string {
  let result: string = "";
  if (method) {
    const types: StringMap = {
      GET: "-X GET",
      POST: "-X POST",
      PUT: "-X PUT",
      PATCH: "-X PATCH",
      DELETE: "-X DELETE",
    };
    result = ` ${types[method.toUpperCase()]}`;
  }
  return slash + newLine + result;
};

/**
 * @param {StringMap} headers
 * @returns {string}
 */
const getURLWithQueries = function (
  url: string,
  queries?: CurlQueries
): string {
  let result = url;

  if (queries) {
    if (result.indexOf("?") === -1) {
      result += "?";
    }

    Object.entries(queries).forEach(([key, val]) => {
      let q = "";
      if (typeof val === "string") {
        q = val;
      } else if (Array.isArray(val)) {
        q = val.join(","); // can add custom separator support if needed
      }

      if (q) {
        if (
          result[result.length - 1] !== "&" &&
          result[result.length - 1] !== "?"
        ) {
          result += "&";
        }
        result += key + "=" + q;
      }
    });
  }

  return result;
};

/**
 * @param {StringMap} headers
 * @returns {string}
 */
const getCurlHeaders = function (headers?: StringMap): string {
  let result = "";
  if (headers) {
    Object.keys(headers).map((val) => {
      result += `${slash}${newLine} -H "${val}: ${headers[val].replace(
        /(\\|")/g,
        "\\$1"
      )}"`;
    });
  }
  return result;
};

/**
 * @param {CurlBody} body
 * @returns {string}
 */
const getCurlBody = function (body?: CurlBody): string {
  let result = "";
  if (body) {
    result += `${slash}${newLine} ${bodyToCommand(body)}`;
  }
  return result;
};

/**
 * Given the curl additional options, turn them into curl syntax
 * @param {CurlAdditionalOptions} [options]
 * @returns {string}
 */
const getCurlOptions = function (options?: CurlAdditionalOptions): string {
  let result = "";
  if (options) {
    (Object.keys(options) as Array<keyof CurlAdditionalOptions>).forEach(
      (key: keyof CurlAdditionalOptions) => {
        const kebabKey = key.replace(
          /[A-Z]/g,
          (letter) => `-${letter.toLowerCase()}`
        );

        if (!options[key]) {
          throw new Error(`Invalid Curl option ${key}`);
        } else if (typeof options[key] === "boolean" && options[key]) {
          // boolean option, we just add --opt
          result += ` --${kebabKey}`;
        } else if (typeof options[key] === "string") {
          // string option, we have to add --opt=value
          result += ` --${kebabKey} ${options[key]}`;
        }
      }
    );
  }

  return result ? `${slash}${newLine}${result}` : result;
};

/**
 * @param {CurlRequest} params
 * @param {CurlAdditionalOptions} [options]
 * @returns {string}
 */
const CurlGenerator = function (
  params: CurlRequest,
  options?: CurlAdditionalOptions
): string {
  let curlSnippet = "curl ";
  curlSnippet += getURLWithQueries(params.url, params.queries);
  curlSnippet += getCurlMethod(params.method);
  curlSnippet += getCurlHeaders(params.headers);
  curlSnippet += getCurlBody(params.body);
  curlSnippet += getCurlOptions(options);
  return curlSnippet.trim();
};

export { CurlGenerator };
