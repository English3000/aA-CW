const APIUtil = require('./api_util.js');

class TweetCompose {
  constructor(el) {
    this.$el = $(el);
    this.$submit = $(this.$el.children()[6]); //?
    this.$content = $(this.$el.children()[2]);

    this.$content.on('keyup', this.charsLeft.bind(this));
    this.$submit.on('submit', this.handleSubmit.bind(this));
  }
  charsLeft() {
    const chars = 140 - this.$content.text().length;
    this.$content.text(`${chars} characters remaining`);
    //isn't appearing
  }
  handleSubmit(event) {
    event.preventDefault();
    this.submit();
    this.$el.filter(':input').prop('disabled', true);
  }
  submit() {
    APIUtil.createTweet(this.$el.serializeJSON());
  }
  clearInput() {
    this.$el.filter(':input').text(''); //submit button?
  }
  handleSuccess(tweet) {
    this.clearInput();
    this.$el.filter(':input').prop('disabled', false);
    tweet = JSON.stringify(tweet);
    const $li = $(`<li>${tweet}</li>`);
    $(this.$el.data('tweets-ul')).append($li);
  }
  // renderTweet(tweet) {
  //   const $tweet = tweet;
  //   this.$el.append($tweet);
  // }
}

module.exports = TweetCompose;
