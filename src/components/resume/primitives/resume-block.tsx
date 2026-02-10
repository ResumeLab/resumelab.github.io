import './resume-block.css';
import {cn} from "../../../common/cn.ts";
import * as React from "react";

type ResumeBlockProps = {
    children: any;
    align?: 'start' | 'center' | 'space';
};

export function ResumeBlock({children, align = 'start'}: ResumeBlockProps) {
    const classes = cn('resume-block', 'resume-block--' + align);

    if (align !== 'space') {
        return <div className={classes}>{children}</div>;
    } else {
        const elements = React.Children.toArray(children);
        const left = elements[0] ?? null;
        const right = elements[1] ?? null;

        return <div className={classes}>
            {left}
            {right}
        </div>;
    }
}