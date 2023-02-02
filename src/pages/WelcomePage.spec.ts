import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/dom";
import { render } from "@testing-library/vue";
import Welcome from "./WelcomePage.vue";

describe("Welcome", () => {
  it("renders WelcomePage properly", () => {
    const { getByText } = render(Welcome);
    const greeting = getByText("Kia Ora!!");
    const create = getByText("Create your account");
    const login = getByText("Login");
    const workoutImg = screen.getByAltText("workout");
    expect(greeting).toBeTruthy();
    expect(create).toBeTruthy();
    expect(login).toBeTruthy();
    expect(workoutImg).toBeTruthy();
  });
});
