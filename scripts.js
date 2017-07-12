$(document).ready(function() {
  $("#test").keyup(function(event) {
    if (event.keyCode == 13) {
      $("[name='search']").click();
    }
  });
  var search;
  $("[name='clear']").click(function() {
    $("#data").empty();
    $("#test").val("");
  });
  $("[name='search']").click(function() {
    $("#data").empty();
    search = $("#test").val();
    var api =
      "https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=" +
      search +
      "&limit=10&origin=*";
    $.getJSON(api, viewWiki);
  });
});

function viewWiki(data) {
  var size;
  var $data = $("#data");
  if (!data[1].length ) {
    $data.append("<div class='well'><h2>No Results Found</h2></div>");
  }
  else{
    size = data[1].length;
  }

  for (var i = 0; i < size; i++) {
    var item =
      "<a href='" +
      data[3][i] +
      "' target='_blank'><div class='well info'><h2>" +
      data[1][i] +
      "</h2><p>" +
      data[2][i] +
      "</p></div></a>";
    $("#data").append(item);
    $(".info").hide();
  }
  $(".info").each(function(i) {
    $(this).delay(150 * (i + 1)).fadeIn(800); //Uses the each methods index+1 to create a multiplier on the delay
  });
}
