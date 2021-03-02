type Options = {
    placement?: Placement
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

const PROPS = {
    x: { start: 'left', Start: 'Left', end: 'right', End: 'Right', size: 'width', Size: 'Width' },
    y: { start: 'top', Start: 'Top', end: 'bottom', End: 'Bottom', size: 'height', Size: 'Height' }
};

export function place(
    anchor: HTMLElement,
    overlay: HTMLElement,
    options: Options
) {
    const placement = options.placement || 'bottom';
    let [side, align] = placement.split('-');

    const mainAxis = ['top', 'bottom'].includes(side) ? 'y' : 'x';
    const altAxis = mainAxis === 'y' ? 'x' : 'y';
    const mainProps = PROPS[mainAxis];
    const altProps = PROPS[altAxis];

    // Reset the position and uncap the maximum size of the popup so that we
    // can reliably determine if the popup is "too big" below.
    const overlayStyle = overlay.style;
    overlayStyle.position = 'absolute';
    overlayStyle.maxWidth = overlayStyle.maxHeight = '';

    // Get the rectangles defining the anchor element and the overflow boundary.
    // To ensure a reliable calculation, this comes after resetting the overlay
    // position to absolute.
    const anchorRect = anchor.getBoundingClientRect();
    const boundRect = scrollParent(overlay)?.getBoundingClientRect() || createRect(0, 0, window.innerWidth, window.innerHeight);

    // Constrain the maximum size of the popup along the alignment axis.
    overlayStyle['max' + altProps.Size] = boundRect[altProps.size] + 'px';

    // Calculate the available room on either side of the anchor element. If
    // the size of the popup is more than is available on the given side, then
    // we will flip it to the side with more room.
    const room = {
        [mainProps.start]: anchorRect[mainProps.start] - boundRect[mainProps.start],
        [mainProps.end]: boundRect[mainProps.end] - anchorRect[mainProps.end]
    };

    if (overlay['offset' + mainProps.Size] > room[side]) {
        side = room[mainProps.start] > room[mainProps.end] ? mainProps.start : mainProps.end;
    }

    // Constrain the maximum size of the popup along the main axis.
    overlayStyle['max' + mainProps.Size] = room[side] + 'px';

    let offset;
    const offsetParent = overlay.offsetParent;
    if (offsetParent && offsetParent !== document.body) {
        const parentRect = offsetParent.getBoundingClientRect();
        const parentStyle = getComputedStyle(offsetParent);
        offset = axis => parentRect[PROPS[axis].start] + parseInt(parentStyle['border' + PROPS[axis].Start + 'Width']);
    }

    const pos = (pos, axis) => {
        return Math.max(
            boundRect[PROPS[axis].start],
            Math.min(
                pos,
                boundRect[PROPS[axis].end] - overlay['offset' + PROPS[axis].Size]
            )
        ) - (offset ? offset(axis) : 0);
    };

    const dde = document.documentElement;

    // Set the position of the popup along the main axis.
    if (side === mainProps.start) { // top or left
        overlayStyle[mainProps.start] = 'auto';
        overlayStyle[mainProps.end] = pos(dde['client' + mainProps.Size] - anchorRect[mainProps.start], mainAxis) + 'px';
    } else { // bottom or right
        overlayStyle[mainProps.start] = pos(anchorRect[mainProps.end], mainAxis) + 'px';
        overlayStyle[mainProps.end] = 'auto';
    }

    // Set the position of the popup along the secondary axis.
    if (align === 'end') {
        overlayStyle[altProps.start] = 'auto';
        overlayStyle[altProps.end] = pos(dde['client' + altProps.Size] - anchorRect[altProps.end], altAxis) + 'px';
    } else {
        let offset = 0;
        if (align !== 'start') {
            const anchorSize = anchorRect[altProps.size];
            offset = anchorSize / 2 - overlay['offset' + altProps.Size] / 2;
        }

        overlayStyle[altProps.start] = pos(anchorRect[altProps.start] + offset, altAxis) + 'px';
        overlayStyle[altProps.end] = 'auto';
    }

    overlay.dataset.placement = side + (align ? '-' + align : '');
}

function createRect(top, left, width, height): ClientRect {
    return {
        top,
        left,
        right: width,
        bottom: height,
        width,
        height
    };
}

function scrollParent(node) {
    while ((node = node.parentNode) && node instanceof Element) {
        const overflow = getComputedStyle(node).overflow;
        if (['auto', 'scroll'].includes(overflow)) {
            return node;
        }
    }
}
