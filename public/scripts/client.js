const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const createTweetElement = function (tweetObj) {
  const safeHTML = escape(tweetObj.content.text);

  const tweet = `
  <article>
    <div id="tweet-top-left">
      <div id="pic-and-name">
        <img src=${tweetObj.user.avatars}>
          <div>${tweetObj.user.name}</div>
      </div>
      <div>${tweetObj.user.handle}</div>
    </div>
    <div id="tweet-text">${safeHTML}</div>
    <span>
      <div class="need_to_be_rendered">${timeago.format(tweetObj.created_at)}</div>
      <div>
        <i class="fa-solid fa-flag"></i>
        <i class="fa-solid fa-retweet"></i>
        <i class="fa-solid fa-heart"></i>
      </div>
    </span>
  </article>`;

  return tweet;
};

const renderTweets = function (arrOfTweets) {
  $('#tweets-container').empty();
  for (let i = arrOfTweets.length - 1; i >= 0; i--) {
    let tweet = createTweetElement(arrOfTweets[i]);
    $('#tweets-container').append(tweet);
  }
};

const loadTweets = function () {
  $(".errors").slideUp();
  $(".errors").empty();

  // Reset the textare back to default.
  $("textarea").val("");
  $("#char-counter").val(140);
  
  $.ajax({
    method: "GET",
    url: "/tweets",
  }).then(renderTweets);
};

const clearErrors = function () {
  $(".errors").slideUp();
  $(".errors").empty();
};

$(document).ready(function () {
  $(".errors").hide();

  $("#submit-btn").submit(function (event) {
    event.preventDefault();

    if ($(this).find("textarea").val().length < 1) {
      const noChar = `
      <i class="fa-solid fa-bomb"></i>
        Sorry, your tweet contains no characters.
      <i class="fa-solid fa-bomb"></i>`;
      
      $(".errors").append(noChar);
      $(".errors").slideDown();
      setTimeout(clearErrors, 5000);

      return;
    }

    if ($(this).find("textarea").val().length > 140) {
      const maxChar = `
      <i class="fa-solid fa-bomb"></i>
        Sorry, your tweet contains more than 140 characters.
      <i class="fa-solid fa-bomb"></i>`;
      
      $(".errors").append(maxChar);
      $(".errors").slideDown();
      setTimeout(clearErrors, 5000);

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

