/**
 * KeyInterface object data
 * @field type Describes the content of the key, either "text" or "icon"
 * @field value The content for the key
 * @field override If null, use the default key handler. Otherwise, use the provided string to use the correct handler
 */
export interface KeyInterface {
    type: "text" | "icon",
    value: string,
    override?: string
}