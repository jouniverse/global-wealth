/**
 * Private Wealth page entry point — stub.
 * Full chart sections to be implemented in Phase 4.
 */
import "../../styles/main.css";
import { initNavbar } from "../components/navbar.js";
import { initFooter } from "../components/footer.js";

initNavbar("private-wealth.html");
initFooter();

// Placeholder content
const main = document.getElementById("main-content");
main.innerHTML = `
  <section class="px-6 py-16 md:py-24">
    <div class="max-w-5xl mx-auto">
      <p class="label-md text-primary mb-3">Private Wealth</p>
      <h1 class="display-md text-on-surface mb-6">High-Net-Worth<br><span class="text-primary">Individuals</span></h1>
      <p class="body-lg text-on-surface-variant mb-8">
        HNWI statistics and private wealth analysis coming in Phase 4.
      </p>
      <div class="glass-panel p-12 text-center">
        <p class="headline-md text-on-surface-variant opacity-50">Charts coming soon</p>
      </div>
    </div>
  </section>
`;
