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
import { useRouter } from "vue-router";

const email = ref("");
const goalData = ref({});

////////// Common //////////
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

const getFoodData = () => {
  getFoodsList(useProfileStore().email)
    .then((result) => {
      // insert sums of ingredients on one day into data property on foodDataSet
      console.log(" :", result);
      // 前のindexの日付と比べるならfor使った方が良いかも
      // 前の日付と同じなら前のものに+=する。違うならpushする条件分岐で
      // dateとmappingする
      // まず日付順にsort???
      date.value.forEach((el) => {
        for (let i = 0; i < result.length; i++) {
          // if (result[i].date === result[i - 1].date) {
          //   // protein
          //   foodDataSet.value[0].data[i - 1] += result[i].protein;
          //   // fat
          //   foodDataSet.value[1].data[i - 1] += result[i].fat;
          //   // carbo
          //   foodDataSet.value[2].data[i - 1] += result[i].carbo;
          // } else {
          //   // protein
          //   foodDataSet.value[0].data.push(result[i].protein);
          //   // fat
          //   foodDataSet.value[1].data.push(result[i].fat);
          //   // carbo
          //   foodDataSet.value[2].data.push(result[i].carbo);
          // }
          if (el === result[i].date) {
            // protein
            foodDataSet.value[0].data.push(result[i].protein);
            // fat
            foodDataSet.value[1].data.push(result[i].fat);
            // carbo
            foodDataSet.value[2].data.push(result[i].carbo);
            // cost
            console.log("cost :", result[i].cost);
          }
        }
      });
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
    <div class="mx-5">
      <div class="flex items-center">
        <h1 class="text-xl mx-5">About You</h1>
        <svg
          class="mr-2 top-0 h-12"
          width="21"
          height="18"
          viewBox="0 0 21 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          @click="router.push('/profile')"
        >
          <path
            d="M14.1413 12.1263L15.2661 11.0014C15.4419 10.8257 15.7477 10.9487 15.7477 11.2018V16.3127C15.7477 17.2443 14.9919 18 14.0604 18H1.68725C0.755749 18 0 17.2443 0 16.3127V3.93956C0 3.00806 0.755749 2.25231 1.68725 2.25231H11.3011C11.5507 2.25231 11.6772 2.55461 11.5014 2.73388L10.3766 3.85871C10.3239 3.91144 10.2536 3.93956 10.1762 3.93956H1.68725V16.3127H14.0604V12.3231C14.0604 12.2493 14.0886 12.179 14.1413 12.1263ZM19.6459 5.03276L10.4153 14.2634L7.23761 14.615C6.31665 14.7169 5.53278 13.94 5.63472 13.0121L5.98623 9.8344L15.2169 0.60372C16.0219 -0.20124 17.3225 -0.20124 18.1239 0.60372L19.6424 2.12225C20.4474 2.92721 20.4474 4.23131 19.6459 5.03276ZM16.173 6.11893L14.1307 4.07665L7.59967 10.6112L7.34306 12.9066L9.63843 12.65L16.173 6.11893ZM18.4508 3.31739L16.9323 1.79886C16.7882 1.65474 16.5527 1.65474 16.412 1.79886L15.3259 2.88503L17.3682 4.92731L18.4543 3.84114C18.5949 3.6935 18.5949 3.4615 18.4508 3.31739Z"
            fill="black"
          />
        </svg>
      </div>
      <div class="h-auto mb-5 ml-4">
        <div class="flex justify-between items-center mx-5">
          <div class="">
            <h2 class="block text-lg">Calorie Burned</h2>
            <p class="inline text-4xl font-semibold">2250</p>
            <p class="inline text-lg">g</p>
          </div>
        </div>
      </div>
    </div>
    <div class="mx-5 h-72"><Goal :goalData="goalData" /></div>

    <!-- PFC Balance -->
    <div class="mx-5 mb-10">
      <h1 class="text-lg mt-3 mx-3 mb-2" data-testid="pfc">PFC Balance</h1>
      <CommonGraph :dataSet="foodDataSet" />
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
