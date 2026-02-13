import './resume-document.css';
import type {
    PersonResumeViewData,
    ResumeViewData,
    TextResumeViewData,
    SectionResumeViewData,
    ExperienceResumeViewData,
    LabelResumeViewData,
    BulletResumeViewData
} from "../../contexts/resume-types.tsx";
import {PersonResumeView} from "./view/person-resume-view.tsx";
import {TextResumeView} from "./view/text-resume-view.tsx";
import {SectionResumeView} from "./view/section-resume-view.tsx";
import {ExperienceResumeView} from "./view/experience-resume-view.tsx";
import {LabelResumeView} from "./view/label-resume-view.tsx";
import {BulletResumeView} from "./view/bullet-resume-view.tsx";
import React from "react";
import {ResumeSeparator} from "./primitives/resume-separator.tsx";
import {ResumeVerticalSpace} from "./primitives/resume-vertical-space.tsx";

function renderView(viewData: ResumeViewData, index: number) {
    if (viewData.type === "section") {
        const title = (viewData as SectionResumeViewData).title;
        const items = (viewData as SectionResumeViewData).items;

        return (
            <SectionResumeView title={title} key={index}>
                {items.map((viewData, index) =>
                    <React.Fragment key={index}>
                        {index > 0 && (
                            <ResumeVerticalSpace size={"medium"} />
                        )}
                        {renderView(viewData, index)}
                    </React.Fragment>
                )}
            </SectionResumeView>
        );
    }

    if (viewData.type === "person") {
        return <PersonResumeView data={viewData as PersonResumeViewData} key={index}/>;
    }

    if (viewData.type === "text") {
        return <TextResumeView data={viewData as TextResumeViewData} key={index}/>;
    }

    if (viewData.type === "experience") {
        return <ExperienceResumeView data={viewData as ExperienceResumeViewData} key={index}/>;
    }

    if (viewData.type === "label") {
        return <LabelResumeView data={viewData as LabelResumeViewData} key={index}/>;
    }

    if (viewData.type === "bullet") {
        return <BulletResumeView data={viewData as BulletResumeViewData} key={index}/>;
    }

    return undefined;
}

export function ResumeDocument({data}: { data: ResumeViewData[] }) {
    return (
        <article className="resume-doc">
            {data.map((viewData, index) => (
                <React.Fragment key={index}>
                    {index > 0 && (
                        <>
                            <ResumeVerticalSpace size={"medium"} />
                            <ResumeSeparator />
                            <ResumeVerticalSpace size={"medium"} />
                        </>
                    )}
                    {renderView(viewData, index)}
                </React.Fragment>
            ))}
        </article>
    );
}
