import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/dom";
import { render } from "@testing-library/vue";
import WorkoutList from "./WorkoutListPage.vue";

describe("FoodsList", () => {
  it("renders Workout page properly", () => {
    const { getByText } = render(WorkoutList);
    const header = getByText("Workout List");
    const profileImg = screen.getByAltText("profile");
    expect(header).toBeTruthy();
    expect(profileImg).toBeTruthy();
  });
});
