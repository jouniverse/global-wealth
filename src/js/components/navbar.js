/**
 * Top navigation bar component
 */
const NAV_ITEMS = [
  { label: "Home", href: "home.html" },
  { label: "Wealth Distribution", href: "wealth-distribution.html" },
  { label: "Wealth Map", href: "world-map.html" },
  { label: "About", href: "about.html" },
];

/**
 * Create and inject the navigation bar
 * @param {string} activePage - the href of the current page
 */
export function initNavbar(activePage) {
  const nav = document.createElement("nav");
  nav.className = "fixed top-0 left-0 right-0 z-50 glass-panel";
  nav.style.borderRadius = "0";
  nav.setAttribute("role", "navigation");
  nav.setAttribute("aria-label", "Main navigation");

  const inner = document.createElement("div");
  inner.className =
    "max-w-7xl mx-auto px-6 py-4 flex items-center justify-between";

  // Logo / Brand
  const brand = document.createElement("a");
  brand.href = "index.html";
  brand.className = "font-headline text-primary font-semibold text-xl tracking-tight no-underline";
  brand.textContent = "Global Wealth";

  // Nav links
  const ul = document.createElement("ul");
  ul.className = "flex items-center gap-1 list-none m-0 p-0";

  // Skip nav link (accessibility)
  const skipLink = document.createElement("a");
  skipLink.href = "#main-content";
  skipLink.className =
    "sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-background focus:rounded-sm";
  skipLink.textContent = "Skip to main content";
  nav.appendChild(skipLink);

  for (const item of NAV_ITEMS) {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = item.href;
    a.textContent = item.label;
    a.className = "block px-3 py-1.5 text-sm font-body no-underline rounded-sm transition-colors duration-200";

    if (item.href === activePage) {
      a.classList.add("text-primary");
      a.style.background = "rgba(233, 193, 118, 0.08)";
      a.setAttribute("aria-current", "page");
    } else {
      a.classList.add("text-on-surface-variant", "hover:text-on-surface");
    }

    li.appendChild(a);
    ul.appendChild(li);
  }

  // Mobile hamburger
  const hamburger = document.createElement("button");
  hamburger.className = "md:hidden flex flex-col gap-1 p-2 bg-transparent border-none cursor-pointer";
  hamburger.setAttribute("aria-label", "Toggle navigation menu");
  hamburger.innerHTML = `
    <span class="block w-5 h-0.5 bg-on-surface transition-transform duration-200"></span>
    <span class="block w-5 h-0.5 bg-on-surface transition-opacity duration-200"></span>
    <span class="block w-5 h-0.5 bg-on-surface transition-transform duration-200"></span>
  `;

  const mobileMenu = document.createElement("div");
  mobileMenu.className = "hidden md:hidden absolute top-full left-0 right-0 glass-panel-strong p-4";
  mobileMenu.style.borderRadius = "0";

  const mobileUl = ul.cloneNode(true);
  mobileUl.className = "flex flex-col gap-2 list-none m-0 p-0";
  mobileMenu.appendChild(mobileUl);

  hamburger.addEventListener("click", () => {
    const isOpen = !mobileMenu.classList.contains("hidden");
    mobileMenu.classList.toggle("hidden");
    hamburger.setAttribute("aria-expanded", String(!isOpen));
  });

  inner.appendChild(brand);

  // Desktop nav (hidden on mobile)
  const desktopUl = ul;
  desktopUl.classList.add("hidden", "md:flex");
  inner.appendChild(desktopUl);
  inner.appendChild(hamburger);

  nav.appendChild(inner);
  nav.appendChild(mobileMenu);

  document.body.prepend(nav);

  return nav;
}
