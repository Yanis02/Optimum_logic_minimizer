// Get the modal
var modalOne = document.getElementById("myModalOne");
var modalTwo = document.getElementById("myModalTwo");

// Get the button that opens the modal
var cardOne = document.getElementById("cardOne");
var cardTwo = document.getElementById("cardTwo");

// When the user clicks on the button, open the modal
cardOne.onclick = function() {
  myModalOne.style.display = "block";
}

cardTwo.onclick = function() {
  myModalTwo.style.display = "block";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == myModalOne) {
    myModalOne.style.display = "none";
  }
  if (event.target == myModalTwo) {
    myModalTwo.style.display = "none";
  }
}