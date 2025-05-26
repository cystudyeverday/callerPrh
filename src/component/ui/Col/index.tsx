import FlexDiv from '@/component/ui/FlexDiv';

interface Props {
    children?: any;
    className?: string;
    onClick?: () => any;
    errorBoundary?: boolean;
    style?: any;
    hidden?: boolean;
}

const Col = (props: Props) => (
    <FlexDiv
        className={props.className}
        onClick={props.onClick}
        direction="col"
        errorBoundary={props.errorBoundary}
        style={props.style}
        hidden={props.hidden}
    >
        {props.children}
    </FlexDiv>
);

export default Col;
