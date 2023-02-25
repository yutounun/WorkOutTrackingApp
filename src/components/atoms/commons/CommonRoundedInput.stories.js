import CommonRoundedInput from "./CommonRoundedInput.vue";
export default {
  title: "RoundedInput",
  component: CommonRoundedInput,
  argTypes: {
    placeholder: String,
    class: String,
    value: String || Number,
  },
};

const Template = (args) => ({
  components: { CommonRoundedInput },
  setup() {
    return { args };
  },
  template: '<CommonRoundedInput v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  placeholder: "Enter the amount of fat",
  class: "my-2",
  value: null,
};

export const Square = Template.bind({});
Square.args = {
  placeholder: "Enter the amount of fat",
  class: "my-2 rounded-lg",
  value: null,
};

export const Wide = Template.bind({});
Wide.args = {
  placeholder: "Enter the amount of fat",
  class: "my-2 w-96",
  value: null,
};

export const LongSentence = Template.bind({});
LongSentence.args = {
  placeholder:
    "Enter the amount of fat. Enter the amount of fat. Enter the amount of fat",
  class: "my-2",
  value: null,
};

export const WithNumberValue = Template.bind({});
WithNumberValue.args = {
  placeholder: "Enter the amount of fat",
  class: "my-2",
  value: 30,
};

export const WithStrValue = Template.bind({});
WithStrValue.args = {
  placeholder: "Enter the amount of fat",
  class: "my-2",
  value: "Oat Meal",
};
