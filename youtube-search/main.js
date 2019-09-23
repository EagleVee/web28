var nextPageToken = "";
function getYoutubeResult(searchString) {
  $.ajax({
    url: `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${searchString}&type=video&key=AIzaSyA9gQZ-oYomFypZN7PsupZJtOfQqA6Q3qw`,
    method: "GET",
    success: function (data) {
      if (data) {
        nextPageToken = data.nextPageToken;
        $("#result-list").html("");
        $.each(data.items, function (index, item) {
          renderItem(item);
        })
      }
    },
    error: function (error) {
      console.log(error);
    }
  });
}

function getNextPageResult(nextPageToken) {
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
          var noResult = `<p class="text-center text-small text-secondary">
            There's no more results.
          </p>`
          $("#result-list").append(noResult);
        }
      }
    },
    error: function (error) {
      console.log(error);
    }
  })
}

$(document).on('submit', '#search', function (event) {
  event.preventDefault();
  var searchString = $("#keyword").val();
  getYoutubeResult(searchString);
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
    getNextPageResult(nextPageToken);
  }
});