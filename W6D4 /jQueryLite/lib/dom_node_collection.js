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