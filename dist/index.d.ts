export declare type Options = {
    placement?: Placement;
    flip?: boolean;
    cap?: boolean;
};
declare type Placement = 'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'right' | 'right-start' | 'right-end' | 'left' | 'left-start' | 'left-end';
export default function (anchor: HTMLElement, overlay: HTMLElement, options: Options): void;
export {};
