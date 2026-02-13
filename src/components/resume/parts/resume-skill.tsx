import type { SkillData } from "../../../contexts/resume-types.tsx";
import {ResumeKeepTogether} from "../primitives/resume-keep-together.tsx";
import {ResumeSectionHeader} from "./resume-section-header.tsx";
import {ResumeSkillLine} from "./resume-skill-line.tsx";

type ResumeSkillsProps = {
    data: SkillData[];
};

export function ResumeSkills({ data }: ResumeSkillsProps) {
    if(!data?.length){
        return null;
    }

    return (
        <>
            <ResumeKeepTogether>
                <ResumeSectionHeader>SKILLS</ResumeSectionHeader>
                {data.map((data, index) => (
                    <ResumeSkillLine data={data} key={index}/>
                ))}
            </ResumeKeepTogether>
        </>
    );
}