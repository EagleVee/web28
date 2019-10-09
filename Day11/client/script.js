let currentPage = 1;

$(document).ready(function() {
  console.log("READY");
  getUser(1);
});

function getUser(pageNumber) {
  const skip = (pageNumber - 1) * NUMBER_OF_USER;
  currentPage = pageNumber;
  $.ajax(`${ROOT_API}/user?skip=${skip}&limit=${NUMBER_OF_USER}`, {
    type: "GET",
    success: function(data) {
      if (data && data.data) {
        for (user of data.data) {
          let books = "";
          for (book of user.books) {
            books += book.title + "\n";
          }
          $("#user-list").append(`
          <div class="col-12 mt-3 mb-3">
            <div class="row">
              <div class="col-4">
                <img class="image-placeholder" src="http://www.pets4homes.co.uk/images/breeds/43/large/81f6538eb4101d364ac0588b10040f0e.jpg">
              </div>
              <div class="col-8">
                <h3>${user.name}</h3>
                <h4>${user.email}</h4>
                <h4 class="text-danger">${books}</h4>
              </div>
            </div>
          </div>
          `);
        }
      }
      $("#pagination-list").html();
      for (let i = 1; i <= Math.ceil(data.total / NUMBER_OF_USER); i++) {
        $("#pagination-list").append(
          `<li class="page-item"><a class="page-link onclick="loadPage(${i})">${i}</a></li>`
        );
      }
    },
    error: function(err) {
      console.log(err);
    }
  });
}

$("#prev").on("click", function(e) {
  e.preventDefault();
  currentPage = currentPage - 1;
  getUser(currentPage);
});

$("#next").on("click", function(e) {
  e.preventDefault();
  currentPage = currentPage + 1;
  getUser(currentPage);
});

function loadPage(pageNumber) {
  $("#user-list").html("");
  getUser(pageNumber);
}
