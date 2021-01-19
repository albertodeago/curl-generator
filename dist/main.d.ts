declare type StringMap = {
    [key: string]: string;
};
declare type CurlRequest = {
    method?: "GET" | "get" | "POST" | "post" | "PUT" | "put" | "PATCH" | "patch" | "DELETE" | "delete";
    headers?: StringMap;
    body?: string;
    url: string;
};
/**
 * @param {CurlRequest} options
 * @returns {string}
 */
declare const CurlGenerator: (options: CurlRequest) => string;
export { CurlGenerator };
