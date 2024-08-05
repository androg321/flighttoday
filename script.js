document
  .querySelector('input[name="routeType"][value="domestic"]')
  .addEventListener("change", function () {
    document.getElementById("sub-radio-group").style.display = "none";
    document.getElementById("short-radio-group").style.display = "none";
  });

document
  .querySelector('input[name="routeType"][value="short"]')
  .addEventListener("change", function () {
    document.getElementById("short-radio-group").style.display = "none";
    document.getElementById("sub-radio-group").style.display = "none";
  });

document.querySelectorAll('input[name="routeType"]').forEach((radio) => {
  if (radio.value !== "domestic" && radio.value !== "short") {
    radio.addEventListener("change", function () {
      document.getElementById("sub-radio-group").style.display = "none";
      document.getElementById("short-radio-group").style.display = "none";
    });
  }
});

async function recommendRoute() {
  const response = await fetch("routes.json");
  const data = await response.json();
  const routeType = document.querySelector('input[name="routeType"]:checked');
  let route = "";

  if (routeType) {
    document.getElementById("progress").style.display = "flex";
    let progress = 0;
    const progressBar = document.getElementById("progress-bar");
    const interval = setInterval(() => {
      progress += 10;
      progressBar.style.width = progress + "%";
      if (progress >= 100) {
        clearInterval(interval);
      }
    }, 300);
    setTimeout(() => {
      document.getElementById("progress").style.display = "none";
      progressBar.style.width = "0%";
      if (routeType.value === "domestic" || routeType.value === "short") {
        const subRouteType = "random";
        const allRoutes = Object.values(data[routeType.value]).flat();
        route =
          "추천 노선: " +
          allRoutes[Math.floor(Math.random() * allRoutes.length)];
      } else {
        const routes = data[routeType.value];
        route =
          "추천 노선: " + routes[Math.floor(Math.random() * routes.length)];
      }
      document.getElementById("route").innerText = route;
    }, 3000);
  } else {
    alert("출발 공항을 선택하세요.");
  }
}
