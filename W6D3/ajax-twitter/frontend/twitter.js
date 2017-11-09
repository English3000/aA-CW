const FollowToggle = require('./follow_toggle.js');
const UsersSearch = require('./users_search.js');

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
