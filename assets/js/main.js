var before = document.getElementById("before");
var liner = document.getElementById("liner");
var command = document.getElementById("typer");
var textarea = document.getElementById("texter");
var terminal = document.getElementById("terminal");

window.addEventListener("keyup", enterKey);

function downloadPdf(pdfUrl, fileName) {
  const link = document.createElement("a");
  link.href = pdfUrl;
  link.download = fileName || "resume.pdf";
  link.style.display = "none";

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function addLine(text, style, time) {
  var t = "";
  for (let i = 0; i < text.length; i++) {
    if (text.charAt(i) == " " && text.charAt(i + 1) == " ") {
      t += "&nbsp;&nbsp;";
      i++;
    } else {
      t += text.charAt(i);
    }
  }
  setTimeout(function () {
    var next = document.createElement("p");
    next.innerHTML = t;
    next.className = style;

    before.parentNode.insertBefore(next, before);

    window.scrollTo(0, document.body.offsetHeight);
  }, time);
}
//init
textarea.value = "";
command.innerHTML = textarea.value;

function enterKey(e) {
  if (e.keyCode == 13) {
    // commands.push(command.innerHTML);
    addLine("user@system.com:~$ " + command.innerHTML, "no-animation", 0);
    commander(command.innerHTML.toLowerCase());
    command.innerHTML = "";
    textarea.value = "";
  }
}

function loopLines(name, style, time) {
  name.forEach(function (item, index) {
    addLine(item, style, index * time);
  });
}

function commander(cmd) {
  console.log(cmd);
  switch (cmd.toLowerCase()) {
    case "help":
      loopLines(help, "margin", 80);
      break;
    case "whodis":
      loopLines(whodis, "margin", 80);
      break;
    case "social":
      loopLines(social, "margin", 80);
      break;
    case "clear":
      setTimeout(function () {
        terminal.innerHTML = '<a id="before"></a>';
        before = document.getElementById("before");
      }, 1);
      break;
    case "banner":
      loopLines(banner, "", 80);
      break;
    case "linkedin":
      addLine("Opening LinkedIn...", "", 0);
      newTab(linkedin);
      break;
    case "github":
      addLine("Opening GitHub...", "", 0);
      newTab(github);
      break;
    case "resume":
      loopLines(resume, "", 80);
      break;
    case "resume swe":
      addLine("Downloading SWE resume", "", 30);
      newTab("assets/resumes/yash_gharat_SWE.pdf");
      break;
    case "resume ml":
      addLine("Downloading ML resume", "", 30);
      newTab("assets/resumes/yash_gharat_ML.pdf");
      break;
    case "resume gov":
      addLine("Downloading GOV resume", "", 30);
      newTab("assets/resumes/yash_gharat_DFNS.pdf");
      break;
    default:
      addLine(
        '<span class="inherit">Command not found. For a list of commands, type <span class="command">\'help\'</span>.</span>',
        "error",
        100,
      );
      break;
  }
}

function newTab(link) {
  setTimeout(function () {
    window.open(link, "_blank");
  }, 500);
}
