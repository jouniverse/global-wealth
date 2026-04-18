/**
 * Footer component
 */
export function initFooter() {
  const footer = document.createElement("footer");
  footer.className = "py-8 mt-auto text-center";
  footer.setAttribute("role", "contentinfo");

  const year = new Date().getFullYear();
  footer.innerHTML = `
    <p class="label-md text-on-surface-variant opacity-50">
      &copy; jouniverse ${year} &middot; Data: UBS Global Wealth Report 2023
    </p>
  `;

  document.body.appendChild(footer);
  return footer;
}
