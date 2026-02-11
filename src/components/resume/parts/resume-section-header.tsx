import { ResumeBlock } from '../primitives/resume-block';
import { ResumeText } from '../primitives/resume-text';
import { ResumeSeparator } from '../primitives/resume-separator';
import { ResumeVerticalSpace } from '../primitives/resume-vertical-space';

type ResumeSectionHeaderProps = {
    children: any;
};

export function ResumeSectionHeader({children}: ResumeSectionHeaderProps) {
    return (
        <>
            <ResumeBlock align="start">
                <ResumeText variant="section">{children}</ResumeText>
            </ResumeBlock>
            <ResumeSeparator weight="bold" tone="dark"/>
            <ResumeVerticalSpace size={'small'}/>
        </>
    );
}