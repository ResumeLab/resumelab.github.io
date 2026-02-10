import type {PersonData} from "../../../contexts/resume-types.tsx";
import LocationDotIcon from "../../../assets/icons/solid/location-dot.svg";
import EnvelopeIcon from "../../../assets/icons/solid/envelope.svg";
import PhoneIcon from "../../../assets/icons/solid/phone.svg";
import {ResumeBlock} from "../primitives/resume-block.tsx";
import {ResumeIcon} from "../primitives/resume-icon.tsx";
import {ResumeHorizontalSpace} from "../primitives/resume-horizontal-space.tsx";
import {ResumeText} from "../primitives/resume-text.tsx";
import type {ReactNode} from "react";
import {intersperse} from "../../../common/intersperse.ts";

type ResumeContactLineProps = {
    data: PersonData;
};

function hasText(v: unknown): v is string {
    return typeof v === "string" && v.trim().length > 0;
}

export function ResumeContactLine({data}: ResumeContactLineProps) {
    const parts: ReactNode[] = [];

    const hasLocation = hasText(data.city) || hasText(data.state);
    if (hasLocation) {
        parts.push(
            <>
                <ResumeIcon variant="meta" link={LocationDotIcon}/>
                <ResumeHorizontalSpace size="small"/>
                <ResumeText variant="meta">
                    {[data.city, data.state].filter(hasText).join(", ")}
                </ResumeText>
            </>
        );
    }

    if (hasText(data.email)) {
        parts.push(
            <>
                <ResumeIcon variant="meta" link={EnvelopeIcon}/>
                <ResumeHorizontalSpace size="small"/>
                <ResumeText variant="meta">{data.email}</ResumeText>
            </>
        );
    }

    if (hasText(data.phone)) {
        parts.push(
            <>
                <ResumeIcon variant="meta" link={PhoneIcon}/>
                <ResumeHorizontalSpace size="small"/>
                <ResumeText variant="meta">{data.phone}</ResumeText>
            </>
        );
    }

    if (parts.length === 0) {
        return null;
    }

    return (
        <ResumeBlock align={'center'}>
            {
                intersperse(parts, <ResumeHorizontalSpace/>)
            }
        </ResumeBlock>
    );
}