import { CurlFileBody } from "./file-body";
import { CurlRawBody } from "./raw-body";
export interface CurlFormBody {
    /**
     * Form body type for URL-encoded form data.
     */
    type: "form";
    /**
     * The content of the body.
     */
    content: Record<string, string | CurlFileBody | CurlRawBody> | URLSearchParams;
}
export declare function formBodyToString(body: CurlFormBody): string;
export declare function isCurlFormBody(body: unknown): body is CurlFormBody;
export declare function formBodyToCommand(body: CurlFormBody): string;
