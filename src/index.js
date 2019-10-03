const NAMES = {
  size: ['height', 'width'],
  clientSize: ['clientHeight', 'clientWidth'],
  offsetSize: ['offsetHeight', 'offsetWidth'],
  maxSize: ['maxHeight', 'maxWidth'],
  before: ['top', 'left'],
  marginBefore: ['marginTop', 'marginLeft'],
  after: ['bottom', 'right'],
  marginAfter: ['marginBottom', 'marginRight'],
  scrollOffset: ['pageYOffset', 'pageXOffset'],
};

export default function(anchorRect, popup, side = 'bottom', align = 'center', options = {}) {
  const fixed = !!options.fixed;

  if ('getBoundingClientRect' in anchorRect) {
    anchorRect = anchorRect.getBoundingClientRect().toJSON();
  }

  anchorRect = Object.assign({
    top: anchorRect.bottom,
    bottom: anchorRect.top,
    left: anchorRect.right,
    right: anchorRect.left,
  }, anchorRect);

  const boundRect = {
    top: 0,
    left: 0,
    bottom: window.innerHeight,
    right: window.innerWidth
  };

  if (options.bound) {
    if (options.bound.getBoundingClientRect) {
      options.bound = options.bound.getBoundingClientRect();
    }
    Object.assign(boundRect, options.bound);
  }

  const popupStyle = getComputedStyle(popup);

  const primary = {};
  const secondary = {};

  for (const key in NAMES) {
    primary[key] = NAMES[key][side === 'top' || side === 'bottom' ? 0 : 1];
    secondary[key] = NAMES[key][side === 'top' || side === 'bottom' ? 1 : 0];
  }

  popup.style.position = fixed ? 'fixed' : 'absolute';
  popup.style.maxWidth = '';
  popup.style.maxHeight = '';

  // Constrain the maximum size of the popup along the secondary axis.
  const secondaryMarginBefore = parseInt(popupStyle[secondary.marginBefore]);
  const secondaryMarginAfter = parseInt(popupStyle[secondary.marginAfter]);
  const secondaryMargin = secondaryMarginBefore + secondaryMarginAfter;
  const secondaryMaxSize = boundRect[secondary.after] - boundRect[secondary.before] - secondaryMargin;

  if (popup[secondary.offsetSize] > secondaryMaxSize) {
    popup.style[secondary.maxSize] = secondaryMaxSize + 'px';
  }

  // Calculate the available room on either side of the anchor element. If
  // the size of the popup is more than is available on the given side, then we
  // will switch to the side with more room.
  const margin = parseInt(popupStyle[primary.marginBefore]) + parseInt(popupStyle[primary.marginAfter]);
  const roomBefore = anchorRect[primary.before] - boundRect[primary.before] - margin;
  const roomAfter = boundRect[primary.after] - anchorRect[primary.after] - margin;

  if ((side === primary.before && popup[primary.offsetSize] > roomBefore)
    || (side === primary.after && popup[primary.offsetSize] > roomAfter)) {
    side = roomBefore > roomAfter ? primary.before : primary.after;
  }

  // If the size of the popup exceeds the room available on this side, then
  // we will give the popup an explicit size so that it doesn't go off-screen.
  const maxSize = side === primary.before ? roomBefore : roomAfter;

  if (popup[primary.offsetSize] > maxSize) {
    popup.style[primary.maxSize] = maxSize + 'px';
  }

  // Set the position of the popup element along the primary axis using the
  // anchor's bounding rect. If we are working in the context of position:
  // absolute, then we will need to add the window's scroll position as well.
  const scrollOffset = fixed ? 0 : window[primary.scrollOffset];

  if (side === primary.before) { // top or left
    popup.style[primary.before] = (scrollOffset + anchorRect[primary.before] - popup[primary.offsetSize] - margin) + 'px';
    popup.style[primary.after] = 'auto';
  } else { // bottom or right
    popup.style[primary.before] = (scrollOffset + anchorRect[primary.after]) + 'px';
    popup.style[primary.after] = 'auto';
  }

  // Set the position of the popup element along the secondary axis.
  const secondaryScrollOffset = fixed ? 0 : window[secondary.scrollOffset];

  const boundPos = pos => {
    return Math.max(
      boundRect[secondary.before],
      Math.min(pos, boundRect[secondary.after] - popup[secondary.offsetSize] - secondaryMargin)
    );
  };

  switch (align) {
    case 'start':
      popup.style[secondary.before] = (secondaryScrollOffset + boundPos(anchorRect[secondary.before] - secondaryMarginBefore)) + 'px';
      popup.style[secondary.after] = 'auto';
      break;

    case 'end':
      popup.style[secondary.before] = 'auto';
      popup.style[secondary.after] = (secondaryScrollOffset + boundPos(document.documentElement[secondary.clientSize] - anchorRect[secondary.after] - secondaryMarginAfter)) + 'px';
      break;

    default: // center
      const anchorSize = anchorRect[secondary.after] - anchorRect[secondary.before];
      popup.style[secondary.before] = (secondaryScrollOffset + boundPos(anchorRect[secondary.before] + anchorSize / 2 - popup[secondary.offsetSize] / 2 - secondaryMarginBefore)) + 'px';
      popup.style[secondary.after] = 'auto';
  }

  popup.dataset.side = side;
  popup.dataset.align = align;
}
