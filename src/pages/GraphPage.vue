<script setup lang="ts">
import CommonGraph from "@/components/organisms/commons/CommonGraph.vue";
import Goal from "@/components/organisms/profile/Goal.vue";
import Header from "@/components/organisms/commons/CommonHeader.vue";
import Footer from "@/components/organisms/commons/CommonFooter.vue";

const foodDataSet = [
  {
    label: "Protein",
    backgroundColor: "#918EF4",
    data: [40, 39, 10, 40, 39, 80, 300],
  },
  {
    label: "Fat",
    backgroundColor: "#141B41",
    data: [20, 19, 40, 10, 60, 10, 40],
  },
  {
    label: "Carbo",
    backgroundColor: "#98B9F2",
    data: [20, 19, 30, 80, 20, 80, 10],
  },
];

const weightDataSet = [
  {
    label: "Weight",
    backgroundColor: "#918EF4",
    data: [40, 39, 10, 40, 39, 80, 300],
  },
];
</script>
<template>
  <Header title="Your recent activity" />

  <div class="mt-20">
    <div class="mx-5 mb-40">
      <Goal />
    </div>

    <!-- PFC Balance -->
    <div class="mx-5 mb-10">
      <h1 class="text-lg mt-3 mx-3">PFC Balance</h1>
      <CommonGraph :dataSet="foodDataSet" />
    </div>

    <!-- Weight -->
    <div class="mx-5 mb-32">
      <h1 class="text-lg mt-3 mx-3">Weight</h1>
      <CommonGraph :dataSet="weightDataSet" />
    </div>
  </div>
  <Footer chart />
</template>
