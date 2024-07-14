import { CurlBody } from "./bodies/body";
declare type StringMap = {
    [key: string]: string;
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
declare type CurlAdditionalOptions = {
    compressed?: true;
    compressedSsh?: true;
    fail?: true;
    failEarly?: true;
    head?: true;
    include?: true;
    insecure?: true;
    ipv4?: true;
    ipv6?: true;
    listOnly?: true;
    location?: true;
    locationTrusted?: true;
    noKeepalive?: true;
    output?: string;
    showError?: true;
    silent?: true;
    ssl?: true;
    sslv2?: true;
    sslv3?: true;
    verbose?: true;
};
declare type CurlRequest = {
    method?: "GET" | "get" | "POST" | "post" | "PUT" | "put" | "PATCH" | "patch" | "DELETE" | "delete";
    headers?: StringMap;
    body?: CurlBody;
    url: string;
};
/**
 * @param {CurlRequest} params
 * @param {CurlAdditionalOptions} [options]
 * @returns {string}
 */
declare const CurlGenerator: (params: CurlRequest, options?: CurlAdditionalOptions | undefined) => string;
export { CurlGenerator };
