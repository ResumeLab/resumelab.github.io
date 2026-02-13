export interface ResumeViewData {
    type: string;
}

export interface SectionResumeViewData extends ResumeViewData {
    type: "section";

    title: string;

    items: ResumeViewData[];
}

export interface PersonResumeViewData extends ResumeViewData {
    type: "person";

    first_name?: string;
    last_name?: string;

    email?: string;
    phone?: string;

    city?: string;
    state?: string;
}

export interface TextResumeViewData extends ResumeViewData {
    type: "text";
    text?: string;
}

export interface BulletResumeViewData extends ResumeViewData {
    type: "bullet";
    items: string[];
}

export interface LabelResumeViewData extends ResumeViewData {
    type: "label";
    name?: string;
    items: string[];
}

export interface ExperienceResumeViewData extends ResumeViewData {
    type: "experience";

    organization?: string;
    role: string[];
    period_start?: string;
    period_end?: string;
    location?: string;
    details: string[];
}