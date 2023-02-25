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
interface IDataArray {
  label?: string;
  backgroundColor?: string;
  data?: number[];
}
type IDataSet = IDataArray[];

interface propsType {
  dataSet?: IDataSet;
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
            label: props.dataSet[0].label,
            data: props.dataSet[0].data,
            borderWidth: 1,
            backgroundColor: props.dataSet[0].backgroundColor,
          },
          {
            label: props.dataSet[1].label,
            data: props.dataSet[1].data,
            borderWidth: 1,
            backgroundColor: props.dataSet[1].backgroundColor,
          },
          {
            label: props.dataSet[2].label,
            data: props.dataSet[2].data,
            borderWidth: 1,
            backgroundColor: props.dataSet[2].backgroundColor,
          },
        ],
      }"
      :options="chartOptions"
    />

    <!-- Weight & body fat chart -->
    <Line
      v-if="props.type === 'weight' && props.dataSet"
      :data="{
        labels: props.labels,
        datasets: [
          {
            label: props.dataSet[0].label,
            data: props.dataSet[0].data,
            borderWidth: 1,
            backgroundColor: props.dataSet[0].backgroundColor,
          },
          {
            label: props.dataSet[1].label,
            data: props.dataSet[1].data,
            borderWidth: 1,
            backgroundColor: props.dataSet[1].backgroundColor,
          },
        ],
      }"
      :options="chartOptions"
    />
  </div>
</template>
