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
}
const props: propsType = defineProps({
  dataSet: Array,
  labels: Array,
});

const chartData = {
  // 多分うまくProps渡ってないタイミング的に
  // Get each date from dataset of props
  datasets: [
    {
      label: "Protein",
      data: [12, 19, 3, 5, 2, 3],
      borderWidth: 1,
      backgroundColor: "#98B9F2",
    },
    {
      label: "fat",
      data: [12, 9, 3, 5, 2, 3],
      borderWidth: 1,
      backgroundColor: "#98B9F2",
    },
    {
      label: "carbo",
      data: [12, 19, 4, 5, 2, 3],
      borderWidth: 1,
      backgroundColor: "#98B9F2",
    },
  ],
};

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
};
</script>
<template>
  <div class="h-44">
    <Line
      v-if="props.dataSet[2]"
      :data="{
        labels: props.labels,
        datasets: [
          {
            label: 'Protein',
            data: props.dataSet[0].data,
            borderWidth: 1,
            backgroundColor: '#98B9F2',
          },
          {
            label: 'fat',
            data: props.dataSet[1].data,
            borderWidth: 1,
            backgroundColor: '#98B9F2',
          },
          // そもそもこのdataSet[2]が読み込まれないことが問題
          {
            label: 'carbo',
            data: props.dataSet[2].data,
            borderWidth: 1,
            backgroundColor: '#98B9F2',
          },
        ],
      }"
      :options="chartOptions"
    />
  </div>
</template>
