'use strict';

// Takes a callback which is fired when the element is rendered
function onRender(element, callback) {

  // Force a layout which returns a promise
  Promise.resolve(element.getBoundingClientRect())
  .then(function() {
    // needs 2 frames to optimize properly
    requestAnimationFrame(function() {
      requestAnimationFrame(function() {
        callback();
      });
    });
  });
}

// Check if used as a standalone script or a node module
if (typeof exports === 'object') {
  module.exports = onRender;
} else {
  window.onRender = onRender;
}
