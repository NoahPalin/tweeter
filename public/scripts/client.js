const createTweetElement = function (tweetObj) {
  // console.log(tweetObj);
  const tweet = `
  <article>
    <div id="tweetTopLeft">
      <div id="picAndName">
        <img src=${tweetObj.user.avatars}>
          <div>${tweetObj.user.name}</div>
      </div>
      <div>${tweetObj.user.handle}</div>
    </div>
    <div id="tweetText">${tweetObj.content.text}</div>
    <span>
      <div class="need_to_be_rendered">${timeago.format(tweetObj.created_at)}</div>
      <div>
        <i1 class="fa-solid fa-flag"></i1>
        <i2 class="fa-solid fa-retweet"></i2>
        <i3 class="fa-solid fa-heart"></i3>
      </div>
    </span>
  </article>`;

  return tweet;
};

const renderTweets = function (arrOfTweets) {
  $('#tweets-container').empty();
  for (let element of arrOfTweets) {
    let tweet = createTweetElement(element);
    $('#tweets-container').append(tweet);
  }
  // $("i1").hover(function() {
  //   $("i1").addClass("highlight")
  // }, function() {
  //   $("i1").removeClass("highlight")
  // });

  // $("i2").hover(function() {
  //   $("i2").addClass("highlight")
  // }, function() {
  //   $("i2").removeClass("highlight")
  // });

  // $("i3").hover(function() {
  //   $("i3").addClass("highlight")
  // }, function() {
  //   $("i3").removeClass("highlight")
  // });

  // $("article").hover(function() {
  //   $("article").addClass("shadow")
  // }, function() {
  //   $("article").removeClass("shadow")
  // });
};

const loadTweets = function () {
  $.ajax({
    method: "GET",
    url: "/tweets",
  }).then(renderTweets);
};

$(document).ready(function () {
  /*
   * Client-side JS logic goes here
   * jQuery is already loaded
   * Reminder: Use (and do all your DOM work in) jQuery's document ready function
   */
  $("#submit-btn").submit(function (event) {
    event.preventDefault();

    if ($(this).find("textarea").val().length < 1) {
      alert("You can't post an empty tweet");
      return;
    }

    if ($(this).find("textarea").val().length > 140) {
      alert("You can't post a tweet with more than 140 characters.");
      return;
    }

    $.ajax({
      method: "POST",
      url: "/tweets",
      data: $(this).serialize(),
    }).then(loadTweets)
  });
  loadTweets();
});

