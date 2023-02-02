import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/dom";
import { render } from "@testing-library/vue";
import Login from "./LoginPage.vue";

describe("Welcome", () => {
  it("renders Login page properly", () => {
    render(Login);
    const loginLabel = screen.getByRole("heading", { name: "Login" });
    const passwordLabel = screen.getByText("Password");
    const emailLabel = screen.getByText("Email");
    expect(loginLabel).toBeTruthy();
    expect(passwordLabel).toBeTruthy();
    expect(emailLabel).toBeTruthy();
  });
});
