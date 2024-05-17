import { CurlFileBody } from "./file-body";
import { CurlRawBody } from "./raw-body";
import { CurlJsonBody } from "./json-body";
import { CurlFormBody } from "./form-body";
export declare type CurlBody = string | Record<string | number | symbol, unknown> | URLSearchParams | CurlFileBody | CurlRawBody | CurlJsonBody | CurlFormBody;
export declare function bodyToString(body: CurlBody): string;
export declare function bodyToCommand(body: CurlBody): string;
