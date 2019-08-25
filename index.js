function isPositionFixed(el) {
  do {
    if (getComputedStyle(el).position === 'fixed') {
      return true;
    }

    el = el.parentNode;
  } while (el.parentNode);

  return false;
}

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

export default function(anchor, popup, side = 'bottom', align = 'center') {
  const fixed = isPositionFixed(anchor);
  const anchorRect = anchor.getBoundingClientRect();
  const popupStyle = getComputedStyle(popup);

  const primary = {};
  const secondary = {};

  for (const key in NAMES) {
    primary[key] = NAMES[key][side === 'top' || side === 'bottom' ? 0 : 1];
    secondary[key] = NAMES[key][side === 'top' || side === 'bottom' ? 1 : 0];
  }

  popup.style.position = fixed ? 'fixed' : 'absolute';

  // Calculate the available room on either side of the anchor element. If
  // the size of the popup is more than is available on the given side, then we
  // will switch to the side with more room.
  popup.style.maxWidth = '';
  popup.style.maxHeight = '';

  const roomBefore = anchorRect[primary.before];
  const roomAfter = document.documentElement[primary.clientSize] - anchorRect[primary.after];

  if ((side === primary.before && popup[primary.offsetSize] > roomBefore)
    || (side === primary.after && popup[primary.offsetSize] > roomAfter)) {
    side = roomBefore > roomAfter ? primary.before : primary.after;
  }

  // If the size of the popup exceeds the room available on this side, then
  // we will give the popup an explicit size so that it doesn't go off-screen.
  const margin = parseInt(popupStyle[primary.marginBefore]) + parseInt(popupStyle[primary.marginAfter]);
  const maxSize = (side === primary.before ? roomBefore : roomAfter) - margin;

  if (popup[primary.offsetSize] > maxSize) {
    popup.style[primary.maxSize] = maxSize + 'px';
  }

  // Set the position of the popup element along the primary axis using the
  // anchor's bounding rect. If we are working in the context of position:
  // absolute, then we will need to add the window's scroll position as well.
  const scrollOffset = fixed ? 0 : window[primary.scrollOffset];

  if (side === primary.before) { // top or left
    popup.style[primary.before] = 'auto';
    popup.style[primary.after] = (-scrollOffset + document.documentElement[primary.clientSize] - anchorRect[primary.before]) + 'px';
  } else { // bottom or right
    popup.style[primary.before] = (scrollOffset + anchorRect[primary.after]) + 'px';
    popup.style[primary.after] = 'auto';
  }

  // Set the position of the popup element along the secondary axis.
  const secondaryMargin = parseInt(popupStyle[secondary.marginAfter]) + parseInt(popupStyle[secondary.marginBefore]);
  const secondaryMaxSize = document.documentElement[secondary.clientSize] - secondaryMargin;

  if (popup[secondary.offsetSize] > secondaryMaxSize) {
    popup.style[secondary.maxSize] = secondaryMaxSize + 'px';
  }

  const secondaryScrollOffset = fixed ? 0 : window[secondary.scrollOffset];

  const boundPos = pos => {
    return Math.max(
        0,
        Math.min(
            pos,
            document.documentElement[secondary.clientSize] - popup[secondary.offsetSize] - secondaryMargin
        )
    );
  };

  switch (align) {
    case 'start':
      popup.style[secondary.before] = (secondaryScrollOffset + boundPos(anchorRect[secondary.before])) + 'px';
      popup.style[secondary.after] = 'auto';
      break;

    case 'end':
      popup.style[secondary.before] = 'auto';
      popup.style[secondary.after] = (secondaryScrollOffset + boundPos(document.documentElement[secondary.clientSize] - anchorRect[secondary.after])) + 'px';
      break;

    default: // center
      popup.style[secondary.before] = (secondaryScrollOffset + boundPos(anchorRect[secondary.before] + anchor[secondary.offsetSize] / 2 - popup[secondary.offsetSize] / 2)) + 'px';
      popup.style[secondary.after] = 'auto';
  }

  popup.dataset.side = side;
  popup.dataset.align = align;
}
