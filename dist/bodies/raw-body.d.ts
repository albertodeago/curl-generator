export interface CurlRawBody {
    /**
     * Raw body type for strings/text.
     */
    type: "raw";
    /**
     * The content of the body.
     */
    content: string;
}
export declare function isCurlRawBody(body: unknown): body is CurlRawBody;
export declare function rawBodyToString(body: CurlRawBody): string;
export declare function rawBodyToCommand(body: CurlRawBody): string;
