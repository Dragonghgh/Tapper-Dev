let points = 0;
let pointsPerClick = 1;

let upgradeCost = 10;

const pointsEl = document.getElementById("points");
const clickBtn = document.getElementById("clickBtn");
const upgradeBtn = document.getElementById("upgradeClick");
const upgradeCostEl = document.getElementById("upgradeCost");

// Update UI
function updateUI() {
  pointsEl.textContent = points;

  if (points >= upgradeCost) {
    upgradeBtn.classList.remove("locked");
  } else {
    upgradeBtn.classList.add("locked");
  }

  upgradeCostEl.textContent = `Cost: ${upgradeCost}`;
}

// Main Click Button
clickBtn.addEventListener("click", () => {
  points += pointsPerClick;
  updateUI();
});

// Upgrade Button
upgradeBtn.addEventListener("click", () => {
  if (points >= upgradeCost) {
    points -= upgradeCost;
    pointsPerClick += 1;

    upgradeCost = Math.floor(upgradeCost * 1.6);

    updateUI();
  }
});

// Initial UI load
updateUI();
