const APIUtil = require('./api_util.js');

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
