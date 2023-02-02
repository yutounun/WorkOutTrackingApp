import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/dom";
import { render } from "@testing-library/vue";
import FoodsList from "./FoodsListPage.vue";

describe("FoodsList", () => {
  it("renders FoodsListPage properly", () => {
    const { getByText } = render(FoodsList);
    const header = getByText("Foods List");
    const profileImg = screen.getByAltText("profile");
    expect(header).toBeTruthy();
    expect(profileImg).toBeTruthy();
  });
});
