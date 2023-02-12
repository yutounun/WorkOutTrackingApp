import { describe, it, expect, beforeEach } from "vitest";
import { render } from "@testing-library/vue";
import WorkoutList from "./WorkoutListPage.vue";
import { setActivePinia, createPinia } from "pinia";

describe("FoodsList", () => {
  beforeEach(() => {
    // creates a fresh pinia and make it active so it's automatically picked
    setActivePinia(createPinia());
  });
  it("renders Workout page properly", () => {
    const { getByText } = render(WorkoutList);
    const header = getByText("Workout List");
    expect(header).toBeTruthy();
  });
});
