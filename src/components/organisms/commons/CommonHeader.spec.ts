import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import CommonHeader from "./CommonHeader.vue";

describe("CommonHeader", () => {
  it("renders properly", () => {
    const wrapper = mount(CommonHeader, {
      props: { title: "Workout" },
    });
    expect(wrapper.html()).toContain("Workout");
  });
});
