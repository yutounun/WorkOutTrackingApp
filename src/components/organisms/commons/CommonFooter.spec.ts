import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import CommonFooter from "./CommonFooter.vue";

describe("CommonFooter", () => {
  it("renders all elements properly", () => {
    const wrapper = mount(CommonFooter);
    expect(wrapper.html()).toContain("FOOD");
    expect(wrapper.html()).toContain("HOME");
    expect(wrapper.html()).toContain("MENU");
    expect(wrapper.html()).toContain("PROFILE");
  });
});
