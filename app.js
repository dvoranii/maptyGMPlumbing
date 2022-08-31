// let longitude;
// let latitude;

if (navigator.geolocation)
  // get user location
  navigator.geolocation.getCurrentPosition(
    function (position) {
      const { latitude, longitude } = position.coords;
      // set map
      var map = L.map("map").setView([latitude, longitude], 13);
      L.tileLayer(
        "https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
      ).addTo(map);
      setMarkers(map, latitude, longitude);
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

// This is when to make the API call!!
slider.addEventListener("mouseup", function () {
  // getProjects("/projects.json", map);
  console.log(slider.value);
});

// const projectsContainer = document.querySelector(".projects-container");
let template = "";

const getProjects = function (url, map, sliderVal) {
  console.log(sliderVal);
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
                            ${project[1].address.postal_code}
                            </p>
                        </div>
                        <div class="project-description">${project[1].description}</div>
                    </div>`;
        setMarkers(
          map,
          project[1].address.lat,
          project[1].address.lng,
          template
        );
      });
    })
    .catch((err) => console.error(err));
};

// sets markes given map and project lat and lng
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
