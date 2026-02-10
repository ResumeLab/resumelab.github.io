import type {FileApiWrapper} from "./file-api-wrapper.ts";

type FileSnapshot = {
    path: string;
    size: number;
    lastModified: number;
};

export class FileTreeChangeDetector {
    private previous = new Map<string, FileSnapshot>();
    private root: FileApiWrapper;

    constructor(root: FileApiWrapper) {
        this.root = root;
    }

    async init(): Promise<void> {
        const snapshot = new Map<string, FileSnapshot>();
        await this.collect(this.root, snapshot);
        this.previous = snapshot;
    }

    private async collect(
        node: FileApiWrapper,
        index: Map<string, FileSnapshot>
    ): Promise<void> {
        if (node.isFile()) {
            index.set(node.getPath(), {
                path: node.getPath(),
                size: await node.getSize(),
                lastModified: await node.getLastModified(),
            });
            return;
        }

        if (node.isDirectory()) {
            const children = await node.list();
            for (const child of children) {
                await this.collect(child, index);
            }
        }
    }

    async hasChanges(): Promise<boolean> {
        const current = new Map<string, FileSnapshot>();

        const changed = await this.walk(this.root, current);
        if (changed) {
            return true;
        }

        if (this.previous.size !== current.size) {
            return true;
        }

        this.previous = current;
        return false;
    }

    private async walk(
        node: FileApiWrapper,
        index: Map<string, FileSnapshot>
    ): Promise<boolean> {
        if (node.isFile()) {
            const snapshot: FileSnapshot = {
                path: node.getPath(),
                size: await node.getSize(),
                lastModified: await node.getLastModified(),
            };

            const prev = this.previous.get(snapshot.path);

            if (!prev || !this.equals(prev, snapshot)) {
                this.previous.set(snapshot.path, snapshot);
                return true;
            }

            index.set(snapshot.path, snapshot);
            return false;
        }

        if (node.isDirectory()) {
            const children = await node.list();

            for (const child of children) {
                const changed = await this.walk(child, index);
                if (changed) {
                    return true;
                }
            }
        }

        return false;
    }

    private equals(a: FileSnapshot, b: FileSnapshot): boolean {
        return a.size === b.size && a.lastModified === b.lastModified;
    }
}