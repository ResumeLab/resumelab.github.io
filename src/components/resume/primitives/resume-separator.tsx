import {cn} from "../../../common/cn.ts";

import './resume-separator.css';

type ResumeSeparatorProps = {
    tone?: 'light' | 'dark';
    weight?: 'thin' | 'bold';
};

export function ResumeSeparator({tone = 'light', weight = 'thin'}: ResumeSeparatorProps) {
    const classes = cn(
        'resume-separator',
        `resume-separator--${tone}`,
        `resume-separator--${weight}`
    );

    return <div className={classes}/>;
}