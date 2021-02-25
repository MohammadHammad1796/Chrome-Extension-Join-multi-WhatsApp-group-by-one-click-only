$("#Fire").on("click", function (e) {
  e.preventDefault();
  var urls = $("#Urls").val();
  if (urls.length == 0) return false;

  urls = urls.split(",");
  urls = urls.join(" ");
  urls = urls.split(" ");

  for (var index = 0; index < urls.length; index++) {
    if (urls[index].length == 0) {
      urls.splice(index, 1);
      index--;
    }
  }

  for (var index = 0; index < urls.length; index++) {
    if (urls[index].includes("https://chat.whatsapp.com/")) {
      var removeUrl = "https://chat.whatsapp.com/";
      var newUrl = "https://web.whatsapp.com/accept?code=";
      urls[index] = urls[index].replace(removeUrl, newUrl);
    } else {
      urls.splice(index, 1);
      index--;
    }
  }

  if (urls.length > 0) {
    chrome.storage.local.set({ groupLinks: urls });
    window.open(urls[urls.length - 1], "_blank");
  }
});
