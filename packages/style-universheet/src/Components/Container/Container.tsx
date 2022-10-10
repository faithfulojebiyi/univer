import { BaseContainerProps, ComponentChildren, ContainerComponent, forwardRef, JSXComponent, ForwardedRef } from '@univer/base-component';

type IProps = {
    children?: ComponentChildren;
    style?: {};
    className?: string;
    onClick?: (e: MouseEvent) => void;
};

export const Container = forwardRef((props: IProps, ref: ForwardedRef<HTMLDivElement>) => {
    const { children, style, className, onClick } = props;

    return (
        <div ref={ref} style={style} className={className} onClick={onClick}>
            {children}
        </div>
    );
});

export class UniverContainer implements ContainerComponent {
    render(): JSXComponent<BaseContainerProps> {
        return Container;
    }
}
