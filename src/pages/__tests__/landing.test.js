import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import LandingPage from "../landing/landing";

const renderComponent = () => {
  render(
    <BrowserRouter>
      <LandingPage />
    </BrowserRouter>
  );
};

test("render heading in landing page", () => {
  renderComponent();

  const heading = screen.getByTestId("heading");
  expect(heading).toBeTruthy();
});

test("render cards in landing page", () => {
  renderComponent();

  const cards = screen.getByTestId("cards");
  expect(cards).toBeTruthy();
});

test("render footer", () => {
  renderComponent();

  const footer = screen.getByTestId("footer");
  expect(footer).toBeTruthy();
});
