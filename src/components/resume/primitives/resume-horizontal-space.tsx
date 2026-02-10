import './resume-horizontal-space.css';
import {cn} from "../../../common/cn.ts";

type ResumeHorizontalSpaceProps = {
    size?: 'small' | 'medium' | 'large';
};

export function ResumeHorizontalSpace({size = 'medium'}: ResumeHorizontalSpaceProps) {
    return (
        <span
            className={cn('resume-horizontal-space', `resume-horizontal-space--${size}`)}
            aria-hidden="true"
        />
    );
}