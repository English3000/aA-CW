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

const Router = __webpack_require__(1);
const Inbox = __webpack_require__(2);
const Sent = __webpack_require__(4);
const Compose = __webpack_require__(5);

document.addEventListener('DOMContentLoaded', () => {
  const content = document.querySelector('.content');
  const pages = document.querySelectorAll('.sidebar-nav li');
  pages.forEach(el => {
    el.addEventListener('click', event => {
      const hash = event.currentTarget.innerText.toLowerCase();
      window.location.hash = hash;
    });
  });
  const routes = {
    inbox: new Inbox(),
    sent: new Sent(),
    compose: new Compose()
  };
  let router = new Router(content, routes);
  router.start();
  window.location.hash = 'inbox';
});



/***/ }),
/* 1 */
/***/ (function(module, exports) {


class Router {
  constructor(node, routes) {
    this.node = node;
    this.routes = routes;
  }
  
  start() {
    window.addEventListener("hashchange", this.render.bind(this));
    this.render()
  }
  
  render() {
    let component = this.activeRoute();
    this.node.innerHTML = "";
    if (component !== undefined) {
      // let pEl = document.createElement("p");
      // pEl.innerHTML = routeName;
      this.node.appendChild(component.render());
    }
  }
    
  activeRoute() {
    return this.routes[window.location.hash.slice(1)];
  }
}

module.exports = Router


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const MessageStore = __webpack_require__(3);

class Inbox {
  constructor() {
    
  }
  
  render() {
    const ul = document.createElement("ul");
    ul.className = 'messages';
    const emails = MessageStore.getInboxMessages();
    emails.forEach(email => {
      const node = this.renderMessage(email);
      ul.appendChild(node);
    });
    // ul.innerHTML = "An Inbox Message";
    return ul;
  }
  
  renderMessage(message) {
    const li = document.createElement("li");
    li.className = 'message';
    li.innerHTML = `
      <span class="from">${message.from}</span>
      <span class="subject">${message.subject}</span>
      <span class="body">${message.body}</span>
    `;
    return li;
  }
}

module.exports = Inbox;

/***/ }),
/* 3 */
/***/ (function(module, exports) {


class Message {
  constructor(from, to, subject, body) {
    this.from = from;
    this.to = to;
    this.subject = subject;
    this.body = body;
  }
}

let messageDraft = new Message();


let messages = {
  sent: [
    {to: "friend@mail.com", subject: "Check this out", body: "It's so cool"},
    {to: "person@mail.com", subject: "zzz", body: "so booring"}
  ],
  inbox: [
    {from: "grandma@mail.com", subject: "Fwd: Fwd: Fwd: Check this out", body: "yadda"},
    {from: "person@mail.com", subject: "Questionnaire", body: "Take this free quiz win $1000 dollars"} 
  ]
}

const MessageStore = {
  getInboxMessages() {
    return messages.inbox;
  },
  getSentMessages() {
    return messages.sent;
  },
  getMessageDraft() {
    return messageDraft;
  },
  updateDraftField(field, value){
    messageDraft[field] = value;
  },
  sendDraft(){
    messages.sent.push(messageDraft);
    messageDraft = new Message();
  }
};

module.exports = MessageStore;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

const MessageStore = __webpack_require__(3);

class Sent {
  constructor() {
    
  }
  
  render() {
    const ul = document.createElement("ul");
    ul.className = 'messages';
    const emails = MessageStore.getSentMessages();
    emails.forEach(email => {
      const node = this.renderMessage(email);
      ul.appendChild(node);
    });
    // ul.innerHTML = "An Inbox Message";
    return ul;
  }
  
  renderMessage(message) {
    const li = document.createElement("li");
    li.className = 'message';
    li.innerHTML = `
      <span class="to">${message.to}</span>
      <span class="subject">${message.subject}</span>
      <span class="body">${message.body}</span>
    `;
    return li;
  }
}

module.exports = Sent;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

const MessageStore = __webpack_require__(3);

class Compose {
  constructor() {
    
  }
  
  render() {
    const div = document.createElement("div");
    div.className = 'new-message';
    div.innerHTML = this.renderForm();
    div.addEventListener("change", event => {
      MessageStore.updateDraftField(event.target.name, event.target.value)
    });
    div.addEventListener("submit", event => {
      event.preventDefault();
      MessageStore.sendDraft();
      window.location.hash = "inbox";
    });
    return div;
  }
  
  renderForm() {
    const draft = MessageStore.getMessageDraft();
    
    const subjectLine = document.createElement("p");
    subjectLine.className = 'new-message-header';
    subjectLine.innerText = 'New Message';
    
    const form = document.createElement("form"); //need action attr & method attr
    form.className = 'compose-form';
    form.innerHTML = `
      <input placeholder = 'Recipient' name = 'to' type = 'text' value = '${draft.to}'>
      <input placeholder = 'Subject' name = 'subject' type = 'text' value = '${draft.subject}'>
      <textarea name = 'body' rows = '20'>${draft.body}</textarea>
      <input type = 'submit' class = 'btn btn-primary submit-message' value = 'Send'>
    `;
    return subjectLine.innerHTML + form.outerHTML;
  }
}

module.exports = Compose;

/***/ })
/******/ ]);