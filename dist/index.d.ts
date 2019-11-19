declare type Side = 'top' | 'bottom' | 'left' | 'right';
declare type Align = 'start' | 'center' | 'end';
declare type Options = {
    bound?: HTMLElement | DOMRect | ClientRect;
};
export default function (overlay: HTMLElement, anchor: HTMLElement | DOMRect | ClientRect, side?: Side, align?: Align, options?: Options): void;
export {};
