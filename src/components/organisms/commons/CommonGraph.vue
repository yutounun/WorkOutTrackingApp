<script setup lang="ts">
import { Line } from "vue-chartjs";
import { format, subDays } from "date-fns";
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
import { computed } from "vue";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const props = defineProps({
  dataSet: Array,
});

/**
 * @returns a recent week
 */
const date = computed(() => {
  const dates = [];
  for (let i = 0; i < 7; i++) {
    dates.push(format(subDays(new Date(), i), "MM/dd"));
  }
  dates.reverse();
  return dates;
});

const chartData = {
  labels: date.value,
  datasets: props.dataSet,
};

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
};
</script>
<template>
  <div class="h-44">
    <Line :data="chartData" :options="chartOptions" />
  </div>
</template>
