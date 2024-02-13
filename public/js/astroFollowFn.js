var astro = document.querySelector(".solo-astro");

// Set initial position
var droidX = window.innerWidth / 2;
var droidY = window.innerHeight - 100;

// to define it in percentage -->
// var droidY = window.innerHeight - window.innerHeight * 0.2;

// Variables to keep track of mouse position and speed
var mouseX = 0;
var mouseY = 0;
var speed = 0.5;
var accelMod = 0.5;

function movement() {
  // Calculate distance between mouse and current position
  var distanceX = mouseX - droidX;
  var distanceY = mouseY - droidY;

  // Calculate acceleration based on distance and acceleration modifier
  var accelerationX = Math.abs(distanceX * accelMod) / 100;
  var accelerationY = Math.abs(distanceY * accelMod) / 100;

  // Move horizontally
  if (droidX < mouseX) {
    droidX += speed * accelerationX;
  } else {
    droidX -= speed * accelerationX;
  }

  // Move vertically
  if (droidY < mouseY) {
    droidY += speed * accelerationY;
  } else {
    droidY -= speed * accelerationY;
  }

  // Constrain vertical movement in pixels
  //   if (droidY < window.innerHeight - 400) {
  //     droidY = window.innerHeight - 400;
  //   } else if (droidY > window.innerHeight - 300) {
  //     droidY = window.innerHeight - 300;
  //   }

  // To define the vertical movement constraint in percentage
  if (droidY < window.innerHeight - window.innerHeight * 0.4) {
    droidY = window.innerHeight - window.innerHeight * 0.4;
  } else if (droidY > window.innerHeight - window.innerHeight * 0.3) {
    droidY = window.innerHeight - window.innerHeight * 0.3;
  }

  // Update element position
  astro.style.left = droidX + "px";
  astro.style.top = droidY + "px";

  // Request animation frame for smooth animation
  requestAnimationFrame(movement);
}

// Update mouse position on mousemove event
document.addEventListener("mousemove", function (event) {
  mouseX = event.pageX;
  mouseY = event.pageY;
});

// Start movement function
movement();
