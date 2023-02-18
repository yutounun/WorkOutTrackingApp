<script setup lang="ts">
import { db } from "@/firebase/init";
import { computed } from "vue";
import { format, subDays } from "date-fns";
import { getFoodsList } from "@/apis/getFoodList";
import CommonGraph from "@/components/organisms/commons/CommonGraph.vue";
import Goal from "@/components/organisms/chart/ActivityGoals.vue";
import Header from "@/components/organisms/commons/CommonHeader.vue";
import Footer from "@/components/organisms/commons/CommonFooter.vue";
import { useProfileStore } from "@/stores/profile";
import { doc, getDoc } from "@firebase/firestore";
import { ref } from "vue";
import { onBeforeRouteLeave, useRouter } from "vue-router";

const email = ref("");
const goalData = ref({});

////////// Common //////////
/**
 * @returns a recent week
 */
// const date = computed(() => {
//   const dates = [];
//   for (let i = 0; i < 7; i++) {
//     dates.push(format(subDays(new Date(), i), "MM/dd"));
//   }
//   dates.reverse();
//   return dates;
// });

const router = useRouter();

////////// Goals //////////

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

////////// Food Chart //////////

const foodDataSet = ref([
  {
    label: "Protein",
    backgroundColor: "#918EF4",
    data: [],
  },
  {
    label: "Fat",
    backgroundColor: "#141B41",
    data: [],
  },
  {
    label: "Carbo",
    backgroundColor: "#98B9F2",
    data: [],
  },
]);

const date = ref([]);

const getFoodData = () => {
  getFoodsList(useProfileStore().email)
    .then((result) => {
      // insert sums of ingredients on one day into data property on foodDataSet
      console.log("foodList :", result);
      // ここで同じ日付のものを足す
      for (let i = 0; i < result.length - 1; i++) {
        console.log("element :", result[i]);
        for (let j = 1; j < result.length; j++) {
          console.log("element2 :", result[j]);
          if (result[i].date === result[j].date) {
            result[i].protein += result[j].protein;
            result[i].fat += result[j].fat;
            result[i].carbo += result[j].carbo;
            console.log("index :", j, result[i]);
            result.splice(j, 1);
          }
        }
      }
      console.log("result :", result);

      // date全て確認して同じもののproteinなどはこの時点で合わせる
      for (let i = 0; i < result.length; i++) {
        // format date to show on beautifully on chart
        date.value.push(
          result[i].date.split("-")[1] + "/" + result[i].date.split("-")[2]
        );
        // protein
        foodDataSet.value[0].data.push(result[i].protein);
        // fat
        foodDataSet.value[1].data.push(result[i].fat);
        // carbo
        foodDataSet.value[2].data.push(result[i].carbo);
        // cost
        console.log("cost :", result[i].cost);
      }
    })
    .catch((err) => {
      console.log("err :", err);
    });
};
getFoodData();

////////// Weight Chart //////////

const weightDataSet = [
  {
    label: "Weight",
    backgroundColor: "#918EF4",
    data: [40, 39, 10, 40, 39, 80, 60],
  },
  {
    label: "Body Fat",
    backgroundColor: "RED",
    data: [23, 22, 22, 21, 23, 20, 19],
  },
];
</script>
<template>
  <Header title="Your recent activity" />

  <div class="mt-20">
    <div class="mx-5 h-72"><Goal :goalData="goalData" /></div>
  </div>
  <Footer chart />
</template>
