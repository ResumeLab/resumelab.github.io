import type {
    BulletResumeViewData, ExperienceResumeViewData, LabelResumeViewData,
    PersonResumeViewData,
    ResumeViewData, SectionResumeViewData,
    TextResumeViewData
} from "../contexts/resume-types.tsx";
import {FileApiWrapper} from "./file-api-wrapper.ts";
import { parse } from "smol-toml";

export class FileResumeDataParser {
    private readonly root: FileApiWrapper;

    constructor(root: FileApiWrapper) {
        this.root = root;
    }

    async getResumeData(): Promise<ResumeViewData[]> {
        const result = [];

        const files = await this.root.list();

        for (let file of files) {
            if (file.isFile()) {
                const view = await this.parseViewFile(file);
                if (view) {
                    result.push(view);
                }
                continue;
            }

            if(file.isDirectory()) {
                const viewList = await this.parseViewDirectory(file);
                result.push(...viewList);
            }
        }

        return result;
    }

    private async parseViewDirectory(dir: FileApiWrapper): Promise<ResumeViewData[]> {
        const items = await this.parseDirectoryViews(dir);

        const configFile = await dir.select("config.toml");
        if (configFile.isFile()) {
            const title = await this.parseSectionTitle(configFile);

            if(!title) {
                return items;
            }

            const section: SectionResumeViewData = {
                type: "section",
                title,
                items,
            };

            return [section];
        }

        return items;
    }

    private async parseSectionTitle(configFile: any): Promise<string | undefined> {
        const text = await configFile.getText();
        const data = parse(text) as Record<string, any>;

        const title = data["title"];
        return typeof title === "string" && title.trim().length > 0 ? title : undefined;
    }

    private async parseDirectoryViews(dir: FileApiWrapper): Promise<ResumeViewData[]> {
        const fileList = await dir.list();

        const result: ResumeViewData[] = [];

        for (const file of fileList) {
            if (!file.isFile()) {
                continue;
            }

            const view = await this.parseViewFile(file);
            if (view) {
                result.push(view);
            }
        }

        return result;
    }

    private async parseViewFile(file: any): Promise<ResumeViewData | undefined> {
        const filename = String(file.name ?? "");
        const text = await file.getText();

        if (filename.endsWith("person.toml")) {
            return this.parsePersonView(text);
        }
        if (filename.endsWith("text.toml")) {
            return this.parseTextView(text);
        }
        if (filename.endsWith("bullet.toml")) {
            return this.parseBulletView(text);
        }
        if (filename.endsWith("experience.toml")) {
            return this.parseExperienceView(text);
        }
        if (filename.endsWith("label.toml")) {
            return this.parseLabelView(text);
        }

        return undefined;
    }

    private parsePersonView(text: string): PersonResumeViewData {
        const data = parse(text) as Record<string, any>;

        const identity = data["identity"] ?? {};
        const contacts = data["contacts"] ?? {};
        const location = data["location"] ?? {};

        return {
            type: "person",
            first_name: identity["first_name"],
            last_name: identity["last_name"],
            phone: contacts["phone"],
            email: contacts["email"],
            city: location["city"],
            state: location["state"],
        };
    }

    private parseTextView(text: string): TextResumeViewData {
        const data = parse(text) as Record<string, any>;

        return {
            type: "text",
            text: typeof data["text"] === "string" ? data["text"] : undefined,
        };
    }

    private parseBulletView(text: string): BulletResumeViewData {
        const data = parse(text) as Record<string, any>;
        const itemsRaw = data["items"];

        const items = Array.isArray(itemsRaw) ? itemsRaw.filter((x) => typeof x === "string") : [];

        return {
            type: "bullet",
            items,
        };
    }

    private parseLabelView(text: string): LabelResumeViewData {
        const data = parse(text) as Record<string, any>;

        const itemsRaw = data["items"];
        const items = Array.isArray(itemsRaw) ? itemsRaw.filter((x) => typeof x === "string") : [];

        return {
            type: "label",
            name: data["name"],
            items
        };
    }

    private parseExperienceView(text: string): ExperienceResumeViewData {
        const data = parse(text) as Record<string, any>;

        const roleRaw = data["role"];
        const detailsRaw = data["details"];

        return {
            type: "experience",
            organization: typeof data["organization"] === "string" ? data["organization"] : undefined,
            role: Array.isArray(roleRaw) ? roleRaw.filter((x) => typeof x === "string") : [],
            period_start: typeof data["period_start"] === "string" ? data["period_start"] : undefined,
            period_end: typeof data["period_end"] === "string" ? data["period_end"] : undefined,
            location: typeof data["location"] === "string" ? data["location"] : undefined,
            details: Array.isArray(detailsRaw) ? detailsRaw.filter((x) => typeof x === "string") : [],
        };
    }
}