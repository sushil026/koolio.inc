let currentFloor = 0;
let liftDirection = "up";

function moveElevator(targetFloor) {
  let distance = targetFloor === 2 ? 68 : targetFloor === 1 ? 34 : 1;
  currentFloor = targetFloor;
  updateLiftPosition(distance);
  if (targetFloor === 2) {
    middleFloorUp = false;
    liftDirection = "down";
  } else if (targetFloor === 0) {
    middleFloorDown = false;
    liftDirection = "up";
  }
}

let middleFloorUp = false;
let middleFloorDown = false;

function middleFloor(direction, btn) {
  toggleActiveButton(btn);
  if (direction === "up") {
    middleFloorUp = !middleFloorUp;
  }
  if (direction === "down") {
    middleFloorDown = !middleFloorDown;
  }
}

let elevatorTimer;

function requestDirection(targetFloor, direction) {
  if (targetFloor === 2 && currentFloor === 0 && direction === "up") {
    if (!middleFloorUp) moveElevator(2);
    else {
      moveElevator(1);
      clearTimeout(elevatorTimer);
      elevatorTimer = setTimeout(() => {
        moveElevator(2);
      }, 5000);
    }
    setTransitionDelay();
  }
  if (targetFloor === 0 && currentFloor === 2 && direction === "down") {
    if (!middleFloorDown) moveElevator(0);
    else {
      moveElevator(1);
      clearTimeout(elevatorTimer);
      elevatorTimer = setTimeout(() => {
        moveElevator(0);
      }, 5000);
    }
    setTransitionDelay();
  }
}

function setTransitionDelay() {
  const liftElement = document.getElementById("lift");
  liftElement.style.transition = `bottom ${
    middleFloorUp || middleFloorDown ? 5 : 10
  }s ease-in-out`;
}

function toggleActiveButton(btn) {
  btn.classList.toggle("active");
}

function updateLiftPosition(pos) {
  const liftElement = document.getElementById("lift");
  liftElement.style.bottom = `${pos}%`;
  if (currentFloor === 1 && liftDirection === "down") {
    setTimeout(() => {
      deactivateDownButton();
    }, 5000);
  }
  if (currentFloor === 1 && liftDirection === "up") {
    setTimeout(() => {
      deactivateUpButton();
    }, 5000);
  }
}

function deactivateDownButton() {
  const downButton = document.querySelector("#btn-down");
  downButton.classList.remove("active");
}

function deactivateUpButton() {
  const upButton = document.querySelector("#btn-up");
  upButton.classList.remove("active");
}
