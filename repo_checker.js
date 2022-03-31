
function getStatusLabel(status) {
  if (status == "true") {
    return "<span class='v-align-middle mr-1' style='" +
           "display: inline-block; padding: 0 7px; font-size: 12px; font-weight: 500;" +
           "line-height: 18px; white-space: nowrap; border: 1px solid transparent;" +
           "border-radius: 2em; border-color: var(--color-border-default); color: orange; border-color: orange;'>Be careful</span>";
  } else {
    return "<span class='v-align-middle mr-1' style='" +
           "display: inline-block; padding: 0 7px; font-size: 12px; font-weight: 500;" +
           "line-height: 18px; white-space: nowrap; border: 1px solid transparent;" +
           "border-radius: 2em; border-color: var(--color-border-default); color: #57ab5a; border-color: green;'>OK</span>"
  }
}

async function getAndDisplayRepoStatus(url, repositoryHeader) {
  url = url.substring(19);
  const requestArray = url.split("/");
  var xmlHttp = new XMLHttpRequest();

  xmlHttp.open( "GET", "https://githubrepochecker.herokuapp.com/check/" + requestArray[0] + "/repos/" + requestArray[1], true );
  xmlHttp.onload = function (e) {
    if (xmlHttp.readyState === 4) {
      if (xmlHttp.status === 200) {

        response = xmlHttp.responseText.trim();
        console.log(response);
        document.getElementById("repository-container-header")
                .getElementsByClassName("flex-wrap")[0].innerHTML = repositoryHeader +
                getStatusLabel(response);

        return response;

      } else {
        console.error(xmlHttp.statusText);
      }
    }
  };
  xmlHttp.onerror = function (e) {
    console.error(xmlHttp.statusText);
  };

  xmlHttp.send( null );

}

var url = document.location.href;

try {
  var repositoryHeader = document.getElementById("repository-container-header")
          .getElementsByClassName("flex-wrap")[0].innerHTML;
  getAndDisplayRepoStatus(url, repositoryHeader);
} catch (error) {
  console.log("It's not a repository page");
}
