import { describe } from "node:test";
import NavBar from "./NavBar";
import { createRoot } from "react-dom/client";
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from "react-router-dom";

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
    render(<NavBar />, {wrapper: MemoryRouter});

    expect(screen.getByText("Posts List")).toBeInTheDocument();
  });
});