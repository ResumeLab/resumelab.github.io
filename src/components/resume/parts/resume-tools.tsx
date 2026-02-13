import {ResumeText} from "../primitives/resume-text";
import { ResumeVerticalSpace } from "../primitives/resume-vertical-space";
import type {ToolsData} from "../../../contexts/resume-types.tsx";
import {ResumeSectionHeader} from "./resume-section-header.tsx";
import {ResumeKeepTogether} from "../primitives/resume-keep-together.tsx";
import {ResumeSeparator} from "../primitives/resume-separator.tsx";
import {ResumeBulletPoint} from "../primitives/resume-bullet-point.tsx";

type ResumeToolsProps = {
    data: ToolsData;
};

export function ResumeTools({ data }: ResumeToolsProps) {
    if(!data?.items?.length){
        return null;
    }

    const title = data?.title ?? "TOOLS";

    return (
        <>
            <ResumeKeepTogether>
                <ResumeSectionHeader>{title}</ResumeSectionHeader>
                {(data?.items ?? []).map((text, index) => (
                    <ResumeBulletPoint key={index}>
                        <ResumeText variant="body">{text}</ResumeText>
                    </ResumeBulletPoint>
                ))}
                <ResumeVerticalSpace size={'large'}/>
            </ResumeKeepTogether>

            <ResumeSeparator/>
            <ResumeVerticalSpace size={'large'}/>
        </>
    );
}