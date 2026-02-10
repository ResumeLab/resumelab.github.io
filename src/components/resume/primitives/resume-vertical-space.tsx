import {cn} from "../../../common/cn.ts";

import './resume-vertical-space.css';

type ResumeVerticalSpaceProps = {
    size?: 'small' | 'medium' | 'large';
};

export function ResumeVerticalSpace({size = 'medium'}: ResumeVerticalSpaceProps) {
    return (
        <div
            className={cn('resume-vertical-space', `resume-vertical-space--${size}`)}
            aria-hidden="true"
        />
    );
}