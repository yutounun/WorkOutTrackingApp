import CommonAlert from "./CommonAlert.vue";

export default {
  title: "Alert",
  component: CommonAlert,
  argTypes: {
    class: "",
    label: "",
    showsSuccessAlert: false,
  },
};

const Template = (args) => ({
  components: { CommonAlert },
  setup() {
    // Like args is in data()
    return { args };
  },
  template: '<CommonAlert v-bind="args" />',
});

// Extends Primary from Template
export const Success = Template.bind({});
Success.args = {
  showsSuccessAlert: true,
  label: "Congrats!!",
  class: "fixed bottom-5",
};

export const Fail = Template.bind({});
Fail.args = {
  showsSuccessAlert: true,
  label: "Failed!!",
  class: "fixed bottom-5",
};

export const Top = Template.bind({});
Top.args = {
  showsSuccessAlert: true,
  label: "Congrats!!",
  class: "fixed top-5",
};
