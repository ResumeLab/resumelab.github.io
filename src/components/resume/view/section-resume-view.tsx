import {hasText} from "../../../common/has-text.ts";
import {ResumeKeepTogether} from "../primitives/resume-keep-together.tsx";
import * as React from "react";
import {ResumeBlock} from "../primitives/resume-block.tsx";
import {ResumeText} from "../primitives/resume-text.tsx";
import {ResumeSeparator} from "../primitives/resume-separator.tsx";
import {ResumeVerticalSpace} from "../primitives/resume-vertical-space.tsx";

type SectionViewProps = {
    title: string;
    children?: any;
};

export function SectionResumeView({title, children}: SectionViewProps) {
    const childArray = React.Children.toArray(children);

    if (!hasText(title)) {
        return <>{childArray}</>;
    }

    const [first, ...rest] = childArray;

    const header = (
        <>
            <ResumeBlock align="start">
                <ResumeText variant="section">{title}</ResumeText>
            </ResumeBlock>
            <ResumeSeparator weight="bold" tone="dark"/>
            <ResumeVerticalSpace size={'small'}/>
        </>
    )

    return (
        <>
            {first ? (
                <ResumeKeepTogether>
                    {header}
                    {first}
                </ResumeKeepTogether>
            ) : (
                <ResumeKeepTogether>
                    {header}
                </ResumeKeepTogether>
            )}

            {rest}
        </>
    )
}
