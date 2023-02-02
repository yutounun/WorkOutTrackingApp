<script setup lang="ts">
import CommonCard from "@/components/organisms/food/CommonCard.vue";
import Footer from "@/components/organisms/commons/CommonFooter.vue";
import Header from "@/components/organisms/commons/CommonHeader.vue";

const smallProfile = "/icons/SmallProfile.svg";
const workoutList = [
  {
    id: "1",
    date: "2nd October",
    icon: "/icons/barbel.svg",
    title: "Bench Press",
    weight: 100,
    reps: 12,
  },
  {
    id: "2",
    date: "4th October",
    icon: "/icons/barbel.svg",
    title: "Bench Press2",
    weight: 103,
    reps: 10,
  },
  {
    id: "2",
    date: "4th October",
    icon: "/icons/barbel.svg",
    title: "Bench Press2",
    weight: 103,
    reps: 10,
  },
  {
    id: "2",
    date: "4th October",
    icon: "/icons/barbel.svg",
    title: "Bench Press2",
    weight: 103,
    reps: 10,
  },
  {
    id: "2",
    date: "4th October",
    icon: "/icons/barbel.svg",
    title: "Bench Press2",
    weight: 103,
    reps: 10,
  },
  {
    id: "2",
    date: "4th October",
    icon: "/icons/barbel.svg",
    title: "Bench Press2",
    weight: 103,
    reps: 10,
  },
  {
    id: "2",
    date: "4th October",
    icon: "/icons/barbel.svg",
    title: "Bench Press2",
    weight: 103,
    reps: 10,
  },
];
</script>

<template>
  <Header title="Food List" />
  <main class="px-6 font-sans mt-3 pb-32">
    <!-- today + icon -->
    <div class="flex items-center mt-20 justify-between">
      <h1 class="font-semibold text-xl text-primary">TODAY</h1>
      <img :src="smallProfile" alt="" />
    </div>
    <div v-for="menu in workoutList" :key="menu.id">
      <CommonCard class="mt-5">
        <template #icon>
          <img :src="menu.icon" alt="" />
        </template>
        <template #title>{{ menu.title }}</template>
        <template #bottom>{{ menu.weight }}kg × {{ menu.reps }}</template>
      </CommonCard>
    </div>
  </main>
  <Footer food />
</template>
