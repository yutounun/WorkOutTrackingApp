<script setup lang="ts">
import { ref } from "vue";
import { format } from "date-fns";
import { db } from "@/firebase/init";
import { doc, addDoc, collection, getDocs } from "firebase/firestore";
import Tabs from "@/components/organisms/commons/CommonTabs.vue";
import Button from "@/components/atoms/commons/CommonButton.vue";
import Header from "@/components/organisms/commons/CommonHeader.vue";
import SelectBox from "@/components/atoms/commons/CommonSelectBox.vue";
import Footer from "@/components/organisms/commons/CommonFooter.vue";
import RoundedInput from "@/components/atoms/commons/CommonRoundedInput.vue";
import { useProfileStore } from "../stores/profile";

const profile = useProfileStore();
const SittingDownGirl = "/icons/SittingDownGirl.svg";
const GirlHavingCookie = "/icons/GirlHavingCookie.svg";

/** status true means you clicked WORKOUT tab */
const isFirstTabClicked = ref(true);

const showsSuccessAlert = ref(false);

const onClickFirstMenu = (status: any) => {
  isFirstTabClicked.value = status;
};

/** Shows an alert showing you succeeded to register */
const successfulAlertEvent = () => {
  showsSuccessAlert.value = true;

  // Keeps showing a bar for 2 secs
  setTimeout(() => {
    showsSuccessAlert.value = false;
  }, 2000);
};

const initialDate = () => {
  return format(new Date(), "yyyy-MM-dd");
};

////////// Workout ////////////

/** Data that will be registered on workout doc on Firebase Store */
const workoutMenus = ref({
  date: initialDate(),
  icon: "/icons/barbel.svg",
  title: null,
  weight: null,
  reps: null,
  sets: null,
});

const workoutOptions = ref([]);

const workoutList = ref([]);

const getWorkoutList = async () => {
  // Get the ref to each user doc

  const userDocRef = doc(db, "users", profile.email);
  // Get the ref to foods collection in user doc
  const colRef = collection(userDocRef, "workouts");
  // add data in workouts ref
  const workoutDocs = await getDocs(colRef);

  const list = [];

  workoutDocs.forEach((doc) => {
    list.push(doc.data());
  });

  list.forEach((doc) => {
    workoutList.value.push(doc);
    workoutOptions.value.push(doc.title);
    console.log("workoutOptions :", workoutOptions);
  });
};

/** Created */
getWorkoutList();

/** Fired when workout history is selected */
const onSelectWorkoutHistory = (selectedTitle: string) => {
  workoutList.value.forEach((doc) => {
    // Set data from firebase which matches the template user selected
    if (doc.title === selectedTitle) {
      Object.assign(workoutMenus.value, doc);
    }
  });
};

/** Register formed workout menu on firebase */
const registerWorkout = async () => {
  // Get the ref to each user doc

  const userDocRef = doc(db, "users", profile.email);
  // Get the ref to foods collection in user doc
  const colRef = collection(userDocRef, "workouts");
  // add data in workouts ref
  const registeredData = await addDoc(colRef, workoutMenus.value);

  console.log("registeredWorkoutData :", registeredData);

  // Clear up all the forms
  Object.assign(workoutMenus.value, {
    date: initialDate(),
    icon: "/icons/barbel.svg",
    title: null,
    weight: null,
    reps: null,
    sets: null,
  });

  // In case when data is registered successfully
  if (registeredData) {
    successfulAlertEvent();
  }
};

// input event for workout

const inputTitle = (title: string) => {
  workoutMenus.value.title = title;
};

const inputWeight = (weight: number) => {
  workoutMenus.value.weight = weight;
};

const inputReps = (reps: number) => {
  workoutMenus.value.reps = reps;
};

const inputSets = (sets: number) => {
  workoutMenus.value.sets = sets;
};

const onSelectWorkoutDate = (date: any) => {
  workoutMenus.value.date = date;
};

////////////// Food ///////////////

/** Data that will be registered on foods doc on Firebase Store */
const foodMenus = ref({
  date: initialDate(),
  title: null,
  carbo: null,
  protein: null,
  fat: null,
  cost: null,
});

// Options displayed on food select box
const foodOptions = [];

/** All foods stored on firebase foods collection */
const foodList = ref([]);

/** get all foods on firebase that will be used on a history box */
const getFoodsList = async () => {
  // Get the ref to each user doc

  const userDocRef = doc(db, "users", profile.email);
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
    foodOptions.push(doc.title);
  });
};

/** Created */
getFoodsList();

/** Fired when food history is selected */
const onSelectFoodHistory = (selectedTitle: string) => {
  foodList.value.forEach((doc) => {
    // Set data from firebase which matches the template user selected
    if (doc.title === selectedTitle) {
      Object.assign(foodMenus.value, doc);
    }
  });
};

/** Register formed foods menu on firebase */
const registerFoods = async () => {
  // Get the ref to each user doc
  const userDocRef = doc(db, "users", profile.email);
  // Get the ref to foods collection in user doc
  const colRef = collection(userDocRef, "foods");
  // add data in foods ref
  const registeredData = await addDoc(colRef, foodMenus.value);

  console.log("registeredFoodData :", registeredData);

  // Clear up all the forms
  Object.assign(foodMenus.value, {
    date: initialDate(),
    title: null,
    carbo: null,
    protein: null,
    fat: null,
    cost: null,
  });

  // In case when data is registered successfully
  if (registeredData) {
    successfulAlertEvent();
  }
};

