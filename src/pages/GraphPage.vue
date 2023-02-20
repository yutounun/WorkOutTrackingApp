<script setup lang="ts">
import { db } from "@/firebase/init";
import { getFoodsList } from "@/apis/getFoodList";
import CommonGraph from "@/components/organisms/commons/CommonGraph.vue";
import Goal from "@/components/organisms/chart/ActivityGoals.vue";
import Header from "@/components/organisms/commons/CommonHeader.vue";
import Footer from "@/components/organisms/commons/CommonFooter.vue";
import { useProfileStore } from "@/stores/profile";
import { doc, getDoc } from "@firebase/firestore";
import { ref } from "vue";
import { useRouter } from "vue-router";

const email = ref("");
const goalData = ref({});

////////// Common //////////

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
const sortFoodData = (dates) => {
  return dates.sort((x, y) => {
    console.log(" :", x, y);
    x.date - y.date;
  });
};

const getFoodData = () => {
  getFoodsList(useProfileStore().email, "asc")
    .then((result) => {
      // Sort result by date
      const sortedFoodData = sortFoodData(result);
      const arr = sortedFoodData;

      arr.forEach((el) => {
        el.isDuplicated = false;
      });
      for (let i = 0; i < arr.length - 1; i++) {
        // If date is duplicated, add that to data which has same date
        if (!arr[i].isDuplicated) {
          for (let j = i + 1; j < arr.length; j++) {
            if (arr[i].date === arr[j].date) {
              arr[i].protein += arr[j].protein;
              arr[i].fat += arr[j].fat;
              arr[i].carbo += arr[j].carbo;
              arr[j].isDuplicated = true;
            }
          }
        }
      }

      const newArr = arr.filter((arr) => !arr.isDuplicated);

      for (let i = 0; i < newArr.length; i++) {
        date.value.push(
          newArr[i].date.split("-")[1] + "/" + newArr[i].date.split("-")[2]
        );
        // protein
        foodDataSet.value[0].data.push(newArr[i].protein);
        // fat
        foodDataSet.value[1].data.push(newArr[i].fat);
        // carbo
        foodDataSet.value[2].data.push(newArr[i].carbo);
        // cost
        console.log("cost :", newArr[i].cost);
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

    <!-- PFC Balance -->
    <div class="mx-5 mb-10">
      <h1 class="text-lg mt-3 mx-3 mb-2" data-testid="pfc">PFC Balance</h1>
      <CommonGraph :dataSet="foodDataSet" :labels="date" />
    </div>

    <!-- Weight -->
    <div class="mx-5 mb-32">
      <h1 class="text-lg mt-3 mx-3 mb-2" data-testid="weight">
        Weight / Body Fat
      </h1>
      <CommonGraph :dataSet="weightDataSet" />
    </div>
  </div>
  <Footer chart />
</template>
