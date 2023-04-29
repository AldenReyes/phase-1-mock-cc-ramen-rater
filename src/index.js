/*
As a user, I can:

1. See all ramen images in the div with the id of ramen-menu. When the page loads, request the data from the server to get all the ramen objects. Then, display the image for each of the ramen using an img tag inside the #ramen-menu div.

2. Click on an image from the #ramen-menu div and see all the info about that ramen displayed inside the #ramen-detail div and where it says insert comment here and insert rating here.

3. Create a new ramen after submitting the new-ramen form. The new ramen should be added to the#ramen-menu div. The new ramen does not need to persist; in other words, if you refresh the page, it's okay that the new ramen is no longer on the page.

*/

document.addEventListener("DOMContentLoaded", () => {
  loadRamenImages();
});

const loadRamenImages = function () {
  fetch("http://localhost:3000/ramens")
  .then(res => res.json())
  .then(arr => appendImageToMenu(arr))
};

const appendImageToMenu = function (ramen) {
  ramen.map(obj =>{
    const img = document.createElement("img")
    img.setAttribute("src", `${obj.image}`)
    img.setAttribute("alt", `${obj.name} from ${obj.restaurant}`)
    img.setAttribute("id", `ramen-${obj.id}`)
    document.getElementById("ramen-menu").appendChild(img)
  })
}