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
    borderWidth: 1,
  },
  {
    label: "Fat",
    backgroundColor: "#141B41",
    data: [],
    borderWidth: 1,
  },
  {
    label: "Carbo",
    backgroundColor: "#98B9F2",
    data: [],
    borderWidth: 1,
  },
]);

const date = ref([]);

/**
 * 1. sort by date → prob no need since it's done by firebase yet.
 * 2. Add isDuplicated property on each food menu obj
 *
 */
const getFoodData = async () => {
  const email = await useProfileStore().email;
  getFoodsList(email, "asc")
    .then((result) => {
      result.forEach((el) => {
        el.isDuplicated = false;
      });

      // Find the duplicated objects and add it on the first one
      for (let i = 0; i < result.length - 1; i++) {
        // If date is duplicated, add the data on the previous duplicated data having same date
        if (!result[i].isDuplicated) {
          for (let j = i + 1; j < result.length; j++) {
            if (result[i].date === result[j].date) {
              result[i].protein += result[j].protein;
              result[i].fat += result[j].fat;
              result[i].carbo += result[j].carbo;
              result[j].isDuplicated = true;
            }
          }
        }
      }

      // Extract the first one whose isDuplicated value is false
      const filteredArr = result.filter((result) => !result.isDuplicated);
      filteredArr.forEach((el) => {
        // Add each date into labels of the chart
        date.value.push(el.date.split("-")[1] + "/" + el.date.split("-")[2]);
        // protein
        foodDataSet.value[0].data = [...foodDataSet.value[0].data, el.protein];
        // fat
        foodDataSet.value[1].data = [...foodDataSet.value[1].data, el.fat];
        // carbo
        foodDataSet.value[2].data = [...foodDataSet.value[2].data, el.carbo];
        // cost
        console.log("cost :", el.cost);
      });
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
  // // add data in weight ref
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
    weightDataSet.value[0].data = [...weightDataSet.value[0].data, weightValue];
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

  // clear workout list
  bodyFatList.value = [];

  list.forEach((doc) => {
    const bodyFatValue = doc.value;

    weightDataSet.value[1].data = [
      ...weightDataSet.value[1].data,
      bodyFatValue,
    ];
  });
};
getBodyFat();
////////// Weight Chart //////////

console.log("bodyFatList.value :", bodyFatList.value);
const weightDataSet = ref([
  {
    label: "Weight",
    backgroundColor: "#918EF4",
    data: [],
  },
  {
    label: "BodyFat",
    backgroundColor: "RED",
    data: [],
  },
]);
</script>
<template>
  <Header title="Your recent activity" />

  <div class="mt-20">
    <div class="mx-5 h-72"><Goal :goalData="goalData" /></div>

    <!-- PFC Balance -->
    <div class="mx-5 mb-10">
      <h1 class="text-lg mt-3 mx-3 mb-2" data-testid="pfc">PFC Balance</h1>
      <CommonGraph :dataSet="foodDataSet" :labels="date" type="pfc" />
    </div>

    <!-- Weight -->
    <div class="mx-5 mb-32">
      <h1 class="text-lg mt-3 mx-3 mb-2" data-testid="weight">
        Weight / Body Fat
      </h1>
      <CommonGraph
        :dataSet="weightDataSet"
        :labels="weightDates"
        type="weight"
      />
    </div>
  </div>
  <Footer chart />
</template>
