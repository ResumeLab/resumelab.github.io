import type {TextResumeViewData} from "../../../contexts/resume-types.tsx";
import {ResumeMultilineText} from "../primitives/resume-text.tsx";
import {hasText} from "../../../common/has-text.ts";
import {ResumeKeepTogether} from "../primitives/resume-keep-together.tsx";

type TextViewProps = {
    data: TextResumeViewData;
};

export function TextResumeView({data}: TextViewProps) {
    if (!hasText(data?.text)) {
        return undefined;
    }

    return (
        <ResumeKeepTogether>
            <ResumeMultilineText variant="body">{data.text}</ResumeMultilineText>
        </ResumeKeepTogether>
    )
}