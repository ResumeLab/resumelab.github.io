import './resume-document.css';
import {ResumePersonName} from "./parts/resume-person-name.tsx";
import {ResumeContactLine} from "./parts/resume-contact-line.tsx";
import type {ResumeData} from "../../contexts/resume-types.tsx";
import {ResumeVerticalSpace} from "./primitives/resume-vertical-space.tsx";
import {ResumeSeparator} from "./primitives/resume-separator.tsx";
import {ResumeSectionHeader} from "./parts/resume-section-header.tsx";
import {ResumeExperience} from "./parts/resume-experience.tsx";
import {ResumeEducation} from "./parts/resume-education.tsx";
import {ResumeKeepTogether} from "./primitives/resume-keep-together.tsx";
import {ResumeSummary} from "./parts/resume-summary.tsx";
import {ResumeAchievements} from "./parts/resume-achievements.tsx";
import {ResumeSkills} from "./parts/resume-skill.tsx";
import {ResumeCapabilities} from "./parts/resume-capabilities.tsx";
import {ResumeTools} from "./parts/resume-tools.tsx";


export function ResumeDocument({data}: { data: ResumeData }) {
    return (
        <article className="resume-doc">
            <ResumeKeepTogether>
                <ResumePersonName data={data.person}/>
                <ResumeVerticalSpace size={'medium'}/>

                <ResumeContactLine data={data.person}/>
                <ResumeVerticalSpace size={'small'}/>
            </ResumeKeepTogether>

            <ResumeSeparator/>
            <ResumeVerticalSpace size={'large'}/>

            <ResumeSummary data={data.summary}/>

            <ResumeAchievements data={data.achievements}/>

            <>
                {data.experience.length > 0 && (
                    <ResumeKeepTogether>
                        <ResumeSectionHeader>EXPERIENCE</ResumeSectionHeader>
                        <ResumeExperience data={data.experience[0]} />
                    </ResumeKeepTogether>
                )}

                {data.experience.slice(1).map((exp, i) => (
                    <ResumeKeepTogether key={i}>
                        <ResumeExperience data={exp} />
                    </ResumeKeepTogether>
                ))}
            </>

            <ResumeSeparator/>
            <ResumeVerticalSpace size={'large'}/>

            <>
                <ResumeKeepTogether>
                    <ResumeSectionHeader>EDUCATION</ResumeSectionHeader>
                    <ResumeEducation data={data.educations[0]} />
                </ResumeKeepTogether>

                {data.educations.slice(1).map((edu, index) => (
                    <ResumeKeepTogether key={index}>
                        <ResumeEducation data={edu} />
                    </ResumeKeepTogether>
                ))}
            </>

            <ResumeSeparator/>
            <ResumeVerticalSpace size={'large'}/>

            <ResumeCapabilities data={data.capabilities}/>

            <ResumeTools data={data.tools}/>

            <ResumeSkills data={data.skills} />
        </article>
    );
}
