import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/dom";
import { render } from "@testing-library/vue";
import GraphPage from "./GraphPage.vue";

describe("Login page", () => {
  it("renders Graph page properly", () => {
    render(GraphPage);
    const pfc = screen.getByTestId("pfc");
    const weight = screen.getByTestId("weight");
    expect(pfc).toBeTruthy();
    expect(weight).toBeTruthy();
  });
});
