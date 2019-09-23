const _ = require(["lodash"]);
var nextPageToken = "";
function getYoutubeResult(input) {
  showIndicator();
  $.ajax({
    url: `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${input}&type=video&key=AIzaSyA9gQZ-oYomFypZN7PsupZJtOfQqA6Q3qw`,
    method: "GET",
    success: function (data) {
      if (data) {
        if (data.items.length > 0) {
          nextPageToken = data.nextPageToken;
          $("#result-list").html("");
          $.each(data.items, function (index, item) {
            renderItem(item);
          })
        } else {
          renderNoResult();
        }
      }
      hideIndicator();
    },
    error: function (error) {
      console.log(error);
      renderNoResult();
      hideIndicator();
    }
  });
}

function getNextPageResult(nextPageToken) {
  showIndicator();
  $.ajax({
    url: `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=chipu&type=video&key=AIzaSyA9gQZ-oYomFypZN7PsupZJtOfQqA6Q3qw&pageToken=${nextPageToken}`,
    method: "GET",
    success: function (data) {
      if (data) {
        if (data.items !== []) {
          $.each(data.items, function (index, item) {
            renderItem(item);
          })
        } else {
          renderNoResult();
        }
        hideIndicator();
      }
    },
    error: function (error) {
      console.log(error);
      renderNoResult();
      hideIndicator();
    }
  })
}

$(document).on('submit', '#search', function (event) {
  event.preventDefault();
  var input = $("#keyword").val();
  getYoutubeResult(input);
})

function renderItem(item) {
  const { snippet, id } = item
  const { title, thumbnails, description, channelTitle } = snippet
  const imageSource = thumbnails.medium.url;
  const output = `<li class="padding-medium">
            <a href="https://youtube.com/watch?v=${id.videoId}" class="row">
              <img src="${imageSource}" class="thumbnail col-4">
              <div class="col-8">
                <h4 class="text-dark">${title}</h4>
                <p class="text-secondary text-small">${channelTitle}</p>
                <p class="text-medium text-dark">${description}</p>
              </div>
            </a>
          </li>`;
  $("#result-list").append(output);
}

$(window).scroll(function () {
  if ($(window).scrollTop() + $(window).height() == $(document).height()) {
    if (nextPageToken !== "") getNextPageResult(nextPageToken);
  }
});

function showIndicator() {
  const indicator = `<div id="indicator" class="d-flex justify-content-center m-5">
    <div class="spinner-border" role="status">
      <span class="sr-only">Loading...</span>
    </div>
  </div>`
  $("#result-list").append(indicator);
}

function hideIndicator() {
  $("#indicator").remove();
}

$('#keyword').on('input', _.debounce(function (event) {
  var input = $("#keyword").val();
  if (input.length > 0) getYoutubeResult(input);
}, 1000));

// function debounce(func, timeOut) {
//   let flag = true;
//   if (flag) {
//     func();
//     flag = false;
//     setTimeout(function () {
//       flag = true;
//     }, timeOut);
//   }
// }

function renderNoResult() {
  var noResult = `<p class="text-center text-small text-secondary">
            There's no results.
          </p>`
  $("#result-list").append(noResult);
}