const confettiLayer = document.querySelector(".confetti-layer");
const wishButton = document.querySelector("#wish-button");
const wishResponse = document.querySelector("#wish-response");
const cakeButton = document.querySelector(".birthday-cake");
const surpriseButton = document.querySelector("#surprise-button");
const surpriseDialog = document.querySelector("#surprise-dialog");
const closeDialogButtons = surpriseDialog.querySelectorAll(".dialog-close, .dialog-okay");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const birthdayIntro = document.querySelector("#birthday-intro");
const openSurpriseButton = document.querySelector("#open-surprise");

openSurpriseButton.addEventListener("click", () => {
  birthdayIntro.classList.add("is-leaving");
  document.body.classList.remove("intro-active");
  if (!reducedMotion.matches) celebrate(75);
  window.setTimeout(() => birthdayIntro.remove(), reducedMotion.matches ? 0 : 700);
});

function celebrate(amount = 90) {
  if (reducedMotion.matches) return;

  const colors = ["#f3bfd0", "#d9c5eb", "#fff1bd", "#f7e9e8", "#d8a7b9", "#c5d9d3"];
  const fragment = document.createDocumentFragment();

  for (let index = 0; index < amount; index += 1) {
    const piece = document.createElement("span");
    piece.className = "confetti-piece";
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.background = colors[index % colors.length];
    piece.style.setProperty("--fall-duration", `${2.5 + Math.random() * 2.5}s`);
    piece.style.setProperty("--drift", `${Math.round((Math.random() - 0.5) * 240)}px`);
    piece.style.setProperty("--spin", `${Math.round(Math.random() * 900 - 450)}deg`);
    piece.addEventListener("animationend", () => piece.remove(), { once: true });
    fragment.append(piece);
  }

  confettiLayer.append(fragment);
}

cakeButton.addEventListener("click", () => {
  const isCut = cakeButton.classList.toggle("is-cut");
  cakeButton.setAttribute("aria-pressed", String(isCut));
  cakeButton.setAttribute("aria-label", isCut ? "Birthday cake cut" : "Cut the birthday cake");
  if (isCut) celebrate(45);
});

wishButton.addEventListener("click", () => {
  wishResponse.textContent = "Your wish is on its way to the universe… ✨";
  celebrate(150);
  window.setTimeout(() => {
    wishResponse.textContent = "May every beautiful thing find its way to you. ♡";
  }, 2400);
});

surpriseButton.addEventListener("click", () => {
  surpriseDialog.showModal();
  celebrate(120);
});

closeDialogButtons.forEach((button) => {
  button.addEventListener("click", () => surpriseDialog.close());
});

surpriseDialog.addEventListener("click", (event) => {
  if (event.target === surpriseDialog) surpriseDialog.close();
});

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const target = document.querySelector(link.getAttribute("href"));
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: reducedMotion.matches ? "auto" : "smooth" });
    history.replaceState(null, "", link.getAttribute("href"));
  });
});
