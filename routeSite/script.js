document
  .querySelector('input[name="routeType"][value="domestic"]')
  .addEventListener("change", function () {
    document.getElementById("sub-radio-group").style.display = "flex";
    document.getElementById("short-radio-group").style.display = "none";
  });

document
  .querySelector('input[name="routeType"][value="short"]')
  .addEventListener("change", function () {
    document.getElementById("short-radio-group").style.display = "flex";
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
    if (routeType.value === "domestic" || routeType.value === "short") {
      const subRouteType = document.querySelector(
        'input[name="subRouteType"]:checked'
      );
      if (subRouteType) {
        document.getElementById("progress").style.display = "flex";
        setTimeout(() => {
          document.getElementById("progress").style.display = "none";
          if (subRouteType.value === "random") {
            const allRoutes = Object.values(data[routeType.value]).flat();
            route =
              "추천 노선: " +
              allRoutes[Math.floor(Math.random() * allRoutes.length)];
          } else {
            const routes = data[routeType.value][subRouteType.value];
            route =
              "추천 노선: " + routes[Math.floor(Math.random() * routes.length)];
          }
          document.getElementById("route").innerText = route;
        }, 3000);
      } else {
        alert("출발 공항을 선택하세요.");
      }
    } else {
      document.getElementById("progress").style.display = "flex";
      setTimeout(() => {
        document.getElementById("progress").style.display = "none";
        const routes = data[routeType.value];
        route =
          "추천 노선: " + routes[Math.floor(Math.random() * routes.length)];
        document.getElementById("route").innerText = route;
      }, 3000);
    }
  } else {
    alert("노선 타입을 선택하세요.");
  }
}
