var get_language_data = [];

httpGetRequest = async (url) => {
  try {
    const resp = await axios.get(url, {
      headers: {
        // Authorization: `token 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`,
        "Content-Type": "application/json",
      },
    });
    return await resp.data;
  } catch (err) {
    console.error(err);
    return null;
  }
};
httpGetRequest("https://api.github.com/users/yashgharat/repos").then((res) => {
  if (res) {
    Promise.all(
      res.map((repo) =>
        httpGetRequest(repo.languages_url).then((languages) =>
          get_language_data.push(languages)
        )
      )
    ).then(() => {
      var language_counts = {};
      var language_portions = {};
      var total = 0;
      get_language_data.forEach((repo) => {
        Object.keys(repo).forEach((language) => {
          total += repo[language];
          if (language_counts[language] == null) {
            language_counts[language] = repo[language];
          } else {
            language_counts[language] += repo[language];
          }
        });
      });

      var progressbars = "";

      Object.keys(language_counts).forEach((language) => {
        portion = ((language_counts[language] / total) * 100).toFixed(0);
        //language_portions[language] = portion
        // TODO create progess bars here
        if (portion > 3) {
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
            '" aria-valuemin="0" aria-valuemax="100" style="width:' +
            portion * 2 +
            '%;"></div>' +
            "</div></div>";
          document.querySelector(".github-skills").innerHTML = progressbars;
        }
      });
    });
  } else console.log("getRepos was null");
});
