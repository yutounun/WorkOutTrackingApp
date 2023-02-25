<script setup lang="ts">
import { Line } from "vue-chartjs";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
interface IFoodArray {
  label?: string;
  backgroundColor?: string;
  data?: number[];
}
type IFoodDataSet = IFoodArray[];

interface propsType {
  dataSet?: IFoodDataSet;
  labels?: string[];
  type: string;
}
const props: propsType = defineProps({
  dataSet: Array,
  labels: Array,
  type: String,
});

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
};
</script>
<template>
  <div class="h-44">
    <!-- PFC chart -->
    <!-- Need to write code as following for some reason... -->
    <Line
      v-if="
        props.dataSet[2] &&
        props.dataSet[1] &&
        props.dataSet[0] &&
        props.type === 'pfc'
      "
      :data="{
        labels: props.labels,
        datasets: [
          {
            label: 'Protein',
            data: props.dataSet[0].data,
            borderWidth: 1,
            backgroundColor: 'BLUE',
          },
          {
            label: 'fat',
            data: props.dataSet[1].data,
            borderWidth: 1,
            backgroundColor: 'YELLOW',
          },
          {
            label: 'carbo',
            data: props.dataSet[2].data,
            borderWidth: 1,
            backgroundColor: 'RED',
          },
        ],
      }"
      :options="chartOptions"
    />

    <!-- For some reason, the code following must be written here to show the weight graph... -->
    <p class="hidden">{{ props.labels }}</p>

    <!-- Weight & body fat chart -->
    <Line
      v-if="props.type === 'weight'"
      :data="{
        labels: props.labels,
        datasets: [
          {
            label: 'Weight',
            data: [1, 3, 4],
            borderWidth: 1,
            backgroundColor: 'RED',
          },
          {
            label: 'BodyFat',
            data: [2, 3, 4],
            borderWidth: 1,
            backgroundColor: 'BLUE',
          },
        ],
      }"
      :options="chartOptions"
    />
  </div>
</template>
