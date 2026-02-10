export class FileApiWrapper {
    private target: FileSystemHandle | null;
    private path: string;
    private name: string;
    private childrenListCache: FileApiWrapper[];

    constructor(target: FileSystemHandle | null = null, path?: string, name?: string) {
        this.target = target;
        this.path = path ?? ".";
        this.name = name ?? (target ? target.name : "");
        this.childrenListCache = [];
    }

    isExist(): boolean {
        return this.target !== null;
    }

    getPath(): string {
        return this.path;
    }

    getName(): string {
        return this.name;
    }

    isDirectory(): boolean {
        return this.target?.kind === "directory";
    }

    isFile(): boolean {
        return this.target?.kind === "file";
    }

    private asFileHandle(): FileSystemFileHandle | null {
        return this.isFile() ? (this.target as FileSystemFileHandle) : null;
    }

    private asDirectoryHandle(): FileSystemDirectoryHandle | null {
        return this.isDirectory() ? (this.target as FileSystemDirectoryHandle) : null;
    }

    async getSize(): Promise<number> {
        const fileHandle = this.asFileHandle();
        if (!fileHandle) {
            return 0;
        }

        try {
            const file = await fileHandle.getFile();
            return file.size ?? 0;
        } catch {
            return 0;
        }
    }

    async getText(): Promise<string> {
        const fileHandle = this.asFileHandle();
        if (!fileHandle) {
            throw new Error("Target is not a file");
        }

        const file = await fileHandle.getFile();
        return file.text();
    }

    async getLastModified(): Promise<number> {
        const fileHandle = this.asFileHandle();
        if (!fileHandle) {
            return 0;
        }

        try {
            const file = await fileHandle.getFile();
            return file.lastModified ?? 0;
        } catch {
            return 0;
        }
    }

    async list(): Promise<FileApiWrapper[]> {
        const directoryHandle = this.asDirectoryHandle();
        if (!directoryHandle) {
            this.childrenListCache = [];
            return this.childrenListCache;
        }

        this.childrenListCache = [];

        // @ts-ignore
        for await (const [name, handle] of directoryHandle.entries()) {
            if (name.startsWith(".")) {
                continue;
            }

            const childPath = `${this.path}/${name}`;
            this.childrenListCache.push(new FileApiWrapper(handle, childPath, name));
        }

        this.childrenListCache.sort((a, b) =>
            a.getName().localeCompare(b.getName(), undefined, { sensitivity: "base" })
        );

        return this.childrenListCache;
    }

    async select(name: string): Promise<FileApiWrapper> {
        const childPath = `${this.path}/${name}`;

        const directory = this.asDirectoryHandle();
        if (!directory) {
            return new FileApiWrapper(null, childPath, name);
        }

        if (this.childrenListCache.length === 0) {
            await this.list();
        }

        const found = this.childrenListCache.find((child) => child.getName() === name);
        return found ?? new FileApiWrapper(null, childPath, name);
    }
}