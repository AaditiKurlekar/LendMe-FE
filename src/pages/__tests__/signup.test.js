import { render, screen } from "@testing-library/react";
import SignupPage from "../signup/signup";
import { BrowserRouter } from "react-router-dom";

const renderComponent = () => {
  render(
    <BrowserRouter>
      <SignupPage />
    </BrowserRouter>
  );
};

test("render sign-up page", () => {
  renderComponent();

  const signupTitle = screen.getByTestId("signup-title");
  expect(signupTitle).toBeTruthy();
});

test("first-name input field exists", () => {
  renderComponent();

  const firstNameFormControl = screen.getByTestId("first-name");
  expect(firstNameFormControl).toBeTruthy();
});
