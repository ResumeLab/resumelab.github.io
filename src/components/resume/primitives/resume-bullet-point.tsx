import './resume-bullet-point.css';

type ResumeBulletPointProps = {
    children: any;
};

export function ResumeBulletPoint({ children }: ResumeBulletPointProps) {
    return (
        <div className='resume-bullet-point'>
      <span className="resume-bullet-point__marker" aria-hidden="true">
        <span className="resume-bullet-point__dot" />
      </span>

            <div className="resume-bullet-point__content">{children}</div>
        </div>
    );
}