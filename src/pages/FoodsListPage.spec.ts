import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/dom";
import { render } from "@testing-library/vue";
import FoodsList from "./FoodsListPage.vue";

describe("FoodsList", () => {
  it("renders Food ListPage properly", () => {
    const { getByText } = render(FoodsList);
    const header = getByText("Food List");
    const profileImg = screen.getByAltText("profile");
    expect(header).toBeTruthy();
    expect(profileImg).toBeTruthy();
  });
});
