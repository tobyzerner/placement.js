export type Options = {
    placement?: Placement,
    flip?: boolean,
    cap?: boolean,
};

const PROPS = {
    x: { start: 'left', Start: 'Left', end: 'right', End: 'Right', size: 'width', Size: 'Width' },
    y: { start: 'top', Start: 'Top', end: 'bottom', End: 'Bottom', size: 'height', Size: 'Height' }
};

type Placement =
    | 'top'
    | 'top-start'
    | 'top-end'
    | 'bottom'
    | 'bottom-start'
    | 'bottom-end'
    | 'right'
    | 'right-start'
    | 'right-end'
    | 'left'
    | 'left-start'
    | 'left-end';

type Axis = 'x' | 'y';

export default function(
    anchor: HTMLElement,
    overlay: HTMLElement,
    options: Options
) {
    // Reset
    const overlayStyle = overlay.style;
    Object.assign(overlayStyle, {
        position: 'absolute',
        maxWidth: '',
        maxHeight: ''
    });

    let [side = 'bottom', align = 'center'] = options.placement.split('-');
    const axisSide = ['top', 'bottom'].includes(side) ? 'y' : 'x';
    let oppositeSide = side === PROPS[axisSide].start ? PROPS[axisSide].end : PROPS[axisSide].start;
    const axisAlign = axisSide === 'x' ? 'y' : 'x';
    const anchorRect = anchor.getBoundingClientRect();
    const boundRect = scrollParent(overlay)?.getBoundingClientRect() || new DOMRect(0, 0, window.innerWidth, window.innerHeight);
    const offsetParent = overlay.offsetParent || document.body;
    const offsetParentRect = offsetParent === document.body ? new DOMRect(0, -pageYOffset, window.innerWidth, window.innerHeight) : offsetParent.getBoundingClientRect();
    const offsetParentComputed = getComputedStyle(offsetParent);
    const overlayComputed = getComputedStyle(overlay);

    // Flip
    if (options.flip || typeof options.flip === 'undefined') {
        // Calculate the available room on either side of the anchor element. If
        // the size of the popup is more than is available on the given side, then
        // we will flip it to the side with more room.
        const room = side => Math.abs(anchorRect[side] - boundRect[side]);
        const roomThisSide = room(side);
        const overlaySize = overlay['offset' + PROPS[axisSide].Size];

        if (overlaySize > roomThisSide && room(oppositeSide) > roomThisSide) {
            [side, oppositeSide] = [oppositeSide, side];
        }
    }

    // Data attribute
    overlay.dataset.placement = `${side}-${align}`;

    // Cap
    if (options.cap || typeof options.cap === 'undefined') {
        const cap = (axis: Axis, room: number) => {
            const intrinsicMaxSize = overlayComputed['max' + PROPS[axis].Size];
            room -= parseInt(overlayComputed['margin' + PROPS[axis].Start]) + parseInt(overlayComputed['margin' + PROPS[axis].End]);
            if (intrinsicMaxSize === 'none' || room < parseInt(intrinsicMaxSize)) {
                overlay.style['max' + PROPS[axis].Size] = room + 'px';
            }
        };

        cap(axisSide, Math.abs(boundRect[side] - anchorRect[side]));
        cap(axisAlign, boundRect[PROPS[axisAlign].size]);
    }

    // Side
    Object.assign(overlayStyle, {
        [side]: 'auto',
        [oppositeSide]: (
            (side === PROPS[axisSide].start
                ? offsetParentRect[PROPS[axisSide].end] - anchorRect[PROPS[axisSide].start]
                : anchorRect[PROPS[axisSide].end] - offsetParentRect[PROPS[axisSide].start])
            - parseInt(offsetParentComputed['border' + PROPS[axisSide].Start + 'Width'])
        ) + 'px'
    });

    // Align
    const fromAlign = align === 'end' ? 'end' : 'start';
    const oppositeAlign = align === 'end' ? 'start' : 'end';
    const anchorAlign = anchorRect[axisAlign] - offsetParentRect[axisAlign];
    const anchorSize = anchorRect[PROPS[axisAlign].size];
    const overlaySize = overlay['offset' + PROPS[axisAlign].Size];
    const factor = align === 'end' ? -1 : 1;
    Object.assign(overlayStyle, {
        [PROPS[axisAlign][oppositeAlign]]: 'auto',
        [PROPS[axisAlign][fromAlign]]: (
            Math.max(
                factor * (boundRect[PROPS[axisAlign][fromAlign]] - offsetParentRect[PROPS[axisAlign][fromAlign]]),
                Math.min(
                    align === 'end'
                        ? offsetParentRect[PROPS[axisAlign].size] - anchorAlign - anchorSize
                        : anchorAlign + (align !== 'start' ? anchorSize / 2 - overlaySize / 2 : 0),
                    factor * (boundRect[PROPS[axisAlign][oppositeAlign]] - offsetParentRect[PROPS[axisAlign][fromAlign]]) - overlaySize
                )
            )
            - parseInt(offsetParentComputed['border' + PROPS[axisAlign].Start + 'Width'])
        ) + 'px'
    });
}

function scrollParent(node) {
    while ((node = node.parentNode) && node instanceof Element) {
        const overflow = getComputedStyle(node).overflow;
        if (['auto', 'scroll'].includes(overflow)) {
            return node;
        }
    }
}
