import CommonGraph from "./CommonGraph.vue";

export default {
  title: "Graph",
  component: CommonGraph,
  argTypes: {
    dataSet: Array,
    labels: Array,
    type: String,
  },
};

const Template = (args) => ({
  components: { CommonGraph },
  setup() {
    return { args };
  },
  template: '<CommonGraph v-bind="args" />',
});

export const Weight = Template.bind({});
Weight.args = {
  type: "weight",
  labels: ["02/02", "02/09", "02/14", "02/16", "02/21", "02/24", "02/25"],
  dataSet: [
    {
      label: "Weight",
      backgroundColor: "#918EF4",
      data: [70, 50, 81, 70, 20, 82, 10],
    },
    {
      label: "BodyFat",
      backgroundColor: "#918EF4",
      data: [30, 20, 10, 40, 50, 10, 40],
    },
  ],
};

export const Pfc = Template.bind({});
Pfc.args = {
  type: "pfc",
  labels: ["02/02", "02/09"],
  dataSet: [
    {
      label: "Protein",
      backgroundColor: "RED",
      data: [10, 30],
      borderWidth: 1,
    },
    {
      label: "Fat",
      backgroundColor: "ORANGE",
      data: [20, 50],
      borderWidth: 1,
    },
    {
      label: "Carbo",
      backgroundColor: "BLUE",
      data: [100, 150],
      borderWidth: 1,
    },
  ],
};
