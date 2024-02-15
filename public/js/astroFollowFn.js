// var astro = document.querySelector(".solo-astro");

// // Set initial position
// var droidX = window.innerWidth / 2;
// var droidY = window.innerHeight - 100;

// // to define it in percentage -->
// // var droidY = window.innerHeight - window.innerHeight * 0.2;

// // Variables to keep track of mouse position and speed
// var mouseX = 0;
// var mouseY = 0;
// var speed = 0.6;
// var accelMod = 1.5;

// function movement() {
//   // Calculate distance between mouse and current position
//   var distanceX = mouseX - droidX;
//   var distanceY = mouseY - droidY;

//   // Calculate acceleration based on distance and acceleration modifier
//   var accelerationX = Math.abs(distanceX * accelMod) / 100;
//   var accelerationY = Math.abs(distanceY * accelMod) / 100;

//   // Move horizontally
//   if (droidX < mouseX) {
//     droidX += speed * accelerationX;
//   } else {
//     droidX -= speed * accelerationX;
//   }

//   // Move vertically
//   if (droidY < mouseY) {
//     droidY += speed * accelerationY;
//   } else {
//     droidY -= speed * accelerationY;
//   }

//   // Constrain vertical movement in pixels
//   //   if (droidY < window.innerHeight - 400) {
//   //     droidY = window.innerHeight - 400;
//   //   } else if (droidY > window.innerHeight - 300) {
//   //     droidY = window.innerHeight - 300;
//   //   }

//   // To define the vertical movement constraint in percentage
//   if (droidY < window.innerHeight - window.innerHeight * 0.4) {
//     droidY = window.innerHeight - window.innerHeight * 0.4;
//   } else if (droidY > window.innerHeight - window.innerHeight * 0.3) {
//     droidY = window.innerHeight - window.innerHeight * 0.3;
//   }

//   // Update element position
//   astro.style.left = droidX + "px";
//   astro.style.top = droidY + "px";

//   // Request animation frame for smooth animation
//   requestAnimationFrame(movement);
// }

// // Update mouse position on mousemove event
// document.addEventListener("mousemove", function (event) {
//   mouseX = event.pageX;
//   mouseY = event.pageY;
// });

// // Start movement function
// movement();

// ASTRO FOLLOW FUNCTION BUT WITH BETTER MAPPING FOR VERTICAL MOVEMENT
var astro = document.querySelector(".solo-astro");

// Set initial position
var droidX = window.innerWidth / 2;
var droidY = window.innerHeight - 100;

var speed = 0.65;
var accelMod = 0.85;

function movement() {
  var distanceX = mouseX - droidX;

  // Move horizontally
  if (droidX < mouseX) {
    droidX += (speed * Math.abs(distanceX * accelMod)) / 100;
  } else {
    droidX -= (speed * Math.abs(distanceX * accelMod)) / 100;
  }

  // Map mouseY to allowed droidY range
  var minY = window.innerHeight - window.innerHeight * 0.5; // Upper bound of droidY
  var maxY = window.innerHeight - window.innerHeight * 0.25; // Lower bound of droidY
  // Invert the mouseY position since mouseY=0 is at the top but we want it to correspond to maxY
  droidY = mapMouseYToRange(mouseY, 0, window.innerHeight, minY, maxY);

  // Update element position
  astro.style.left = droidX + "px";
  astro.style.top = droidY + "px";

  requestAnimationFrame(movement);
}

// Helper function to map mouseY to the droidY range
function mapMouseYToRange(value, fromLow, fromHigh, toLow, toHigh) {
  return ((value - fromLow) * (toHigh - toLow)) / (fromHigh - fromLow) + toLow;
}

var mouseX = 0,
  mouseY = 0;
document.addEventListener("mousemove", function (event) {
  mouseX = event.pageX;
  mouseY = event.pageY;
});

movement();
