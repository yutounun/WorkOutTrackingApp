<script setup lang="ts">
import FoodCard from "@/components/organisms/food/FoodCard.vue";
import Footer from "@/components/organisms/commons/CommonFooter.vue";
import Header from "@/components/organisms/commons/CommonHeader.vue";

const smallProfile = "/icons/SmallProfile.svg";
const workoutList = [
  {
    id: "1",
    date: "2nd October",
    title: "Beef Stake",
    carbo: 100,
    protein: 24,
    fat: 20,
    cost: 10,
  },
  {
    id: "1",
    date: "2nd October",
    title: "Beef Stake",
    carbo: 100,
    protein: 24,
    fat: 20,
    cost: 10,
  },
  {
    id: "1",
    date: "2nd October",
    title: "Beef Stake",
    carbo: 100,
    protein: 24,
    fat: 20,
    cost: 10,
  },
  {
    id: "1",
    date: "2nd October",
    title: "Beef Stake",
    carbo: 100,
    protein: 24,
    fat: 20,
    cost: 10,
  },
  {
    id: "1",
    date: "2nd October",
    title: "Beef Stake",
    carbo: 100,
    protein: 24,
    fat: 20,
    cost: 10,
  },
];
</script>

<template>
  <Header title="Food List" />
  <main class="px-6 font-sans mt-3 pb-32">
    <!-- today + icon -->
    <div class="flex items-center mt-20 justify-between">
      <h1 class="font-semibold text-xl text-primary">TODAY</h1>
      <img :src="smallProfile" alt="profile" />
    </div>
    <div v-for="menu in workoutList" :key="menu.id">
      <FoodCard
        class="mt-5"
        :title="menu.title"
        :carbo="menu.carbo"
        :protein="menu.protein"
        :fat="menu.fat"
        :cost="menu.cost"
      />
    </div>
  </main>
  <Footer food />
</template>
