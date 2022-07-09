$(document).ready(function() {
  $(".new-tweet").on('input', function() {
    let length = $("#tweet-text").val().length;

    if (length > 140) {
      $("#charCounter").addClass("red");
    } else if (length <= 140) {
      $("#charCounter").removeClass("red");
    }

    $("#charCounter").text(140 - length);
  });
});

