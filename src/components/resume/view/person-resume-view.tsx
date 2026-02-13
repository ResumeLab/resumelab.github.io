import type {PersonResumeViewData} from "../../../contexts/resume-types.tsx";
import {ResumeBlock} from "../primitives/resume-block.tsx";
import {ResumeText} from "../primitives/resume-text.tsx";
import {ResumeHorizontalSpace} from "../primitives/resume-horizontal-space.tsx";
import {ResumeVerticalSpace} from "../primitives/resume-vertical-space.tsx";
import {intersperse} from "../../../common/intersperse.ts";
import {ResumeKeepTogether} from "../primitives/resume-keep-together.tsx";
import type {ReactNode} from "react";
import {ResumeIcon} from "../primitives/resume-icon.tsx";
import LocationDotIcon from "../../../assets/icons/solid/location-dot.svg";
import EnvelopeIcon from "../../../assets/icons/solid/envelope.svg";
import PhoneIcon from "../../../assets/icons/solid/phone.svg";
import {hasText} from "../../../common/has-text.ts";

type PersonViewProps = {
    data: PersonResumeViewData;
};

function buildLocation(data: PersonResumeViewData) {
    if(!hasText(data.city) && !hasText(data.state)) {
        return undefined;
    }

    return (
        <>
            <ResumeIcon variant="meta" link={LocationDotIcon}/>
            <ResumeHorizontalSpace size="small"/>
            <ResumeText variant="meta">
                {[data.city, data.state].filter(hasText).join(", ")}
            </ResumeText>
        </>
    );
}

function buildEmail(data: PersonResumeViewData) {
    if(!hasText(data.email)) {
        return undefined;
    }

    return (
        <>
            <ResumeIcon variant="meta" link={EnvelopeIcon}/>
            <ResumeHorizontalSpace size="small"/>
            <ResumeText variant="meta">{data.email}</ResumeText>
        </>
    );
}

function buildPhone(data: PersonResumeViewData) {
    if(!hasText(data.phone)) {
        return undefined;
    }

    return (
        <>
            <ResumeIcon variant="meta" link={PhoneIcon}/>
            <ResumeHorizontalSpace size="small"/>
            <ResumeText variant="meta">{data.phone}</ResumeText>
        </>
    );
}

export function PersonResumeView({ data }: PersonViewProps) {
    const parts: ReactNode[] = [
        buildLocation(data),
        buildEmail(data),
        buildPhone(data)
    ];

    return (
        <ResumeKeepTogether>
            <ResumeBlock align='center'>
                <ResumeText variant='title'>{data.first_name}</ResumeText>
                <ResumeHorizontalSpace/>
                <ResumeText variant='title'>{data.last_name}</ResumeText>
            </ResumeBlock>

            {parts && (
                <>
                    <ResumeVerticalSpace size={'medium'}/>

                    <ResumeBlock align={'center'}>
                        {
                            intersperse(parts, <ResumeHorizontalSpace/>)
                        }
                    </ResumeBlock>
                </>
            )}

            <ResumeVerticalSpace size={'small'}/>
        </ResumeKeepTogether>
    );
}