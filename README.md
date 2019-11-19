# Placement.js

A tiny library for positioning overlays. Useful for dropdowns, tooltips, popovers etc.

![Size](https://badge-size.now.sh/https://unpkg.com/placement.js/index.iife.js?compression=gzip)

[**Demo**](https://tobyzerner.github.io/placement.js/demo.html)

**Why?** Positioning UI overlays like dropdown menus and tooltips can be challenging. If you position them with CSS, then at some stage you are likely to run into problems with z-indices, parent overflows, or content going off the edge of the screen. Ideally overlays should be appended to the `<body>`, but then they need to be absolutely positioned, taking into account the viewport edges and content size.

**Why not [Popper.js](https://github.com/FezVrasta/popper.js)?** Because 7kb min+gzip just to position a tooltip is too much. Popper.js is powerful and addresses a lot of use-cases, but as a result it is relatively large and can be difficult to configure. When you just need something simple...

**Placement.js** addresses a single use-case: positioning an overlay to one side of an anchor element, optimizing the placement depending on the size of the overlay:

* If the overlay is too big, it may swap to the other side if there is more room available.
* The position and dimensions of the overlay will be capped so that it will never go off-screen.

## Installation

```sh
npm install placement.js --save
```

## Usage

```js
import placement from 'placement.js';

placement(
  overlay, // The HTMLElement of the overlay
  anchor,  // The HTMLElement or DOMRect to position the overlay next to
  side,    // 'top' | 'bottom' | 'left' | 'right'
  align,   // 'start' | 'center' | 'end'
  options
)

options = {
  bound // An HTMLElement or DOMRect to constrain the overlay position
}
```

Check out the [demo](https://tobyzerner.github.io/placement.js/demo.html) to see what these parameters do.

### FAQ

#### My overlay isn't being positioned correctly. What gives?

When calculating the overlay position, Placement.js does not account for positioned ancestors (ie. containing elements with a position of `relative`, `absolute`, or `fixed`), because it would add extra complexity. Instead, you should change your DOM so that your overlay is appended directly onto the document body.

#### How do I update the position of the popup when things move (anchor position, window scroll, resize, etc)?

Placement.js purposely doesn't handle this for you. You can consider the following options:

* **Prevent this from happening in the first place.** For example, while a dropdown menu is open, scrolling the entire page doesn't have much utility. So just disable scrolling when a menu is open by applying `overflow: hidden` to the body and then you won't need to worry about the position.
* **Hide the overlay.** For example, if you scroll the page while you've got your mouse over an element showing a tooltip, then you should just hide the tooltip rather than trying to update its position.
* **Listen for these events yourself** and call `placement` again with the same parameters. The [demo](https://tobyzerner.github.io/placement.js/demo.html) is an example of this.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](LICENSE)
