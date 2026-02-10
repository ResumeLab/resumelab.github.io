export function intersperse<T>(items: T[], separator: T): T[] {
    const out: T[] = [];
    for (let i = 0; i < items.length; i++) {
        if (i > 0) out.push(separator);
        out.push(items[i]);
    }
    return out;
}