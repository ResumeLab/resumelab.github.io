export function hasText(v: unknown): v is string {
    return typeof v === "string" && v.trim().length > 0;
}