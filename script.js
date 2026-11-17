// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Theme toggle (remembers choice; falls back to system preference)
const root = document.documentElement;
document.querySelector(".theme-toggle").addEventListener("click", () => {
  const isDark = root.dataset.theme
    ? root.dataset.theme === "dark"
    : matchMedia("(prefers-color-scheme: dark)").matches;
  root.dataset.theme = isDark ? "light" : "dark";
  try { localStorage.setItem("theme", root.dataset.theme); } catch (e) {}
});

// Project filters
const chips = document.querySelectorAll(".chip");
const items = document.querySelectorAll(".projects > li");

chips.forEach((chip) => {
  chip.addEventListener("click", () => {
    const filter = chip.dataset.filter;
    chips.forEach((c) => {
      const active = c === chip;
      c.classList.toggle("is-active", active);
      c.setAttribute("aria-pressed", String(active));
    });
    items.forEach((li) => {
      const tags = li.querySelector(".card").dataset.tags.split(" ");
      li.hidden = filter !== "all" && !tags.includes(filter);
    });
  });
});
