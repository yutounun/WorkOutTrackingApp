import CommonTabs from "./CommonTabs.vue";

export default {
  title: "Tabs",
  component: CommonTabs,
  argTypes: {
    firstItem: String,
    secondItem: String,
    thirdItem: String,
  },
};

const Template = (args) => ({
  components: { CommonTabs },
  setup() {
    return { args };
  },
  template: '<CommonTabs v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  firstItem: "WORKOUT",
  secondItem: "FOOD",
  thirdItem: "WEIGHT",
};

export const Reversed = Template.bind({});
Reversed.args = {
  firstItem: "WEIGHT",
  secondItem: "FOOD",
  thirdItem: "WORKOUT",
};
