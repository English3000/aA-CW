/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const DOMNodeCollection = __webpack_require__(1);

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

/***/ }),
/* 1 */
/***/ (function(module, exports) {

class DOMNodeCollection {
  constructor(array) {
    this.domArray = array;
  }
  
  html(string) {
    if (string === undefined) {
      return this.domArray[0].innerHTML;
    } else {
      this.domArray.forEach(el => {
        el.innerHTML = string;
      });
      return this;
    }
  }
  
  empty() {
    return this.html("");
  }
  
  append(arg) {
    let elements;
    if (arg instanceof DOMNodeCollection) {
      elements = arg;
    } else if(arg instanceof HTMLElement) {
      elements = $l(arg);
    } else if (typeof arg === 'string') {
      this.domArray.forEach(thisNode => {
        thisNode.innerHTML += arg;
      });
      return this;
    } else {
      console.log("wrong arg type");
      return arg
    }
    const inners = [];
    elements.domArray.forEach(element => {
      inners.push(element.outerHTML);
    });
    
    for (let i = 0; i < inners.length; i++) {
      this.domArray.forEach((thisNode)=>{
        thisNode.innerHTML += inners[i];
      });
    }
    return this;
  }
  
  attr(property, value) {
    if (value === undefined) {
      return this.domArray[0].getAttribute(property);
    }
    this.domArray.forEach((thisNode)=>{
      thisNode.setAttribute(property, value);
    });
    return this;
  }
  
  addClass(className) {
    this.domArray.forEach(thisNode => {
      thisNode.classList.add(className);
    });
    return this;
  }
  
  removeClass(className) {
    this.domArray.forEach(thisNode => {
      thisNode.classList.remove(className);
    });
    return this;
  }
  
  children() {
    let kids = [];
    
    this.domArray.forEach(el => {
      kids = kids.concat(Array.from(el.children));
    });
    
    return new DOMNodeCollection(kids);
  }
  
  parent() {
    let parents = [];
    
    this.domArray.forEach(el => {
      if (!parents.includes(el.parentNode)) {
        parents.push(el.parentNode);
      }
    });
    
    return new DOMNodeCollection(parents);
  }

  find(selector) {
    let selected = [];
    this.domArray.forEach(el => {
      selected = selected.concat(el.querySelectorAll(selector));
    });
    return new DOMNodeCollection(selected);
  }
  
  remove() {
    const copy = this.domArray.slice();
    
    this.domArray.forEach(el => {
      el.outerHTML = '';
    });
    
    this.domArray = [];
    return copy;
  }
  
  on(eventName, callback) {
    // this.parents().addEventListener(eventName, callback);
    this.domArray.forEach((el) => {
      el.addEventListener(eventName, callback);
    });
  }
  
  off(eventName, callback) {
    // this.parents().removeEventListener(eventName, callback);
    this.domArray.forEach((el) => {
      el.removeEventListener(eventName, callback);
    });
  }
}

module.exports = DOMNodeCollection;

/***/ })
/******/ ]);