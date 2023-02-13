<script setup lang="ts">
import { db } from "@/firebase/init";
import CommonGraph from "@/components/organisms/commons/CommonGraph.vue";
import Goal from "@/components/organisms/chart/ActivityGoals.vue";
import Header from "@/components/organisms/commons/CommonHeader.vue";
import Footer from "@/components/organisms/commons/CommonFooter.vue";
import { useProfileStore } from "@/stores/profile";
import { doc, getDoc } from "@firebase/firestore";
import { ref } from "vue";

const email = ref("");
const goalData = ref({});

/** Get info about user such as weight */
const getProfile = async () => {
  email.value = await useProfileStore().email;

  const docRef = doc(db, "users", email.value);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const profile = docSnap.data();
    goalData.value = {
      weight: {
        current: profile.currentWeight,
        goal: profile.idealWeight,
      },
      bodyFat: {
        current: profile.currentBodyFat,
        goal: profile.idealBodyFat,
      },
    };
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }
};

// created
getProfile();

// const foodDataSet = [
//   {
//     label: "Carbo",
//     backgroundColor: "#98B9F2",
//     data: [20, 19, 30, 80, 20, 80, 10],
//   },
// ];

// const weightDataSet = [
//   {
//     label: "Weight",
//     backgroundColor: "#918EF4",
//     data: [40, 39, 10, 40, 39, 80, 300],
//   },
// ];
</script>
<template>
  <Header title="Your recent activity" />

  <div class="mt-20">
    <div class="mx-5 mb-40"><Goal :goalData="goalData" /></div>

    <!-- PFC Balance -->
    <div class="mx-5 mb-10">
      <h1 class="text-lg mt-3 mx-3 mb-2" data-testid="pfc">PFC Balance</h1>
      <CommonGraph :dataSet="foodDataSet" />
    </div>

    <!-- Weight -->
    <div class="mx-5 mb-32">
      <h1 class="text-lg mt-3 mx-3 mb-2" data-testid="weight">Weight</h1>
      <CommonGraph :dataSet="weightDataSet" />
    </div>
  </div>
  <Footer chart />
</template>
