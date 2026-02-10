import type { EducationData } from "../../../contexts/resume-types.tsx";
import { ResumeBlock } from "../primitives/resume-block.tsx";
import { ResumeText } from "../primitives/resume-text.tsx";
import { ResumeVerticalSpace } from "../primitives/resume-vertical-space.tsx";

type Props = { data: EducationData };

export function ResumeEducation({ data }: Props) {
    const title = [data.degree, data.field].filter(Boolean).join(", ");
    const meta = [data.institution, data.location, data.year].filter(Boolean).join(" · ");

    return (
        <>
            <ResumeBlock align="start">
                <ResumeText variant="body">
                    {title}
                </ResumeText>
            </ResumeBlock>

            <ResumeBlock align="start">
                <ResumeText variant="body">
                    {meta}
                </ResumeText>
            </ResumeBlock>

            <ResumeVerticalSpace size="large" />
        </>
    );
}