// input event for foods

const inputFoodTitle = (title: string) => {
  foodMenus.value.title = title;
};

const inputProtein = (protein: number) => {
  foodMenus.value.protein = protein;
};

const inputCarbo = (carbo: number) => {
  foodMenus.value.carbo = carbo;
};

const inputFat = (fat: number) => {
  foodMenus.value.fat = fat;
};

const inputCost = (cost: number) => {
  foodMenus.value.cost = cost;
};

const onSelectFoodDate = (date: any) => {
  foodMenus.value.date = date;
};
</script>

<template>
  <Header title="Register your activity" />
  <Tabs
    class="mt-16"
    first-item="WORKOUT"
    second-item="FOODS"
    @isFirstMenuClicked="onClickFirstMenu"
  />

  <div class="mt-32">
    <!-- Workout Tab -->
    <div v-if="isFirstTabClicked === true">
      <div class="mt-5 flex items-center mx-8">
        <p>Let’s see how hard you had workout today</p>
        <img :src="SittingDownGirl" alt="" />
      </div>

      <!-- When Workout tab is selected -->
      <main class="px-6 font-sans mt-3 pb-32">
        <div class="text-center">
          <!-- calendar -->
          <RoundedInput
            type="date"
            class="h-10 mb-5 rounded-lg"
            :value="initialDate()"
            @input="onSelectWorkoutDate($event.target.value)"
          />
          <!-- history -->
          <SelectBox
            placeholder="Select from the history"
            :options="workoutOptions"
            class="h-5/6 mb-3"
            @input="onSelectWorkoutHistory($event.target.value)"
          />
          <!-- title -->
          <RoundedInput
            placeholder="Enter the title"
            class="my-2"
            @inputContent="inputTitle"
            :value="workoutMenus.title"
          />

          <!-- weight -->
          <RoundedInput
            placeholder="Enter the weight"
            class="my-2"
            @inputContent="inputWeight"
            type="text"
            pattern="\d*"
            :value="workoutMenus.weight"
          />

          <!-- reps -->
          <RoundedInput
            placeholder="Enter the reps"
            class="my-2"
            type="text"
            pattern="\d*"
            @inputContent="inputReps"
            :value="workoutMenus.reps"
          />

          <!-- sets -->
          <RoundedInput
            placeholder="Enter the number of sets"
            class="my-2"
            type="text"
            pattern="\d*"
            @inputContent="inputSets"
            :value="workoutMenus.sets"
          />
          <Button
            class="bg-primary w-52 text-white mt-5 hover:bg-primary rounded-full"
            label="Done"
            @click="registerWorkout"
          />
        </div>
      </main>
    </div>

    <!-- Foods Tab -->
    <div v-if="isFirstTabClicked === false">
      <div class="mt-5 flex items-center mx-8">
        <p>Let’s see the things giving you fat :(</p>
        <img :src="GirlHavingCookie" alt="" />
      </div>

      <!-- When Foods tab is selected -->
      <main class="px-6 font-sans mt-3 pb-32">
        <div class="text-center">
          <RoundedInput
            type="date"
            class="h-10 mb-2 rounded-lg"
            :value="initialDate()"
            @inputContent="onSelectFoodDate"
          />
          <SelectBox
            placeholder="Select from the history"
            :options="foodOptions"
            class="h-5/6 my-3"
            @input="onSelectFoodHistory($event.target.value)"
          />
          <RoundedInput
            placeholder="Enter the name of a food"
            class="my-2"
            :value="foodMenus.title"
            @inputContent="inputFoodTitle"
          />
          <RoundedInput
            placeholder="Enter the amount of protein"
            class="my-2"
            :value="foodMenus.protein"
            type="text"
            pattern="\d*"
            @inputContent="inputProtein"
          />
          <RoundedInput
            placeholder="Enter the amount of fat"
            class="my-2"
            type="text"
            pattern="\d*"
            :value="foodMenus.fat"
            @inputContent="inputFat"
          />
          <RoundedInput
            placeholder="Enter the amount of carbohydrate"
            class="my-2"
            type="text"
            pattern="\d*"
            :value="foodMenus.carbo"
            @inputContent="inputCarbo"
          />
          <RoundedInput
            placeholder="Enter the cost"
            class="my-2"
            type="text"
            pattern="\d*"
            :value="foodMenus.cost"
            @inputContent="inputCost"
          />
          <Button
            class="bg-primary w-52 text-white mt-5 hover:bg-primary rounded-full"
            label="Done"
            @click="registerFoods"
          />
        </div>
      </main>
    </div>
  </div>

  <!-- Successful Alert -->
  <div class="alert shadow-lg fixed top-20 z-20" v-if="showsSuccessAlert">
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        class="stroke-info flex-shrink-0 w-6 h-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        ></path>
      </svg>
      <span>Congrats!! Succeeded to register workout data.</span>
    </div>
  </div>
  <Footer />
</template>
