import {ResumeMultilineText} from "../primitives/resume-text";
import { ResumeVerticalSpace } from "../primitives/resume-vertical-space";
import type {SummaryData} from "../../../contexts/resume-types.tsx";
import {ResumeSectionHeader} from "./resume-section-header.tsx";
import {ResumeKeepTogether} from "../primitives/resume-keep-together.tsx";
import {ResumeSeparator} from "../primitives/resume-separator.tsx";

type ResumeExperienceProps = {
    data: SummaryData;
};

export function ResumeSummary({ data }: ResumeExperienceProps) {
    if(!data?.text?.length){
        return null;
    }

    return (
        <>
            <ResumeKeepTogether>
                <ResumeSectionHeader>SUMMARY</ResumeSectionHeader>
                <ResumeMultilineText variant="body">{data.text}</ResumeMultilineText>
                <ResumeVerticalSpace size={'large'}/>
            </ResumeKeepTogether>

            <ResumeSeparator/>
            <ResumeVerticalSpace size={'large'}/>
        </>
    );
}