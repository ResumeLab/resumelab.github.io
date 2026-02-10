import type {ReactNode} from 'react';
import './paper-view-wrapper.css';

export function PaperViewWrapper({ children }: { children: ReactNode }) {
    return <div className="paper-view">{children}</div>;
}