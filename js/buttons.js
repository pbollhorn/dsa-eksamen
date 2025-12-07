let DISPLAY_BACKGROUND = true;
let DISPLAY_F_G_PREV = true;
let DISPLAY_COORDINATES = false;
let DISPLAY_WEIGHTS = false;
let nextStepPromiseResolve = null;

function resetEverythingButtonClick() {
  window.location.reload();
}

function toggleBackgroundButtonClick() {
  DISPLAY_BACKGROUND = !DISPLAY_BACKGROUND;
}

function toggleFGPrevButtonClick() {
  DISPLAY_F_G_PREV = !DISPLAY_F_G_PREV;
}

function toggleCoordinatesButtonClick() {
  DISPLAY_COORDINATES = !DISPLAY_COORDINATES;
}

function toggleWeightsButtonClick() {
  DISPLAY_WEIGHTS = !DISPLAY_WEIGHTS;
}

async function startSearchButtonClick() {
  const startNodeSelect = document.getElementById("startNodeSelect");
  const goalNodeSelect = document.getElementById("goalNodeSelect");
  const startSearchButton = document.getElementById("startSearchButton");
  const nextStepButton = document.getElementById("nextStepButton");
  startNodeSelect.disabled = true;
  goalNodeSelect.disabled = true;
  startSearchButton.disabled = true;
  nextStepButton.disabled = false;

  const path = await aStarSearch(startNodeSelect.value, goalNodeSelect.value);
  if (!path) {
    document.getElementById("resultDisplay").textContent =
      "Search finished: No path found";
  } else {
    const length = path.slice(-1)[0].fScore.toFixed(1);
    const pathAsString = path.map((node) => node.name).join(" ");
    document.getElementById(
      "resultDisplay"
    ).textContent = `Search finished: Path found with length ${length} meters: ${pathAsString}`;
  }

  nextStepButton.disabled = true;
}

async function nextStepButtonClick() {
  if (nextStepPromiseResolve !== null) {
    nextStepPromiseResolve(); // Resolve the promise
  }
  return new Promise((resolve) => {
    nextStepPromiseResolve = resolve;
  });
}
