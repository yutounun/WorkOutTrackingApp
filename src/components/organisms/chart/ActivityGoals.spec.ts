import { describe, it, expect, beforeEach } from "vitest";
import { screen } from "@testing-library/dom";
import { render, cleanup } from "@testing-library/vue";
import ActivityGoals from "./ActivityGoals.vue";

describe("ActivityGoals", () => {
  beforeEach(cleanup);

  it("renders ActivityGoals properly", () => {
    const goalData = {
      weight: {
        current: 54,
        goal: 39,
      },
      bodyFat: {
        current: 22,
        goal: 15,
      },
    };
    render(ActivityGoals, { props: { goalData: goalData } });
    const currentWeight = screen.getByText("54");
    const currentFat = screen.getByText("22");
    const goalWeight = screen.getByText("39");
    const goalFat = screen.getByText("15");

    expect(currentWeight).toBeTruthy();
    expect(currentFat).toBeTruthy();
    expect(goalWeight).toBeTruthy();
    expect(goalFat).toBeTruthy();
  });

  it("matches an old snapshot", () => {
    const goalData = {
      weight: {
        current: 54,
        goal: 39,
      },
      bodyFat: {
        current: 22,
        goal: 15,
      },
    };
    const goal = render(ActivityGoals, { props: { goalData: goalData } });
    expect(goal).toMatchSnapshot();
  });
});
