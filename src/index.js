
let addToy = false;
const toyCollection = document.getElementById("toy-collection")
const submitButton = document.getElementsByClassName("submit")[0]


// functions
function fetchToys(){
  return fetch("http://localhost:3000/toys")
  .then(function(response) {return response.json()})
}

function makeCard(toy){
      // create new card
      const newCard = document.createElement("div")
      newCard.classList.add("card")

      // add toy name to card
      const toyName = document.createElement("h2")
      toyName.innerHTML = toy["name"]
      newCard.appendChild(toyName)

      // add toy image to card
      const toyImage = document.createElement("img")
      toyImage.src = toy["image"]
      toyImage.classList.add("toy-avatar")
      newCard.appendChild(toyImage)

      //add number of likes to card
      const toyLikes = document.createElement("p")
      toyLikes.innerHTML = `${toy["likes"]} likes`
      newCard.appendChild(toyLikes)
    
      //add button to card
      const toyButton = document.createElement("button")
      toyButton.classList.add("like-btn")
      toyButton.setAttribute("id", toy["id"])
      toyButton.innerText = "Like <3"
      toyButton.addEventListener("click", function(event){
        const likedId = event.target["id"]
        likedToy = document.getElementById(likedId).parentElement.getElementsByTagName("p")[0]
        oldLikes = parseInt(likedToy.innerHTML.split(" ")[0])
        newLikes = oldLikes + 1

      fetch("http://localhost:3000/toys/"+likedId,  {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"},
        body: JSON.stringify({
          likes: newLikes
    })})
    .then(resp => resp.json)
    .then(function(obj){
      likedToy.innerHTML = `${newLikes} likes`
        })


      })
      newCard.appendChild(toyButton)
      toyCollection.appendChild(newCard)

}
  



// Use fetch() to make a "POST" request to create a new toy, then add it to the DOM
function addNewToy(){
 fetch("http://localhost:3000/toys",  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"},
    body: JSON.stringify({
      name: document.getElementsByClassName("input-text")[0].value,
      image: document.getElementsByClassName("input-text")[1].value,
      likes: 0
    })
     })
  fetchToys().then(function(arr){
    makeCard({
      id: arr.length+1,
      name: document.getElementsByClassName("input-text")[0].value,
      image: document.getElementsByClassName("input-text")[1].value,
      likes: 0
     }
   )})
     }


document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  // Fetch Andy's Toys
  fetchToys().then(function(arr) {
    for (const toy of arr) {
      console.log(toy["name"])
      makeCard(toy)
    }})
  
  // Adding a new toy
  submitButton.addEventListener("click", function(event){
    event.preventDefault()
    addNewToy()
    })
  

})
