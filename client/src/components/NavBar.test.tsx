import { render, screen } from '@testing-library/react'
import { MemoryRouter } from "react-router-dom";
import NavBar from "./NavBar";

describe('NavBar component', () => {
  const renderNavBar = () => {
    render(<NavBar />, { wrapper: MemoryRouter });
  };
  // Test first render and componentDidMount
  test("render the nav bar", () => {
    renderNavBar();

    expect(screen.getByText("Posts List")).toBeInTheDocument();
    expect(screen.getByText("New Post")).toBeInTheDocument();
  });
});