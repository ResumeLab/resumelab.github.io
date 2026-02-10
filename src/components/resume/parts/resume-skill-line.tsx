import type { SkillData } from "../../../contexts/resume-types.tsx";
import { ResumeBlock } from "../primitives/resume-block.tsx";
import { ResumeText } from "../primitives/resume-text.tsx";
import {ResumeVerticalSpace} from "../primitives/resume-vertical-space.tsx";

type ResumeSkillLineProps = {
    data: SkillData;
};

function hasText(v: unknown): v is string {
    return typeof v === "string" && v.trim().length > 0;
}

export function ResumeSkillLine({ data }: ResumeSkillLineProps) {
    const items = (data.items ?? []).filter(hasText);
    if (!hasText(data.name) || items.length === 0) return null;

    const label = data.name.trim().endsWith(":") ? data.name.trim() : `${data.name.trim()}:`;
    const content = items.join(", ");

    return (
        <>
            <ResumeBlock align="start">
                <ResumeText variant="body">{label} {" "} {content}</ResumeText>
            </ResumeBlock>
            <ResumeVerticalSpace size={"small"}/>
        </>
    );
}