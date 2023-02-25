import CommonSelectBox from "./CommonSelectBox.vue";
export default {
  title: "SelectBox",
  component: CommonSelectBox,
  argTypes: {
    class: String,
    placeholder: String,
    options: Array,
  },
};

const Template = (args) => ({
  components: { CommonSelectBox },
  setup() {
    return { args };
  },
  template: '<CommonSelectBox v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  class: "",
  placeholder: "Select your workout menu",
  options: ["pushup", "pull up", "running"],
};

export const OneOption = Template.bind({});
OneOption.args = {
  class: "",
  placeholder: "Select your workout menu",
  options: ["pushup"],
};

export const Narrow = Template.bind({});
Narrow.args = {
  class: "w-24",
  placeholder: "Select your workout menu",
  options: ["pushup", "pull up", "running"],
};

export const Tall = Template.bind({});
Tall.args = {
  class: "h-20",
  placeholder: "Select your workout menu",
  options: ["pushup", "pull up", "running"],
};

export const Rounded = Template.bind({});
Rounded.args = {
  class: "rounded-full",
  placeholder: "Select your workout menu",
  options: ["pushup", "pull up", "running"],
};
