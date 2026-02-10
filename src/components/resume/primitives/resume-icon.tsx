import type {CSSProperties} from 'react';
import {cn} from "../../../common/cn.ts";

import './resume-icon.css';

type ResumeIconProps = {
    link: string;
    variant?: 'meta';
};

export function ResumeIcon({link, variant = 'meta'}: ResumeIconProps) {
    const style = {'--resume-icon': `url("${link}")`} as CSSProperties;

    return (
        <span className={cn('resume-icon', `resume-icon--${variant}`)} style={style}/>
    );
}