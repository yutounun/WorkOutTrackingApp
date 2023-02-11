<script setup lang="ts">
import { db } from "@/firebase/init";
import { doc, collection, getDocs } from "firebase/firestore";
import WorkoutCard from "@/components/organisms/workout/WorkoutCard.vue";
import Footer from "@/components/organisms/commons/CommonFooter.vue";
import Header from "@/components/organisms/commons/CommonHeader.vue";
import { ref } from "vue";

const workoutList = ref([]);

/** Get all workout menus from firestore */
const getWorkoutList = async () => {
  // Get the ref to each user doc
  // TODO: Get current user's email from eternalized Pinia
  const userDocRef = doc(db, "users", "testestesttyutounwasese@gmail.com");
  // Get the ref to foods collection in user doc
  const colRef = collection(userDocRef, "workouts");
  // add data in workouts ref
  const workoutDocs = await getDocs(colRef);

  const list = [];

  workoutDocs.forEach((doc) => {
    list.push(doc.data());
  });

  console.log("workout menus :", list);

  list.forEach((doc) => {
    workoutList.value.push(doc);
  });
};

/** Created */
getWorkoutList();
</script>

<template>
  <Header title="Workout List" />
  <main class="px-6 font-sans pb-32 mt-20">
    <div v-for="(menu, index) in workoutList" :key="menu.title">
      <div v-if="index === 0 || workoutList[index - 1].date !== menu.date">
        <span class="font-semibold text-lg text-primary">{{ menu.date }}</span>
      </div>
      <WorkoutCard class="mt-5">
        <template #icon>
          <img :src="menu.icon" alt="" />
        </template>
        <template #title>{{ menu.title }}</template>
        <template #bottom
          >{{ menu.weight }}kg × {{ menu.reps }}reps × {{ menu.sets }}</template
        >
      </WorkoutCard>
    </div>
  </main>
  <Footer menu />
</template>
