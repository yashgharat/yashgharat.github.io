var data = [];

make_progress_bars = (get_language_data) => {
  var language_counts = {};
  var total = 0;
  get_language_data.forEach((repo) => {
    Object.keys(repo).forEach((language) => {
      if (language_counts[language] == null) {
        language_counts[language] = repo[language];
      } else {
        language_counts[language] += repo[language];
      }
      total += repo[language];
    });
  });
  var progressbars = "";

  Object.keys(language_counts).forEach((language) => {
    portion = ((language_counts[language] / total) * 100).toFixed(0);
    //language_portions[language] = portion
    // TODO create progess bars here
    if (portion > 3) {
      if (portion < 30) {
        portion *= 3
      }
      progressbars +=
        '<div class="progress">' +
        '<span class="skill">' +
        language +
        ' <i class="val">' +
        portion +
        "%</i></span>" +
        '<div class="progress-bar-wrap">' +
        '<div class="progress-bar" role="progressbar" aria-valuenow="' +
        portion +
        '" aria-valuemin="0" aria-valuemax="100"></div>' +
        "</div></div></div>";
    }
  });
  document.querySelector(".github-skills").innerHTML = progressbars;
}

httpGetRequest = async (url) => {
  const resp = await axios.get(url, {
    headers: {
      // Authorization: `token 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`,
      "Content-Type": "application/json",
    },
  });
  return await resp.data;
};

httpGetRequest("https://api.github.com/users/yashgharat/repos").then((res) => {
  if (res) {
    Promise.all(
      res.map((repo) =>
        httpGetRequest(repo.languages_url).then((languages) =>
          data.push(languages)
        )
      )
    )
      .then(() => {
        make_progress_bars(data);
      })
      .catch((err) => {
        console.error(err);
        data = sample_languages;
        make_progress_bars(data);
      });
  }
}).catch((err) => {
  console.error(err);
  data = sample_languages;
  make_progress_bars(data);
});;
