export interface CurlFileBody {
    /**
     * File body type for using a file as the body data.
     */
    type: "file";
    /**
     * The file name without the @.
     */
    fileName: string;
}
export declare function isCurlFileBody(body: unknown): body is CurlFileBody;
export declare function fileBodyToString(body: CurlFileBody): string;
export declare function fileBodyToCommand(body: CurlFileBody): string;
