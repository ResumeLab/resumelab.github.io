import {cn} from "../../../common/cn.ts";

import './resume-text.css';

type ResumeTextProps = {
    children: any;
    variant?: 'title' | 'meta' | 'section' | 'role' | 'info' | 'body';
};

export function ResumeText({children, variant = 'body'}: ResumeTextProps) {
    return (
        <span className={cn('resume-text', 'resume-text--' + variant)}>
            {children}
        </span>
    );
}