/**
 * Enter page – the landing/splash page.
 * Full-screen canvas animation with a centered CTA card.
 */
import "../../styles/main.css";
import { initAgents } from "../canvas-sketch/agents.js";

// Initialize particle animation as page background
initAgents({
  parent: document.body,
  opacity: 1,
});
