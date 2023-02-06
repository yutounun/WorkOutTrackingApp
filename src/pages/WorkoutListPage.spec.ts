import { describe, it, expect } from "vitest";
import { render } from "@testing-library/vue";
import WorkoutList from "./WorkoutListPage.vue";

describe("FoodsList", () => {
  it("renders Workout page properly", () => {
    const { getByText } = render(WorkoutList);
    const header = getByText("Workout List");
    expect(header).toBeTruthy();
  });
});
