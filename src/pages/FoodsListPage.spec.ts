import { describe, it, expect } from "vitest";
import { render } from "@testing-library/vue";
import FoodsList from "./FoodsListPage.vue";

describe("FoodsList", () => {
  it("renders Food ListPage properly", () => {
    const { getByText } = render(FoodsList);
    const header = getByText("Food List");
    expect(header).toBeTruthy();
  });
});
