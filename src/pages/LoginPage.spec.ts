import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/dom";
import { render } from "@testing-library/vue";
import Login from "./LoginPage.vue";

describe("Login page", () => {
  it("renders Login page properly", () => {
    render(Login);

    const loginLabel = screen.getByRole("heading", { name: "Login" });
    const emailLabel = screen.getByText("Email");
    const emailForm = screen.getByLabelText("Email");
    const passwordForm = screen.getByLabelText("Password");
    const passwordLabel = screen.getByText("Password");

    expect(loginLabel).toBeTruthy();
    expect(emailLabel).toBeTruthy();
    expect(emailForm).toBeTruthy();
    expect(passwordLabel).toBeTruthy();
    expect(passwordForm).toBeTruthy();
  });
  it("make sure nobody can see password", () => {
    render(Login);
    const passwordForm = screen.getByLabelText("Password");
    expect(passwordForm.type).toBe("password");
  });
  it("matches an old snapshot", () => {
    const Logins = render(Login);
    expect(Logins).toMatchSnapshot();
  });
});
