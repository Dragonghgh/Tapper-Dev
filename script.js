let points = 0;
let perClick = 1;
let perSecond = 0;

let clickCost = 10;
let autoCost = 50;

let soundOn = true;

const pointsEl = document.getElementById("points");
const ppsEl = document.getElementById("pps");

const clickBtn = document.getElementById("clickBtn");
const upgradeBtn = document.getElementById("upgradeClick");
const autoBtn = document.getElementById("autoClicker");
const muteBtn = document.getElementById("muteBtn");

const upgradeCostEl = document.getElementById("upgradeCost");
const autoCostEl = document.getElementById("autoCost");

const clickSound = new Audio("https://cdn.jsdelivr.net/gh/jshawl/AudioFX/sounds/click.wav");

/* Floating text */
function floatText(text, x, y) {
  const el = document.createElement("div");
  el.className = "float";
  el.textContent = text;
  el.style.left = x + "px";
  el.style.top = y + "px";
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 1000);
}

/* Update UI */
function updateUI() {
  pointsEl.textContent = Math.floor(points);
  ppsEl.textContent = perSecond;

  upgradeCostEl.textContent = `Cost: ${clickCost}`;
  autoCostEl.textContent = `Cost: ${autoCost}`;

  upgradeBtn.classList.toggle("locked", points < clickCost);
  autoBtn.classList.toggle("locked", points < autoCost);

  muteBtn.textContent = soundOn ? "🔊 Sound: ON" : "🔇 Sound: OFF";

  saveGame();
}

/* Click */
clickBtn.addEventListener("click", e => {
  points += perClick;

  if (soundOn) {
    clickSound.currentTime = 0;
    clickSound.play();
  }

  floatText(`+${perClick}`, e.clientX, e.clientY);
  updateUI();
});

/* Power Click */
upgradeBtn.addEventListener("click", () => {
  if (points >= clickCost) {
    points -= clickCost;
    perClick++;
    clickCost = Math.floor(clickCost * 1.6);
    updateUI();
  }
});

/* Auto Tapper */
autoBtn.addEventListener("click", () => {
  if (points >= autoCost) {
    points -= autoCost;
    perSecond++;
    autoCost = Math.floor(autoCost * 1.7);
    updateUI();
  }
});

/* Auto income */
setInterval(() => {
  points += perSecond;
  updateUI();
}, 1000);

/* Sound toggle */
muteBtn.addEventListener("click", () => {
  soundOn = !soundOn;
  updateUI();
});

/* Save / Load */
function saveGame() {
  localStorage.setItem("neonClickerSave", JSON.stringify({
    points,
    perClick,
    perSecond,
    clickCost,
    autoCost,
    soundOn
  }));
}

function loadGame() {
  const save = JSON.parse(localStorage.getItem("neonClickerSave"));
  if (!save) return;

  points = save.points;
  perClick = save.perClick;
  perSecond = save.perSecond;
  clickCost = save.clickCost;
  autoCost = save.autoCost;
  soundOn = save.soundOn;
}

/* Init */
loadGame();
updateUI();
