import { describe, it, expect, beforeEach } from "vitest";
import { render } from "@testing-library/vue";
import FoodsList from "./FoodsListPage.vue";
import { setActivePinia, createPinia } from "pinia";

describe("FoodsList", () => {
  beforeEach(() => {
    // creates a fresh pinia and make it active so it's automatically picked
    setActivePinia(createPinia());
  });
  it("renders Food ListPage properly", () => {
    const { getByText } = render(FoodsList);
    const header = getByText("Food List");
    expect(header).toBeTruthy();
  });
});
