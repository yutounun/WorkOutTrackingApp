import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import CommonRoundedInput from "./CommonRoundedInput.vue";

describe("CommonRoundedInput", () => {
  it("renders properly", () => {
    const wrapper = mount(CommonRoundedInput, {
      props: { placeholder: "Enter your height" },
    });
    expect(wrapper.attributes("placeholder")).toBe("Enter your height");
  });
});
