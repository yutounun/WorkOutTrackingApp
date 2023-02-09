import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import CommonFooter from "./CommonFooter.vue";

describe("CommonFooter", () => {
  it("renders all elements properly", () => {
    const wrapper = mount(CommonFooter);
    expect(wrapper.html()).toContain("FOOD");
    expect(wrapper.html()).toContain("HOME");
    expect(wrapper.html()).toContain("MENU");
    expect(wrapper.html()).toContain("CHART");
  });
  it("has home icon having thick color when opening related page", () => {
    const wrapper = mount(CommonFooter, {
      props: { home: true },
    });
    expect(wrapper.html()).toContain("/icons/SelectedHome.svg");
  });
  it("has food icon having thick color when opening related page", () => {
    const wrapper = mount(CommonFooter, {
      props: { food: true },
    });
    expect(wrapper.html()).toContain("/icons/SelectedFood.svg");
  });
  it("has menu icon having thick color when opening related page", () => {
    const wrapper = mount(CommonFooter, {
      props: { menu: true },
    });
    expect(wrapper.html()).toContain("/icons/SelectedMenu.svg");
  });
  it("has profile icon having thick color when opening related page", () => {
    const wrapper = mount(CommonFooter, {
      props: { chart: true },
    });
    expect(wrapper.html()).toContain("/icons/SelectedChart.svg");
  });
});
