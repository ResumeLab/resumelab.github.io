import type {ReactNode} from 'react';
import './resume-keep-together.css';

type ResumeKeepTogetherProps = { children: ReactNode; };

export function ResumeKeepTogether({children}: ResumeKeepTogetherProps) {
    return <div className='resume-keep-together'>{children}</div>;
}