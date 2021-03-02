declare type Options = {
    placement?: Placement;
};
declare type Placement = 'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'right' | 'right-start' | 'right-end' | 'left' | 'left-start' | 'left-end';
export declare function place(anchor: HTMLElement, overlay: HTMLElement, options: Options): void;
export {};
