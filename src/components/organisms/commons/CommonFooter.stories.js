import CommonFooter from "./CommonFooter.vue";

export default {
  title: "Footer",
  component: CommonFooter,
  argTypes: {
    profile: Boolean,
    food: Boolean,
    menu: Boolean,
    chart: Boolean,
  },
};

const Template = (args) => ({
  components: { CommonFooter },
  setup() {
    // Like args is in data()
    return { args };
  },
  template: '<CommonFooter v-bind="args" />',
});

// Extends Primary from Template
export const Profile = Template.bind({});
Profile.args = {
  profile: true,
};

export const Food = Template.bind({});
Food.args = {
  food: true,
};

export const Menu = Template.bind({});
Menu.args = {
  menu: true,
};

export const Chart = Template.bind({});
Chart.args = {
  chart: true,
};
