<script setup lang="ts">
import { db } from "@/firebase/init";
import FoodCard from "@/components/organisms/food/FoodCard.vue";
import Footer from "@/components/organisms/commons/CommonFooter.vue";
import Header from "@/components/organisms/commons/CommonHeader.vue";
import { doc, collection, getDocs } from "firebase/firestore";
import { ref } from "vue";

const foodList = ref([]);

const getFoodsList = async () => {
  // Get the ref to each user doc
  // TODO: Get current user's email from eternalized Pinia
  const userDocRef = doc(db, "users", "testestesttyutounwasese@gmail.com");
  // Get the ref to foods collection in user doc
  const colRef = collection(userDocRef, "foods");
  // add data in workouts ref
  const workoutDocs = await getDocs(colRef);

  const list = [];

  workoutDocs.forEach((doc) => {
    list.push(doc.data());
  });

  console.log("workout menus :", list);

  list.forEach((doc) => {
    foodList.value.push(doc);
  });
};

/** Created */
getFoodsList();
</script>

<template>
  <Header title="Food List" />
  <main class="px-6 font-sans mt-20 pb-32">
    <div v-for="(menu, index) in foodList" :key="menu.title">
      <div v-if="index === 0 || foodList[index - 1].date !== menu.date">
        <span class="font-semibold text-lg text-primary">{{ menu.date }}</span>
      </div>
      <FoodCard
        class="mt-5"
        :date="menu.date"
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
