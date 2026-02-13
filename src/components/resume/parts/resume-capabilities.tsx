import {ResumeText} from "../primitives/resume-text";
import { ResumeVerticalSpace } from "../primitives/resume-vertical-space";
import type {CapabilitiesData} from "../../../contexts/resume-types.tsx";
import {ResumeSectionHeader} from "./resume-section-header.tsx";
import {ResumeKeepTogether} from "../primitives/resume-keep-together.tsx";
import {ResumeSeparator} from "../primitives/resume-separator.tsx";
import {ResumeBulletPoint} from "../primitives/resume-bullet-point.tsx";

type ResumeCapabilitiesProps = {
    data: CapabilitiesData;
};

export function ResumeCapabilities({ data }: ResumeCapabilitiesProps) {
    if(!data?.items?.length){
        return null;
    }

    const title = data?.title ?? "CAPABILITIES";

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