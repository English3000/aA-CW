const APIUtil = require('./api_util.js');
const FollowToggle = require('./follow_toggle.js');

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
