// Step 1: fetch API call for projects.json

// const projectsContainer = document.querySelector(".projects-container");
let template = "";
const getProjects = function (url, map, latitude, longitude) {
  fetch(url)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      let projArr = Object.entries(data.Projects);
      projArr.forEach((project) => {
        // console.log(latitude - project[1].address.lat);
        // console.log(project[1].address.lat);
        template = `<div class="project">
                        <h2 class="project-title">${project[1].title}</h2>
                        <div class="project-date">${project[1].date}</div>
                        <div class="project-address">
                            <p>${project[1].address.street} 
                            ${project[1].address.city}, ON 
                            ${project[1].address.postal_code}
                            </p>
                        </div>
                        <div class="project-description">${project[1].description}</div>
                    </div>`;
        // if (latitude - project[1].address.lat < 0.1) {
        setMarkers(
          map,
          project[1].address.lat,
          project[1].address.lng,
          template
        );
        // }
      });
    })
    .catch((err) => console.error(err));
};

const setMarkers = function (map, latitude, longitude, template = "") {
  var marker = L.marker([latitude, longitude]).addTo(map);
  if (template === "") {
    document.querySelector(".leaflet-marker-icon").src = "/placeholder.png";
    marker.bindPopup("Your location").openPopup();
  }

  marker.addEventListener("mouseover", function () {
    marker.bindPopup(template).openPopup();
  });
};

if (navigator.geolocation)
  navigator.geolocation.getCurrentPosition(
    function (position) {
      const { latitude, longitude } = position.coords;
      var map = L.map("map").setView([latitude, longitude], 13);
      L.tileLayer(
        "https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
      ).addTo(map);
      setMarkers(map, latitude, longitude);

      getProjects("/projects.json", map, latitude, longitude);
    },
    function () {
      alert("Could not get your position");
    }
  );

// slider
const slider = document.querySelector(".slider");
let output = document.getElementById("value");

output.innerHTML = `${slider.value} km`;

slider.addEventListener("input", function () {
  output.innerHTML = `${this.value} km`;

  var x = slider.value;
  var color = `linear-gradient(90deg, rgb(117,252,117) ${x}%, rgb(214,214,214) ${x}%)`;
  slider.style.background = color;
});
