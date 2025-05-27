'use client';
import { forwardRef } from 'react';
import useErrorBoundary from "use-error-boundary";
import classnames from 'clsx';

interface Props {
    direction: "row" | "col";
    children?: React.ReactNode;
    className?: string;
    onClick?: () => any;
    style?: React.CSSProperties;
    hidden?: boolean;
}

const ErrorBoundaryDiv = forwardRef<HTMLDivElement, Props>((props, ref) => {
    const { ErrorBoundary, didCatch, error } = useErrorBoundary();

    const fallbackClass = classnames('boc-flex', props.direction, 'boundary-error');
    const className = classnames(
        'boc-flex',
        props.direction,
        props.className,
        { hidden: props.hidden }
    );

    return (
        <ErrorBoundary>
            {didCatch ? (
                <div className={fallbackClass}>
                    {String(error)}
                </div>
            ) : (
                <div
                    className={className}
                    onClick={props.onClick}
                    ref={ref}
                    style={props.style}
                >
                    {props.children}
                </div>
            )}
        </ErrorBoundary>
    );
});
ErrorBoundaryDiv.displayName = 'ErrorBoundaryDiv';
export default ErrorBoundaryDiv;