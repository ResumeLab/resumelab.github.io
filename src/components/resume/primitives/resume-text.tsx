import {cn} from "../../../common/cn.ts";

import './resume-text.css';

export type ResumeTextProps = {
    children: any;
    variant?: 'title' | 'meta' | 'section' | 'role' | 'info' | 'body';
};

export function ResumeText({children, variant = 'body'}: ResumeTextProps) {
    const className = cn('resume-text', 'resume-text--' + variant);

    return (
        <span className={className}>
            {children}
        </span>
    );
}

export function ResumeMultilineText({children, variant = 'body'}: ResumeTextProps) {
    const lines = children.split('\n');

    return lines.map((line: string, index: any) => (
        <div>
            <ResumeText variant={variant} key={index}>
                {line === '' ? '\u00A0' : line}
            </ResumeText>
        </div>
    ));
}