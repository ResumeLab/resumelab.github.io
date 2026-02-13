import type {
    AchievementsData, CapabilitiesData,
    EducationData,
    ExperienceData,
    PersonData,
    ResumeData,
    SkillData,
    SummaryData, ToolsData
} from "../contexts/resume-types.tsx";
import {FileApiWrapper} from "./file-api-wrapper.ts";
import { parse } from "smol-toml";

export class FileResumeDataParser {
    private readonly root: FileApiWrapper;

    constructor(root: FileApiWrapper) {
        this.root = root;
    }

    async getResumeData(): Promise<ResumeData> {
        return {
            person: await this.parseFile("person.toml", this.parsePersonData) ?? {},
            summary: await this.parseFile("summary.toml", this.parseSummaryData) ?? {},
            achievements: await this.parseFile("achievements.toml", this.parseAchievementsData) ?? {},
            capabilities: await this.parseFile("capabilities.toml", this.parseCapabilitiesData) ?? {},
            tools: await this.parseFile("tools.toml", this.parseToolsData) ?? {},
            experience: await this.parseDirectory("experience", this.parseExperience),
            skills: await this.parseDirectory("skills", this.parseSkills),
            educations: await this.parseDirectory("education", this.parseEducations)
        }
    }

    private async parsePersonData(text: string): Promise<PersonData> {
        const data = parse(text) as Record<string, any>;

        const identity = data["identity"] ?? {};
        const contacts = data["contacts"] ?? {};
        const location = data["location"] ?? {};

        return {
            first_name: identity["first_name"],
            last_name: identity["last_name"],

            phone: contacts["phone"],
            email: contacts["email"],

            city: location["city"],
            state: location["state"],
        };
    }

    private async parseSummaryData(text: string): Promise<SummaryData> {
        const data = parse(text) as Record<string, any>;

        return {
            text: data["text"]
        }
    }

    private async parseAchievementsData(text: string): Promise<AchievementsData> {
        const data = parse(text) as Record<string, any>;

        return {
            title: data["title"] ?? undefined,
            items: Array.isArray(data["items"]) ? data["items"] : []
        }
    }

    private async parseCapabilitiesData(text: string): Promise<CapabilitiesData> {
        const data = parse(text) as Record<string, any>;

        return {
            title: data["title"] ?? undefined,
            items: Array.isArray(data["items"]) ? data["items"] : []
        }
    }

    private async parseToolsData(text: string): Promise<ToolsData> {
        const data = parse(text) as Record<string, any>;

        return {
            title: data["title"] ?? undefined,
            items: Array.isArray(data["items"]) ? data["items"] : []
        }
    }

    private parseExperience(text: string): ExperienceData {
        const data = parse(text) as Record<string, any>;

        return {
            organization: data["organization"],
            role: Array.isArray(data["role"]) ? data["role"] : [],
            period_start: data["period_start"],
            period_end: data["period_end"],
            location: data["location"],
            details: Array.isArray(data["details"]) ? data["details"] : []
        };
    }

    private parseSkills(text: string): SkillData {
        const data = parse(text) as Record<string, any>;

        return {
            name: data["name"],
            items: Array.isArray(data["items"]) ? data["items"] : []
        };
    }

    private parseEducations(text: string): EducationData {
        const data = parse(text) as Record<string, any>;

        return {
            institution: data["institution"],
            degree: data["degree"],
            field: data["field"]
        };
    }

    private async parseFile<T>(path: string, handler: (text: string) => T): Promise<T | undefined> {
        const target = await this.root.select(path);

        if(!target.isFile()) {
            return undefined;
        }

        const text = await target.getText();
        return handler(text);
    }

    private async parseDirectory<T>(path: string, handler: (text: string) => T): Promise<T[]> {
        const target = await this.root.select(path);

        if (!target.isDirectory()) {
            return [];
        }

        const children = await target.list();
        const result: T[] = [];

        for (const child of children) {
            if (!child.isFile()) {
                continue;
            }

            const text = await child.getText();
            result.push(await handler(text));
        }

        return result;
    }
}