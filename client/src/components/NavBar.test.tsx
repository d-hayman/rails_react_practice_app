import { describe } from "node:test";
import NavBar from "./NavBar";
import { createRoot } from "react-dom/client";

let container : any;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

describe('can render and update a counter', () => {
  // Test first render and componentDidMount
  test("render the nav bar", () => {
    createRoot(container).render(<NavBar />);
  });
});