import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import CommonTabs from "./CommonTabs.vue";

describe("CommonTabs", () => {
  it("renders properly", () => {
    const wrapper = mount(CommonTabs, {
      props: { firstItem: "firstTab", secondItem: "secondTab" },
    });
    expect(wrapper.text()).toContain("firstTab");
    expect(wrapper.text()).toContain("secondTab");
  });
  it("clicks right tab and change the style", async () => {
    const wrapper = mount(CommonTabs, {
      props: { firstItem: "firstTab", secondItem: "secondTab" },
    });
    const firstTab = wrapper.find("#firstTab");
    const secondTab = wrapper.find("#secondTab");
    await firstTab.trigger("click");
    expect(firstTab.classes()).toContain("border-primary");
    expect(secondTab.classes()).toContain("bg-gray-2");
  });
  it("clicks left tab and change the style", async () => {
    const wrapper = mount(CommonTabs, {
      props: { firstItem: "firstTab", secondItem: "secondTab" },
    });
    const firstTab = wrapper.find("#firstTab");
    const secondTab = wrapper.find("#secondTab");
    await secondTab.trigger("click");
    expect(secondTab.classes()).toContain("border-primary");
    expect(firstTab.classes()).toContain("bg-gray-2");
  });
});
