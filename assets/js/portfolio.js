var cats = ["school", "work", "personal"];

projects = JSON.parse(projects_raw);

cats.forEach((cat) => {
  var html_str = '<div class="category-title">' + cat + "</div>";

  filtered = projects.filter((elem) => elem.category == cat);

  filtered.forEach((elem) => {
    html_str +=
      '<div class="text-center justify-content-center d-flex align-items-center project"> <div class="project-title"><a id="link-' +
      elem.id +
      '">' +
      elem.name +
      "</a></div></div>";
  });

  html_str += '<div class="category-background"></div>';
  document.querySelector(".category-" + cat).innerHTML = html_str;
});

var line_school, line_work, line_personal;

window.addEventListener("load", function () {
  line_school = new LeaderLine(
    document.getElementById("category-root"),
    document.getElementById("category-school"),
    {
      dash: { len: 10, gap: 20, animation: true },
      startSocket: "bottom",
      endSocket: "right",
      startSocketGravity: [-100, 250],
    }
  );
  line_school.color = "white";

  line_work = new LeaderLine(
    document.getElementById("category-root"),
    document.getElementById("category-work"),
    {
      dash: { len: 10, gap: 20, animation: true },
      startSocket: "bottom",
      endSocket: "left",
      startSocketGravity: [100, 250],
      //   endSocketGravity: [-192, -172],
    }
  ).setOptions({});
  line_work.color = "white";

  line_personal = new LeaderLine(
    document.getElementById("category-root"),
    document.getElementById("category-personal"),
    { dash: { len: 10, gap: 20, animation: true } }
  );
  line_personal.color = "white";

  AOS.init({
    duration: 1000,
    easing: 'ease-in-out',
    once: true,
    mirror: false
  })

});

$(document).ready(function () {
  sleep(500).then(() => {
    line_school.position();
    line_work.position();
    line_personal.position();
   });

});

$(document).ready(function () {
  projects.forEach((elem) => {
    $("#link-" + elem.id).click(function () {
      document.getElementById("projectsModalTitle").innerHTML = elem.name;
      document.getElementById("projectsModalBody").innerHTML  = elem.desc;
      if(elem.link.toString().length > 1){
        document.getElementById("projectsModalLink").innerHTML  = "View Project";
        document.getElementById("projectsModalLink").setAttribute("href", elem.link)
      }
      $("#projectModal").modal("show");
    });
  });
});

/**
 * Animation on scroll
 */
  window.addEventListener('load', () => {

});


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}