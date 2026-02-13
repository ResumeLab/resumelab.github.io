import type {LabelResumeViewData} from "../../../contexts/resume-types.tsx";
import {ResumeKeepTogether} from "../primitives/resume-keep-together.tsx";
import {ResumeBlock} from "../primitives/resume-block.tsx";
import {ResumeText} from "../primitives/resume-text.tsx";
import {hasText} from "../../../common/has-text.ts";

type LabelViewProps = {
    data: LabelResumeViewData;
};

export function LabelResumeView({data}: LabelViewProps) {
    const items = (data.items ?? []).filter(hasText);

    if (!hasText(data.name) || items.length === 0) {
        return null;
    }

    const label = data.name.trim().endsWith(":") ? data.name.trim() : `${data.name.trim()}:`;
    const content = items.join(", ");


    return (
        <ResumeKeepTogether>
            <ResumeBlock align="start">
                <ResumeText variant="info">
                    <span style={{fontWeight: 600}}>{label}</span>
                    <span>{" "} {content}</span>
                </ResumeText>
            </ResumeBlock>
        </ResumeKeepTogether>
    )
}