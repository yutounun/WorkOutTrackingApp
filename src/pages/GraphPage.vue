<script setup lang="ts">
import { db } from "@/firebase/init";
import { getFoodsList } from "@/apis/getFoodList";
import CommonGraph from "@/components/organisms/commons/CommonGraph.vue";
import Goal from "@/components/organisms/chart/ActivityGoals.vue";
import Header from "@/components/organisms/commons/CommonHeader.vue";
import Footer from "@/components/organisms/commons/CommonFooter.vue";
import { useProfileStore } from "@/stores/profile";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
} from "@firebase/firestore";
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
const sortByDate = (dates) => {
  return dates.sort((x, y) => {
    console.log(" :", x, y);
    x.date - y.date;
  });
};

const getFoodData = () => {
  getFoodsList(useProfileStore().email, "asc")
    .then((result) => {
      // Sort result by date
      const sortedFoodData = sortByDate(result);
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

const weightList = ref([]);
const weightDates = ref([]);

const getWeight = async () => {
  // Get the ref to weight collection in user doc
  const q = query(
    collection(db, "users", useProfileStore().email, "weight"),
    orderBy("date", "asc")
  );
  // add data in weight ref
  const weightDocs = await getDocs(q);

  const list = [];

  weightDocs.forEach((doc) => {
    const data = doc.data();
    // Insert id of a document
    data.id = doc.id;
    list.push(data);

    // Add dates for weight graph
    weightDates.value.push(
      data.date.split("-")[1] + "/" + data.date.split("-")[2]
    );
  });

  console.log("workout menus :", list);

  // clear weight list
  weightList.value = [];

  list.forEach((doc) => {
    const weightValue = doc.value;
    weightDataSet[0].data.push(weightValue);
  });
};
getWeight();

const bodyFatList = ref([]);
const getBodyFat = async () => {
  // Get the ref to bodyFat collection in user doc
  const q = query(
    collection(db, "users", useProfileStore().email, "bodyFat"),
    orderBy("date", "asc")
  );
  // add data in bodyFat ref
  const bodyFatDocs = await getDocs(q);

  const list = [];

  bodyFatDocs.forEach((doc) => {
    const data = doc.data();
    // Insert id of a document
    data.id = doc.id;
    list.push(data);
  });

  console.log("bodyFatList :", list);

  // clear workout list
  bodyFatList.value = [];

  list.forEach((doc) => {
    const bodyFatValue = doc.value;
    weightDataSet[1].data.push(bodyFatValue);
  });
};
getBodyFat();
////////// Weight Chart //////////

console.log("bodyFatList.value :", bodyFatList.value);
const weightDataSet = [
  {
    label: "Weight",
    backgroundColor: "#918EF4",
    data: [],
  },
  {
    label: "Body Fat",
    backgroundColor: "RED",
    data: [],
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
      <CommonGraph :dataSet="weightDataSet" :labels="weightDates" />
    </div>
  </div>
  <Footer chart />
</template>
