import { render, screen } from "@testing-library/react";
import LoansList from "../loans-list/loans-list";
import { BrowserRouter } from "react-router-dom";

const renderComponent = () => {
  render(
    <BrowserRouter>
      <LoansList />
    </BrowserRouter>
  );
};

test("render filters section on loans list component", () => {
  renderComponent();

  const filtersTitle = screen.getByTestId("filters");
  expect(filtersTitle).toBeTruthy();
});

test("render listing section on loans list component", () => {
  renderComponent();

  const loansList = screen.getByTestId("loans-listing");
  expect(loansList).toBeTruthy();
});

test("render search bar section on loans list component", () => {
  renderComponent();

  const loansList = screen.getByTestId("search-bar-section");
  expect(loansList).toBeTruthy();
});
