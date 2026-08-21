(function () {
  var TYPE_LABELS = { game: "Game", mod: "Mod", app: "App" };
  var activeFilter = "all";
  var apps = [];

  var grid = document.getElementById("grid");
  var status = document.getElementById("status");

  document.querySelectorAll("#filters button").forEach(function (btn) {
    btn.addEventListener("click", function () {
      activeFilter = btn.dataset.filter;
      document.querySelectorAll("#filters button").forEach(function (b) {
        b.classList.toggle("active", b === btn);
      });
      render();
    });
  });

  function fmtBytes(n) {
    if (!n || n <= 0) return "";
    if (n < 1024) return n + " B";
    if (n < 1048576) return (n / 1024).toFixed(1) + " KB";
    if (n < 1073741824) return (n / 1048576).toFixed(1) + " MB";
    return (n / 1073741824).toFixed(2) + " GB";
  }

  function render() {
    grid.innerHTML = "";
    var list = apps.filter(function (a) {
      return activeFilter === "all" || a.type === activeFilter;
    });
    if (!list.length) {
      var empty = document.createElement("div");
      empty.className = "empty";
      empty.textContent = "Nothing here yet.";
      grid.appendChild(empty);
      return;
    }
    list.forEach(function (item) {
      var card = document.createElement("div");
      card.className = "card";

      var title = document.createElement("h3");
      title.textContent = item.name || item.id;
      card.appendChild(title);

      var badges = document.createElement("div");
      badges.className = "badges";
      var type = document.createElement("span");
      type.className = "badge " + (item.type || "app");
      type.textContent = TYPE_LABELS[item.type] || item.type;
      badges.appendChild(type);
      if (item.version) {
        var ver = document.createElement("span");
        ver.className = "badge gray";
        ver.textContent = "v" + item.version;
        badges.appendChild(ver);
      }
      var size = fmtBytes(item.file_size);
      if (size) {
        var sz = document.createElement("span");
        sz.className = "badge gray";
        sz.textContent = size;
        badges.appendChild(sz);
      }
      card.appendChild(badges);

      if (item.description) {
        var desc = document.createElement("p");
        desc.textContent = item.description;
        card.appendChild(desc);
      }

      var link = document.createElement("a");
      if (item.download_url) {
        link.href = item.download_url;
        link.target = "_blank";
        link.rel = "noopener";
        link.textContent = "Download";
      } else {
        link.className = "disabled";
        link.textContent = "No download link yet";
      }
      card.appendChild(link);

      grid.appendChild(card);
    });
  }

  fetch("AppList.json")
    .then(function (r) {
      if (!r.ok) throw new Error("HTTP " + r.status);
      return r.json();
    })
    .then(function (data) {
      apps = (data && data.apps) || [];
      status.textContent = apps.length + " items";
      render();
    })
    .catch(function (err) {
      status.textContent = "Failed to load AppList.json: " + err.message;
      grid.innerHTML =
        '<div class="empty">Cannot load the app list. Check the file exists in this repo.</div>';
    });
})();