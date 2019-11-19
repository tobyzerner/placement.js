declare type Side = 'top' | 'bottom' | 'left' | 'right';
declare type Align = 'start' | 'center' | 'end';
declare type Coordinates = {
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
};
declare type Options = {
    bound?: Element | Range | Coordinates;
};
export default function (overlay: HTMLElement, anchor: Element | Range | Coordinates, side?: Side, align?: Align, options?: Options): void;
export {};
