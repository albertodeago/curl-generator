export interface CurlJsonBody {
    /**
     * JSON body type for JSON objects.
     */
    type: "json";
    /**
     * The content of the body.
     */
    content: Record<string | number | symbol, unknown>;
}
export declare function isCurlJsonBody(body: unknown): body is CurlJsonBody;
export declare function jsonContentToString(content: Record<string | number | symbol, unknown>): string;
export declare function jsonBodyToString(body: CurlJsonBody): string;
export declare function jsonBodyToCommand(body: CurlJsonBody): string;
