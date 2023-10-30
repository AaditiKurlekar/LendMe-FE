import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import ProfilePage from "../profile/profile";

const renderComponent = () => {
  render(
    <BrowserRouter>
      <ProfilePage />
    </BrowserRouter>
  );
};

test("render profile page", () => {
  renderComponent();

  const signupTitle = screen.getByTestId("profile-title");
  expect(signupTitle).toBeTruthy();
});
