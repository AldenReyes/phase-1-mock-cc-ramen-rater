document.addEventListener("DOMContentLoaded", () => {
  loadRamenImages();
});

const loadRamenImages = function () {
  fetch("http://localhost:3000/ramens")
    .then((res) => res.json())
    .then((arr) => arr.map(appendImageToMenu))
    .then((arr) => addListeners())
    .catch((err) => console.log(err));
};

const appendImageToMenu = function (obj) {
  const img = document.createElement("img");
  img.setAttribute("src", `${obj.image}`);
  img.setAttribute("alt", `${obj.name} from ${obj.restaurant}`);
  img.setAttribute("id", `${obj.id}`);
  img.setAttribute("class", "ramen-img");
  document.getElementById("ramen-menu").appendChild(img);
};

const addListeners = function () {
  Array.from(document.getElementsByClassName("ramen-img"), addListener);
  document
    .getElementById("new-ramen")
    .addEventListener("submit", handleFormSubmit);
};

const addListener = function (arr) {
  arr.addEventListener("click", populateCard);
};

const populateCard = function (e) {
  const ramenSrc = document.querySelector(".detail-image");
  const ramenName = document.querySelector(".name");
  const restaurantName = document.querySelector(".restaurant");
  const rating = document.getElementById("rating-display");
  const comment = document.getElementById("comment-display");
  ramenSrc.setAttribute("src", `${e.target.src}`);
  fetch(`http://localhost:3000/ramens/${e.target.id}`)
    .then((res) => res.json())
    .then((e) => {
      ramenName.textContent = e.name;
      restaurantName.textContent = e.restaurant;
      rating.textContent = e.rating;
      comment.textContent = e.comment;
    })
    .catch((err) => console.log(err));
};

const handleFormSubmit = function (e) {
  e.preventDefault();
  fetch("http://localhost:3000/ramens/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      name: e.target.name.value,
      restaurant: e.target.restaurant.value,
      image: e.target.image.value,
      rating: e.target.rating.value,
      comment: e.target["new-comment"].value,
    }),
  })
    .then((resp) => resp.json())
    .then((data) => appendImageToMenu(data))
    .then((data) => addListeners())
    .catch((err) => console.log(err, "Could not post ramen to server"));
  document.getElementById("new-ramen").reset();
};
