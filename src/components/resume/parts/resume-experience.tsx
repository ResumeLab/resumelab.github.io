import { ResumeBlock } from "../primitives/resume-block";
import { ResumeText } from "../primitives/resume-text";
import { ResumeBulletPoint } from "../primitives/resume-bullet-point";
import { ResumeVerticalSpace } from "../primitives/resume-vertical-space";
import type {ExperienceData} from "../../../contexts/resume-types.tsx";

type ResumeExperienceProps = {
    data: ExperienceData;
};

export function ResumeExperience({ data }: ResumeExperienceProps) {
    const roleText = data.role?.filter(Boolean).join(" / ") ?? "";

    const periodEnd = (data.period_end && data.period_end.trim()) ? data.period_end : 'Present';
    const period = [data.period_start, periodEnd].filter(Boolean).join(" - ");

    const metaParts = [period, data.location].filter(Boolean).join(", ");

    return (
        <>
            <ResumeBlock align="start">
                <ResumeText variant="body">{roleText}</ResumeText>
            </ResumeBlock>

            <ResumeBlock align="space">
                <ResumeText variant="body">{data.organization}</ResumeText>
                <ResumeText variant="body">{metaParts}</ResumeText>
            </ResumeBlock>

            {(data.details ?? []).map((text, index) => (
                <ResumeBulletPoint key={index}>
                    <ResumeText variant="body">{text}</ResumeText>
                </ResumeBulletPoint>
            ))}

            <ResumeVerticalSpace size="large" />
        </>
    );
}