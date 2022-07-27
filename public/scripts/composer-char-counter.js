// Updates the character counter as the user types.
$(document).ready(function() {
  $(".new-tweet").on('input', function() {
    let length = $("#new-tweet-text").val().length;

    if (length > 140) {
      $("#char-counter").addClass("red");
    } else if (length <= 140) {
      $("#char-counter").removeClass("red");
    }

    $("#char-counter").text(140 - length);
  });
});

