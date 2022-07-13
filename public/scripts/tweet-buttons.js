$(document).ready(function() {
  $("i1").hover(function() {
    $("i1").addClass("highlight")
  }, function() {
    $("i1").removeClass("highlight")
  });

  $("i2").hover(function() {
    $("i2").addClass("highlight")
  }, function() {
    $("i2").removeClass("highlight")
  });

  $("i3").hover(function() {
    $("i3").addClass("highlight")
  }, function() {
    $("i3").removeClass("highlight")
  });

  $("article").hover(function() {
    $("article").addClass("shadow")
  }, function() {
    $("article").removeClass("shadow")
  });
});