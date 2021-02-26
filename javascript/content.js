var urls;
chrome.storage.local.get(["groupLinks"], function (result) {
  urls = result.groupLinks;
  if (urls.length > 0) {
    var url = window.location.href;
    var interval;
    if (url.includes("web.whatsapp")) {
      interval = setInterval(Join, 2000);
    }
    function Join() {
      try {
        var element = document.getElementById("side");
        if (element) {
          setTimeout(() => {
            var divTags = document.getElementsByTagName("div");
            var searchText = "الانضمام إلى المجموعة";
            var acceptElement;
            var isJoined = false;
            for (var i = 0; i < divTags.length; i++) {
              if (divTags[i].textContent == searchText) {
                acceptElement = divTags[i];
                acceptElement.click();
                clearInterval(interval);
                interval = null;
                urls.splice(urls.length - 1, 1);
                chrome.storage.local.set({ groupLinks: urls });
                isJoined = true;
                if (urls.length > 0) {
                  window.open(urls[urls.length - 1], "_blank");
                  close();
                }
                break;
              }
            }
            if (!isJoined) {
              isJoined = "joined before";
              searchText =
                "تعذّر الانضمام إلى هذه المجموعة. الرجاء المحاولة مجدداً.";
              for (var i = 0; i < divTags.length; i++) {
                if (divTags[i].textContent == searchText) {
                  clearInterval(interval);
                  interval = null;
                  urls.splice(urls.length - 1, 1);
                  chrome.storage.local.set({ groupLinks: urls });
                  isJoined = false;
                  if (urls.length > 0) {
                    window.open(urls[urls.length - 1], "_blank");
                    close();
                  }
                  break;
                }
              }
            }
            if (isJoined == "joined before") {
              clearInterval(interval);
              interval = null;
              urls.splice(urls.length - 1, 1);
              chrome.storage.local.set({ groupLinks: urls });
              if (urls.length > 0) {
                window.open(urls[urls.length - 1], "_blank");
                close();
              }
            }
          }, 2000);
        }
      } catch {}
    }
  }
});
