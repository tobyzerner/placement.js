# Placement.js

> A tiny library for positioning overlays. Useful for tooltips, popovers etc.

![Size](https://img.shields.io/bundlephobia/minzip/placement.js)

[**Demo**](https://tobyzerner.github.io/placement.js/demo.html)

**Why?** Positioning UI overlays like popovers and tooltips can be challenging. If you position them with CSS, then at some stage you are likely to run into problems with z-indices, parent overflows, or content going off the edge of the screen. JavaScript to the rescue!

**Placement.js** addresses a single use-case: positioning an overlay to one side of an anchor element, optimizing the placement depending on the size of the overlay:

* If the overlay is too big, it may **flip** to the other side if there is more room available.
* The dimensions of the overlay will be **capped** so that it will never go off-screen.

Small filesize is a priority for Placement.js so that it can be included in web components. For a more powerful, configurable library, check out [Popper.js](https://popper.js.org).

## Installation

```sh
npm install placement.js --save
```

## Usage

```ts
import { place } from 'placement.js';

place(
    anchor: HTMLElement,
    overlay: HTMLElement,
    options?: Options
);

type Options = {
    placement?: Placement // defaults to 'bottom'
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
```

Check out the [demo](https://tobyzerner.github.io/placement.js/demo.html) to see it in action.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](LICENSE)
