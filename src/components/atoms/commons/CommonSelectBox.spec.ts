import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import CommonSelectBox from "./CommonSelectBox.vue";

describe("CommonSelectBox", () => {
  it("renders properly", () => {
    const options = ["test1", "test2"];
    const wrapper = mount(CommonSelectBox, {
      props: { placeholder: "Enter your machine", options },
    });
    expect(wrapper.text()).toContain("Enter your machine");
    expect(wrapper.text()).toContain("test1");
    expect(wrapper.text()).toContain("test2");
  });
});
