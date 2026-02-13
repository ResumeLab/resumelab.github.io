import type {ExperienceResumeViewData} from "../../../contexts/resume-types.tsx";
import {ResumeText} from "../primitives/resume-text.tsx";
import {ResumeVerticalSpace} from "../primitives/resume-vertical-space.tsx";
import {ResumeBlock} from "../primitives/resume-block.tsx";
import {ResumeBulletPoint} from "../primitives/resume-bullet-point.tsx";
import {ResumeKeepTogether} from "../primitives/resume-keep-together.tsx";

type ExperienceViewProps = {
    data: ExperienceResumeViewData;
};

export function ExperienceResumeView({data}: ExperienceViewProps) {
    const roleText = data.role?.filter(Boolean).join(" / ") ?? "";

    const periodEnd = (data.period_end && data.period_end.trim()) ? data.period_end : 'Present';
    const period = [data.period_start, periodEnd].filter(Boolean).join(" - ");

    const metaParts = [period].filter(Boolean).join(", ");

    return (
        <ResumeKeepTogether>
            <ResumeBlock align="start">
                <ResumeText variant="role">{data.organization}</ResumeText>
            </ResumeBlock>

            <ResumeBlock align="space">
                <ResumeText variant="info">{roleText} ({data.location})</ResumeText>
                <ResumeText variant="info">{metaParts}</ResumeText>
            </ResumeBlock>

            <ResumeVerticalSpace size="small" />

            {(data.details ?? []).map((text, index) => (
                <ResumeBulletPoint key={index}>
                    <ResumeText variant="body">{text}</ResumeText>
                </ResumeBulletPoint>
            ))}
        </ResumeKeepTogether>
    );
}