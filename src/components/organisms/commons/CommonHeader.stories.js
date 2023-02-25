import CommonHeader from "./CommonHeader.vue";

export default {
  title: "Header",
  component: CommonHeader,
  argTypes: {
    title: String,
  },
};

const Template = (args) => ({
  components: { CommonHeader },
  setup() {
    return { args };
  },
  template: '<CommonHeader v-bind="args" />',
});

export const Profile = Template.bind({});
Profile.args = {
  title: "Profile",
};

export const Food = Template.bind({});
Food.args = {
  title: "Foods List",
};

export const Menu = Template.bind({});
Menu.args = {
  title: "Workouts List",
};

export const Chart = Template.bind({});
Chart.args = {
  title: "Your recent activities",
};
