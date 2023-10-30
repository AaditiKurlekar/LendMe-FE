import { render, screen } from "@testing-library/react";
import LoginPage from "../login/login";
import { BrowserRouter } from "react-router-dom";

test("render login page", () => {
  render(
    <BrowserRouter>
      <LoginPage />
    </BrowserRouter>
  );

  const loginTitle = screen.getByTestId("login-title");
  expect(loginTitle).toBeTruthy();
});
