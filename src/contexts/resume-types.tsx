export interface PersonData {
    first_name?: string;
    last_name?: string;
    email?: string;
    phone?: string;
    city?: string;
    state?: string;
}

export interface SummaryData {
    text?: string;
}

export interface AchievementsData {
    title?: string;
    items?: string[];
}

export interface CapabilitiesData {
    title?: string;
    items?: string[];
}

export interface ToolsData {
    title?: string;
    items?: string[];
}

export interface EducationData {
    institution: string;
    degree: string;
    field: string;
    location?: string;
    year?: string;
}

export interface SkillData {
    name: string;
    items: string[];
}

export interface ExperienceData {
    organization: string;
    role: string[];
    period_start: string;
    period_end: string;
    location: string;
    details: string[];
}

export interface ResumeData {
    person: PersonData;
    summary: SummaryData;
    achievements: AchievementsData;
    capabilities: CapabilitiesData;
    tools: ToolsData;
    educations: EducationData[];
    skills: SkillData[];
    experience: ExperienceData[];
}