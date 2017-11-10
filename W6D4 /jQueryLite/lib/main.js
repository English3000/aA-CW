const DOMNodeCollection = require('./dom_node_collection.js');

// constructor functoin?
window.$l = function $l(arg) {
  // debugger;
  if (arg instanceof HTMLElement) {
    return new DOMNodeCollection([arg]);
  } else if (typeof arg === 'string') {
    const selected = document.querySelectorAll(arg);
    const selectedArr = Array.from(selected);
    return new DOMNodeCollection(selectedArr);
  } else if (arg instanceof Function) {
    if (document.readyState === "complete") {
      arg();
    } else {
      document.addEventListener("DOMContentLoaded", arg);
    }
  }

}

$l.extend = function(...args){
  return Object.assign(...args)
}