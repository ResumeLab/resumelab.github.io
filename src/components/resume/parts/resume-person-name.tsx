import type {PersonData} from "../../../contexts/resume-types.tsx";
import {ResumeBlock} from "../primitives/resume-block.tsx";
import {ResumeText} from "../primitives/resume-text.tsx";
import {ResumeHorizontalSpace} from "../primitives/resume-horizontal-space.tsx";

type ResumePersonNameProps = {
    data: PersonData;
};

export function ResumePersonName({ data }: ResumePersonNameProps) {
    return (
        <ResumeBlock align='center'>
            <ResumeText variant='title'>{data.first_name}</ResumeText>
            <ResumeHorizontalSpace/>
            <ResumeText variant='title'>{data.last_name}</ResumeText>
        </ResumeBlock>
    );
}