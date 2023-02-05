<script setup lang="ts">
import { getData } from "@/apis/getFirebase";
import WorkoutCard from "@/components/organisms/workout/WorkoutCard.vue";
import Footer from "@/components/organisms/commons/CommonFooter.vue";
import Header from "@/components/organisms/commons/CommonHeader.vue";
import { ref } from "vue";

const smallProfile = "/icons/SmallProfile.svg";
const workoutList = ref([]);

const getWorkoutList = async () => {
  const list = await getData("workout");

  list.forEach((doc) => {
    workoutList.value.push(doc);
  });
};

/** Created */
getWorkoutList();
</script>

<template>
  <Header title="Workout List" />
  <main class="px-6 font-sans mt-3 pb-32">
    <!-- today + icon -->
    <div class="flex items-center mt-20 justify-between">
      <h1 class="font-semibold text-xl text-primary">TODAY</h1>
      <img :src="smallProfile" alt="profile" />
    </div>
    <div v-for="menu in workoutList" :key="menu.id">
      <WorkoutCard class="mt-5">
        <template #icon>
          <img :src="menu.icon" alt="" />
        </template>
        <template #title>{{ menu.title }}</template>
        <template #bottom>{{ menu.weight }}kg × {{ menu.reps }}</template>
      </WorkoutCard>
    </div>
  </main>
  <Footer menu />
</template>
