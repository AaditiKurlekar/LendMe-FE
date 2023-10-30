import { render, screen } from "@testing-library/react";
import SignupPage from "../signup/signup";
import { BrowserRouter } from "react-router-dom";
import LoanDetailPage from "../loan-detail/loan-detail";

const renderComponent = () => {
  render(
    <BrowserRouter>
      <LoanDetailPage />
    </BrowserRouter>
  );
};

test("render loan detail page", () => {
  renderComponent();

  const signupTitle = screen.getByTestId("loan-detail");
  expect(signupTitle).toBeTruthy();
});
