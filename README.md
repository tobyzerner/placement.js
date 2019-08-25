# Placement.js

A tiny library for positioning elements next to other elements. Useful for drop-downs, tooltips, and popovers.

![Size](https://badge-size.now.sh/https://unpkg.com/placement.js/index.iife.js?compression=gzip)

[**Demo**](https://tobyzerner.github.io/placement.js/demo.html)

**Why not [Popper.js](https://github.com/FezVrasta/popper.js)?** Because 7kb min+gzip just to position a drop-down or tooltip is too much. Popper.js is powerful and addresses a lot of use-cases, but as a result it is relatively large and can be confusing to configure. Most of the time you just need something simple.

**Placement.js** addresses one use-case: positioning an element on one side of another element, optimizing the placement depending on the size of the popup:

* If the popup is too big, it may swap to the other side if there is more room available.
* The position and dimensions of the popup will be capped so that it will never go off-screen.

## Installation

```sh
npm install placement.js --save
```

## Usage

```js
import placement from 'placement.js';

placement(
  anchor, // The HTMLElement to position the popup next to
  popup,  // The HTMLElement of the popup
  side,   // 'top' | 'bottom' | 'left' | 'right'
  align   // 'start' | 'center' | 'end'
);
```

Check out the [demo](https://tobyzerner.github.io/placement.js/demo.html) to see what these parameters do.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://github.com/tobyzerner/placement.js/blob/master/LICENSE)
