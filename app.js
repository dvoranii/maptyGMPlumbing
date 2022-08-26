// Step 1: fetch API call for projects.json

const projectsContainer = document.querySelector(".projects-container");
let template = "";

const getProjects = function (url, map) {
  fetch(url)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      let projArr = Object.entries(data.Projects);
      projArr.forEach((project) => {
        template = `<div class="project">
                        <h2 class="project-title">${project[1].title}</h2>
                        <div class="project-date">${project[1].date}</div>
                        <div class="project-address">
                            <p>${project[1].address.street} 
                            ${project[1].address.city}, ON 
                            ${project[1].address.postal_code}<br>
                            ${project[1].address.lat}
                            ${project[1].address.lng}
                            </p>
                        </div>
                        <div class="project-description">${project[1].description}</div>
                    </div>`;
        projectsContainer.insertAdjacentHTML("beforeend", template);
        setMarkers(map, project[1].address.lat, project[1].address.lng);
      });
    })
    .catch((err) => console.error(err));
};

// const setView = function () {
if (navigator.geolocation)
  navigator.geolocation.getCurrentPosition(
    function (position) {
      const { latitude, longitude } = position.coords;
      var map = L.map("map").setView([latitude, longitude], 13);
      L.tileLayer(
        "https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
      ).addTo(map);

      getProjects("/projects.json", map);
      //   hover state
      //   marker.addEventListener("mouseout", function () {
      //     marker.closePopup();
      //   });
    },
    function () {
      alert("Could not get your position");
    }
  );
// };

const setMarkers = function (map, latitude, longitude) {
  var marker = L.marker([latitude, longitude]).addTo(map);
  marker.addEventListener("mouseover", function () {
    marker
      .bindPopup(
        "This is a popup<br><a href='https://www.google.ca' target='_blank'>See project</a>"
      )
      .openPopup();
  });
};

// setView();
// Step 2: use geolocation api to be able to add projects to Map

//   Leaflet

// Look into how to set radius to show more of map (might be too hard)

// need to set the users view using navigation.geolocation
// use the geolocation lat and lng to subtract value from the project lat and lng
// if the difference is > a certain radius, display the markers
