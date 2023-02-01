import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import CommonButton from "./CommonButton.vue";

describe("CommonButton", () => {
  it("renders properly", () => {
    const wrapper = mount(CommonButton, { props: { label: "submit" } });
    expect(wrapper.text()).toContain("submit");
  });
});
