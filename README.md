# Placement.js

**A tiny library for positioning overlays. Useful for tooltips, popovers etc.**

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
import placement from 'placement.js';

placement(
    anchor: HTMLElement,
    overlay: HTMLElement,
    options?: Options
);

type Options = {
    // The overlay placement relative to the anchor. 
    // Defaults to 'bottom'.
    placement?: 
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
        | 'left-end',

    // Whether or not the overlay can flip to the other side if there's more
    // room available. Defaults to true.
    flip?: boolean,

    // Whether or not the overlay size should be capped to the available space.
    // Defaults to true.
    cap?: boolean,

    // Whether or not the overlay position should be bound to the scroll 
    // container. Defaults to true.
    bound?: boolean,
};
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](LICENSE)
