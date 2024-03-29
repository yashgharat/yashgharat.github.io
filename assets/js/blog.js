const client = contentful.createClient({
  // This is the space ID. A space is like a project folder in Contentful terms
  space: "68lsirfoc8yr",
  // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
  accessToken: "t8CEOJ8jgKyzFT0ThKfGt8BH7VWaMGzysMZx8ih5bfo",
});

const converter = initHTMLConverter();

window.addEventListener("load", () => {
  var archiveList = document.getElementById("postsArchive");

  client
    .getEntries({
      content_type: "post",
      order: "-sys.createdAt",
    })
    .then((entries) => {
      postArr = entries.items;
      postArr.forEach((entry) => {
        // console.log(entry);
        var item = document.createElement("li");
        item.setAttribute("class", "archive-item");
        item.setAttribute("id", entry.sys.id);
		var createdAt = new Date(entry.sys.createdAt).toISOString().split("T")[0];
        item.innerHTML = '<div class="container-fluid p-0">'
							+ '<div class="row">'
								+ '<div class="col-8 archive-title">' + entry.fields.title + "</div>"
								+ '<div  class="col-4 archive-date">' + createdAt +"</div>"
							+ '</div>'
						+'</div>'

        archiveList.append(item);

        $("#" + entry.sys.id).click(() => {
          clickedPost = postMap.get(entry.sys.id);
          document.getElementById("blogModalTitle").innerHTML =
            clickedPost.title;
          document.getElementById("blogModalBody").innerHTML =
            converter.makeHtml(clickedPost.body);
          $("#navbar").hide();
          $("#blogModal").modal("show");
        });
      });

      postMap = new Map(postArr.map((post) => [post.sys.id, post.fields]));

      for (let i = 1; i < 4; i++) {
        fillPost(postArr[i - 1], i);
      }
    })
    .catch((err) => console.log(err));
});

$(document).ready(function () {
  var modal = document.getElementById("blogModal");
  modal.addEventListener("hidden.bs.modal", function (event) {
    $("#navbar").show();
  });
});

// Helper Functions

function initHTMLConverter() {
  showdown.setFlavor("github");
  converter_ = new showdown.Converter();

  converter_.setOption("headerLevelStart", 3);
  converter_.setOption("simpleLineBreaks", true);
  converter_.setOption("openLinksInNewWindow", true);
  converter_.setOption("tables", true);
  converter_.setOption("parseImgDimensions", true);
  converter_.setOption("disableForced4SpacesIndentedSublists", true);
  converter_.setOption("emoji", true);

  return converter_;
}

function fillPost(post, i) {
  // post is from Contentful, i is for html (no increment needed)

  container = document.getElementById("postContainer-" + i);
  title = document.getElementById("postTitle-" + i);
  date = document.getElementById("postDate-" + i);
  desc = document.getElementById("postDesc-" + i);
  time = document.getElementById("postTime-" + i);
  tags = document.getElementById("postTags-" + i);

  var createdAt = new Date(post.sys.createdAt).toISOString().split("T")[0];

  postTags = Array.from(post.fields.tags)
    .map((tag) => "#" + tag)
    .join(" ");

  title.innerHTML = post.fields.title;
  date.innerHTML = createdAt;
  desc.innerHTML = post.fields.description;
  time.innerHTML = getReadTime(post.fields.body) + " min read";
  tags.innerHTML = postTags;

  $("#" + container.id).click(() => {
    clickedPost = postMap.get(post.sys.id);
    document.getElementById("blogModalTitle").innerHTML = clickedPost.title;
    document.getElementById("blogModalDate").innerHTML = createdAt
    document.getElementById("blogModalBody").innerHTML = converter.makeHtml(
      clickedPost.body
    );
    $("#navbar").hide();
    $("#blogModal").modal("show");
  });
}

function getReadTime(body) {
  const wpm = 200;
  const words = body.trim().split(/\s+/).length;
  const time = Math.ceil(words / wpm);
  return time.toString();
}

function filterPosts(elem) {
  var val = $(elem).val();

  $("#postsArchive > li").each(function () {
    post = JSON.parse(JSON.stringify(postMap.get(this.id)));
    delete post.body;
    if (JSON.stringify(post).toLowerCase().search(val.toLowerCase()) > -1) {
      $(this).show();
    } else {
      $(this).hide();
    }
  });
}
