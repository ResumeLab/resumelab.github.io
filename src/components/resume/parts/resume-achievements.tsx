import {ResumeText} from "../primitives/resume-text";
import { ResumeVerticalSpace } from "../primitives/resume-vertical-space";
import type {AchievementsData} from "../../../contexts/resume-types.tsx";
import {ResumeSectionHeader} from "./resume-section-header.tsx";
import {ResumeKeepTogether} from "../primitives/resume-keep-together.tsx";
import {ResumeSeparator} from "../primitives/resume-separator.tsx";
import {ResumeBulletPoint} from "../primitives/resume-bullet-point.tsx";

type ResumeAchievementsProps = {
    data: AchievementsData;
};

export function ResumeAchievements({ data }: ResumeAchievementsProps) {
    if(!data?.items?.length){
        return null;
    }

    return (
        <>
            <ResumeKeepTogether>
                <ResumeSectionHeader>KEY ACHIEVEMENTS</ResumeSectionHeader>
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