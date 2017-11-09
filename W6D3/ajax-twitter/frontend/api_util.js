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
