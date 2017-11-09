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

const FollowToggle = __webpack_require__(1);
const UsersSearch = __webpack_require__(3);

$(function buttonCallback() {
  const $buttons = $('button.follow-toggle');
  $buttons.each((idx, el) => {
    new FollowToggle(el);
  });
});

$(function userSearchCallback() {
  const $searchbar = $('nav.users-search');
  $searchbar.each((idx, el) => {
    new UsersSearch(el);
  });
});


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const APIUtil = __webpack_require__(2);

class FollowToggle {
  constructor(el, options) {
    this.$el = $(el);
    this.userId = this.$el.data('user-id') || options['userId'];
    this.followState = this.$el.data('initial-follow-state') || options['followState'];

    this.render();
    this.$el.on('click', this.handleClick.bind(this));
  }
  render() {
    if (this.followState === 'unfollowed') {
      this.$el.text('Follow!');
      this.$el.prop('disabled', false);
    } else if (this.followState === 'followed') {
      this.$el.text('Unfollow!');
      this.$el.prop('disabled', false);
    } else {
      this.$el.prop('disabled', true);
    }
  }
  handleClick(event) {
    event.preventDefault();
    const self = this;
    const id = this.userId;
    if (this.followState === 'unfollowed') {
      // debugger;
      this.followState = 'following';
      $.ajax({
        url: `/users/${id}/follow`,
        method: 'POST',
        dataType: 'json'
      }).then(APIUtil.followUser(id, self));
    } else {
      this.followState = 'unfollowing';
      $.ajax({
        url: `/users/${id}/follow`,
        method: 'DELETE',
        dataType: 'json'
      }).then(APIUtil.unfollowUser(id, self));
    }
  }
}

module.exports = FollowToggle;


/***/ }),
/* 2 */
/***/ (function(module, exports) {

const APIUtil = {
  followUser: (id, self) => {
    self.followState = 'followed';
    self.render();
  },

  unfollowUser: (id, self) => {
    self.followState = 'unfollowed';
    self.render();
  },

  searchUsers: (queryVal, success) => {
    // debugger;
    $.ajax({
      url: '/users/search',
      method: 'GET',
      dataType: 'json',
      data: queryVal
    }).then(success);
  },

  createTweet: data => {
    $.ajax({
      url: '/tweets',
      method: 'POST',
      dataType: 'json',
      data: data
    });
  }
};

module.exports = APIUtil;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const APIUtil = __webpack_require__(2);
const FollowToggle = __webpack_require__(1);

class UsersSearch {
  constructor(el) {
    this.$el = $(el);
    this.$input = $(this.$el.children()[0]);
    this.$ul = $(this.$el.children()[1]);

    // debugger;
    this.$input.change(this.handleInput.bind(this));
  }
  handleInput(event) {
    APIUtil.searchUsers({query: this.$input.val()}, this.renderResults.bind(this));
  }
  renderResults(matchingUsers) {
    // debugger;
    this.$ul.empty();
    const self = this;
    matchingUsers.forEach((el) => {
      // debugger;
      let $li = $(`<li><a href="#">${el['username']}</a></li>`);
      let $button = $('<button type="button" class="follow-toggle"></button>');
      new FollowToggle($button, {userId: el['id'], followState: 'unfollowed'});
      self.$ul.append($li);
      self.$ul.append($button);
    });
  }
}
module.exports = UsersSearch;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map