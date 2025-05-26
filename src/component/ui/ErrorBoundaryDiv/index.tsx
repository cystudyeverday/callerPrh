import './index.styl';
import { forwardRef } from 'react';
import useErrorBoundary from "use-error-boundary";
import { classnames } from 'helpers';

interface Props {
    direction: "row" | "col";
    children?: any;
    className?: string;
    onClick?: () => any;
    style?: any;
    hidden?: boolean;
}

const ErrorBoundaryDiv = forwardRef((props: Props, ref: any) => {
    const { ErrorBoundary, didCatch, error } = useErrorBoundary();

    const fallbackClass = classnames(`boc-flex`, props.direction, {
        'boundary-error': didCatch,
    });

    const className = classnames(`boc-flex`, props.direction, {
        [props.className as string]: typeof props.className === 'string',
        hidden: props.hidden === true,
    });

    const fallback = (
        <div className={fallbackClass}>
            {String(error)}
        </div>
    );

    return (<>
        {didCatch ? fallback : (
            <ErrorBoundary>
                <div
                    className={className}
                    onClick={props.onClick}
                    ref={ref}
                    style={props.style}
                >
                    {props.children}
                </div>
            </ErrorBoundary>
        )}
    </>);
});

export default ErrorBoundaryDiv;
