import MutationObserver from "@sheerun/mutationobserver-shim";
import "@testing-library/jest-dom/extend-expect";

window.MutationObserver = MutationObserver;
