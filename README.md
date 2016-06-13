# onrender [![NPM version](https://img.shields.io/npm/v/onrender.svg?style=flat)](https://www.npmjs.com/package/onrender) [![NPM downloads](https://img.shields.io/npm/dm/onrender.svg?style=flat)](https://npmjs.org/package/onrender)


Waits for an element to finish rendering and then runs the callback function. For situations when `setTimeout(0)` or `requestAnimationFrame` doesn't quite cut it.
In most cases just forcing a reflow on the element is enough. This library takes care of both cases.

Useful for running code that requires the element to be laid out or chaining style changes such as toggling the style from `display: none` to `display: block`. Use cases include overlays of all sorts you don't wish to keep in the memory such as modals, fullscreen navigations and other layout-intensive stuff.

Implemented using `requestAnimationFrame` and `getBoundingClientRect` and is *very* performant (under 0.2ms per frame on a 2014 MBP, not taking into consideration Chrome's 2-4ms render time).

## Installation
Use it as a node module:
```bash
npm install --save onrender
```
or just include it as a standalone script:
```html
<script src="onrender.js"></script>
```

## Usage
```javascript
function needsLayout () {
  /* stuff that needs the element to be rendered */
}

const elementToWatch =  $('.element') /* or */ document.querySelector('.element')

onRender(elementToWatch, needsLayout)
```


**Pro-tips:**
 * Best used while there are no other long layout / paint operations running. But why would you have multiple long running layout / paint operations on the first place? ಠ_ಠ
 * Don't use while scrolling, since it will invalidate the layout and force `getBoundingClientRect` to [cause layout thrashing](https://gist.github.com/paulirish/5d52fb081b3570c81e3a). Otherwise subsequent reflow costs are free.
 * Works wonders if you have to toggle the `display` attribute before firing any transitions on the element.
