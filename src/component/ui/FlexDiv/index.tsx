import './index.css';
import { forwardRef } from 'react';
import ErrorBoundaryDiv from '@/component/ui/ErrorBoundaryDiv';
import { clsx } from 'clsx';

interface Props {
    direction: "row" | "col";
    children?: any;
    className?: string;
    onClick?: () => any;
    errorBoundary?: boolean;
    style?: any;
    hidden?: boolean;
}

const FlexDiv = forwardRef((props: Props, ref: any) => {
    const className = clsx(`flex-div`, props.direction, {
        [props.className as string]: typeof props.className === 'string',
        hidden: props.hidden,
    });

    if (props.errorBoundary === true) {
        return (
            <ErrorBoundaryDiv
                className={props.className}
                onClick={props.onClick}
                direction={props.direction}
                ref={ref}
                style={props.style}
                hidden={props.hidden}
            >
                {props.children}
            </ErrorBoundaryDiv>
        );
    }

    return (
        <div
            className={className}
            onClick={props.onClick}
            ref={ref}
        >
            {props.children}
        </div>
    );
});
FlexDiv.displayName = "FlexDiv";


export default FlexDiv;
