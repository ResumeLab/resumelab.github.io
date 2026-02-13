import type {BulletResumeViewData} from "../../../contexts/resume-types.tsx";
import {ResumeText} from "../primitives/resume-text.tsx";
import {ResumeKeepTogether} from "../primitives/resume-keep-together.tsx";
import {ResumeBulletPoint} from "../primitives/resume-bullet-point.tsx";

type BulletViewProps = {
    data: BulletResumeViewData;
};

export function BulletResumeView({data}: BulletViewProps) {
    if (!data?.items.length) {
        return undefined;
    }

    return (
        <ResumeKeepTogether>
            {(data?.items ?? []).map((text, index) => (
                <ResumeBulletPoint key={index}>
                    <ResumeText variant="body">{text}</ResumeText>
                </ResumeBulletPoint>
            ))}
        </ResumeKeepTogether>
    )
}