<script setup lang="ts">
import { onMounted, ref } from "vue";
import { format } from "date-fns";
import { db } from "@/firebase/init";
import Alert from "@/components/organisms/commons/CommonAlert.vue";
import {
  query,
  orderBy,
  doc,
  addDoc,
  collection,
  getDocs,
  setDoc,
  getDoc,
} from "firebase/firestore";
import Tabs from "@/components/organisms/commons/CommonTabs.vue";
import Button from "@/components/atoms/commons/CommonButton.vue";
import Header from "@/components/organisms/commons/CommonHeader.vue";
import SelectBox from "@/components/atoms/commons/CommonSelectBox.vue";
import Footer from "@/components/organisms/commons/CommonFooter.vue";
import RoundedInput from "@/components/atoms/commons/CommonRoundedInput.vue";
import { useProfileStore } from "../stores/profile";

const profile = ref({
  email: "",
});
const SittingDownGirl = "/icons/SittingDownGirl.svg";
const GirlHavingCookie = "/icons/GirlHavingCookie.svg";

/** status true means you clicked WORKOUT tab */
// const isFirstTabClicked = ref(true);
const isFirstMenuClicked = ref(true);
const isSecondMenuClicked = ref(false);
const isThirdMenuClicked = ref(false);

const showsSuccessAlert = ref(false);

/////////// Tabs Control ///////////

const onClickFirstMenu = () => {
  isFirstMenuClicked.value = true;
  isSecondMenuClicked.value = false;
  isThirdMenuClicked.value = false;
};
const onClickSecondMenu = () => {
  isFirstMenuClicked.value = false;
  isSecondMenuClicked.value = true;
  isThirdMenuClicked.value = false;
};
const onClickThirdMenu = () => {
  isFirstMenuClicked.value = false;
  isSecondMenuClicked.value = false;
  isThirdMenuClicked.value = true;
};

/** Shows an alert showing you succeeded to register */
const successfulAlertEvent = () => {
  showsSuccessAlert.value = true;

  // Keeps showing a bar for 2 secs
  setTimeout(() => {
    showsSuccessAlert.value = false;
  }, 2000);
};

onMounted(async () => {
  profile.value = await useProfileStore();
  getFoodsList();
  getWorkoutList();
  getProfile();
});

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

/** get workout list from firebase */
const getWorkoutList = async () => {
  try {
    const list = [];
    const q = query(
      collection(db, "users", profile.value.email, "workouts"),
      orderBy("date", "desc")
    );
    const snapShots = await getDocs(q);
    snapShots.forEach((s) => {
      list.push(s.data());
      workoutList.value.push(s.data());
      workoutOptions.value.push(s.data().title);
    });
  } catch (e) {
    console.log(e);
  }
};

/** Fired when workout history is selected */
const onSelectWorkoutHistory = (selectedTitle: string) => {
  workoutList.value.forEach((doc) => {
    // Set data from firebase which matches the template user selected
    if (doc.title === selectedTitle) {
      doc.date = initialDate();
      Object.assign(workoutMenus.value, doc);
    }
  });
};

/** Register formed workout menu on firebase */
const registerWorkout = async () => {
  // Get the ref to each user doc
  const userDocRef = doc(db, "users", profile.value.email);
  // Get the ref to foods collection in user doc
  try {
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
  } catch (e) {
    console.log(e);
  }
};

// input event for workout

const inputTitle = (title: string) => {
  workoutMenus.value.title = title;
};
const inputReps = (reps: number) => {
  workoutMenus.value.reps = Number(reps);
};

const inputSets = (sets: number) => {
  workoutMenus.value.sets = Number(sets);
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
  try {
    // Get the ref to each user doc
    const userDocRef = doc(db, "users", profile.value.email);
    // Get the ref to foods collection in user doc
    const colRef = collection(userDocRef, "foods");
    // add data in workouts ref
    const foodDocs = await getDocs(colRef);

    const list = [];

    foodDocs.forEach((doc) => {
      list.push(doc.data());
    });

    console.log("food list :", list);

    list.forEach((doc) => {
      foodList.value.push(doc);
      foodOptions.push(doc.title);
    });
  } catch (e) {
    console.log(e);
  }
};

/** Fired when food history is selected */
const onSelectFoodHistory = (selectedTitle: string) => {
  foodList.value.forEach((doc) => {
    // Set data from firebase which matches the template user selected
    if (doc.title === selectedTitle) {
      doc.date = initialDate();
      Object.assign(foodMenus.value, doc);
    }
  });
};

/** Register formed foods menu on firebase */
const registerFoods = async () => {
  try {
    // Get the ref to each user doc
    const userDocRef = doc(db, "users", profile.value.email);
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
  } catch (e) {
    console.log(e);
  }
};

// input event for foods

const inputFoodTitle = (title: string) => {
  foodMenus.value.title = title;
};

const inputProtein = (protein: number) => {
  foodMenus.value.protein = Number(protein);
};

const inputCarbo = (carbo: number) => {
  foodMenus.value.carbo = Number(carbo);
};

const inputFat = (fat: number) => {
  foodMenus.value.fat = Number(fat);
};

const inputCost = (cost: number) => {
  foodMenus.value.cost = Number(cost);
};

const onSelectFoodDate = (date: any) => {
  foodMenus.value.date = date;
};

//////////// Weight Page ///////////
const weight = ref({
  value: null,
  date: initialDate(),
});

const bodyFat = ref({
  value: null,
  date: initialDate(),
});

const selectWeightAndFatDate = (arg: string) => {
  weight.value.date = arg;
  bodyFat.value.date = arg;
};

const inputWeight = (arg: number) => {
  weight.value.value = Number(arg);
};

const inputBodyFat = (arg: number) => {
  bodyFat.value.value = Number(arg);
};

/** Register formed foods menu on firebase */
const registerWeightAndFat = async () => {
  await registerWeight();
  await registerBodyFat();
};

const registerWeight = async () => {
  try {
    // Get the ref to each user doc
    const weightCollectionRef = collection(
      db,
      "users",
      profile.value.email,
      "weight"
    );
    // add data in weight ref
    await addDoc(weightCollectionRef, weight.value)
      .then(() => {
        successfulAlertEvent();
        getProfile();
      })
      .catch((error) => {
        console.log(`Unsuccessful returned error ${error}`);
      });
  } catch (e) {
    console.log(e);
  }
};

const registerBodyFat = async () => {
  try {
    // Get the ref to each user doc
    const bodyFatCollectionRef = collection(
      db,
      "users",
      profile.value.email,
      "bodyFat"
    );
    // add data in weight ref
    await addDoc(bodyFatCollectionRef, bodyFat.value)
      .then(() => {
        successfulAlertEvent();
        getProfile();

        // Clean up the form
        weight.value.value = null;
        bodyFat.value.value = null;
      })
      .catch((error) => {
        console.log(`Unsuccessful returned error ${error}`);
      });
  } catch (e) {
    console.log(e);
  }
};

const userProfile = ref();

/** get profile on firebase */
const getProfile = async () => {
  // Get the ref to foods collection in user doc
  const docRef = doc(db, "users", profile.value.email);

  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    userProfile.value = docSnap.data();
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }
};
</script>

<template>
  <Header title="Register your activity" />
  <Tabs
    class="mt-16"
    first-item="WORKOUT"
    second-item="FOODS"
    third-item="WEIGHT"
    @onFirstTab="onClickFirstMenu"
    @onSecondTab="onClickSecondMenu"
    @onThirdTab="onClickThirdMenu"
  />

  <div class="mt-32 lg:w-screen">
    <!-- Workout Tab -->
    <div v-if="isFirstMenuClicked === true">
      <div class="mt-5 flex lg:justify-center items-center mx-8 lg:w-screen">
        <p>Let’s see how hard you had workout today</p>
        <img :src="SittingDownGirl" alt="" />
      </div>

      <!-- When Workout tab is selected -->
      <main class="px-6 font-sans mt-3 pb-32 lg:flex lg:justify-center">
        <div class="text-center lg:w-screen">
          <!-- calendar -->
          <p class="font-medium text-base ml-3 lg:ml-80 text-left mb-2">Date</p>
          <RoundedInput
            type="date"
            class="h-10 lg:w-4/12 mb-5 rounded-lg"
            :value="workoutMenus.date"
            @input="onSelectWorkoutDate($event.target.value)"
          />
          <!-- history -->
          <p class="font-medium text-base ml-3 lg:ml-80 text-left mb-2">
            History
          </p>
          <SelectBox
            placeholder="Select from the history"
            :options="workoutOptions"
            class="h-5/6 mb-3 lg:w-4/12"
            @input="onSelectWorkoutHistory($event.target.value)"
          />
          <!-- title -->
          <p class="font-medium text-base ml-3 lg:ml-80 text-left mb-2">
            Name Of Workout
          </p>
          <RoundedInput
            placeholder="Enter the title"
            class="my-2 lg:w-4/12"
            @inputContent="inputTitle"
            :value="workoutMenus.title"
          />

          <!-- weight -->
          <p class="font-medium text-base ml-3 lg:ml-80 text-left mb-2">
            Weight
          </p>
          <RoundedInput
            placeholder="Enter the weight"
            class="my-2 lg:w-4/12"
            @inputContent="inputWeight"
            type="text"
            pattern="\d*"
            :value="workoutMenus.weight"
          />

          <!-- reps -->
          <p class="font-medium text-base ml-3 lg:ml-80 text-left mb-2">Reps</p>
          <RoundedInput
            placeholder="Enter the reps"
            class="my-2 lg:w-4/12"
            type="text"
            pattern="\d*"
            @inputContent="inputReps"
            :value="workoutMenus.reps"
          />

          <!-- sets -->
          <p class="font-medium text-base ml-3 lg:ml-80 text-left mb-2">Sets</p>
          <RoundedInput
            placeholder="Enter the number of sets"
            class="my-2 lg:w-4/12"
            type="text"
            pattern="\d*"
            @inputContent="inputSets"
            :value="workoutMenus.sets"
          />
          <div class="flex justify-center">
            <Button
              class="bg-primary w-52 lg:w-2/12 text-white mt-5 hover:bg-primary rounded-full lg:block"
              label="Done"
              @click="registerWorkout"
            />
          </div>
        </div>
      </main>
    </div>

    <!-- Foods Tab -->
    <div v-if="isSecondMenuClicked === true">
      <div class="mt-5 flex lg:justify-center items-center mx-8">
        <p>Let’s see the things giving you fat :(</p>
        <img :src="GirlHavingCookie" alt="" />
      </div>

      <!-- When Foods tab is selected -->
      <main class="px-6 font-sans mt-3 pb-32 lg:flex lg:justify-center">
        <div class="text-center lg:w-screen">
          <p class="font-medium text-base ml-3 lg:ml-80 text-left mb-2">Date</p>
          <RoundedInput
            type="date"
            class="h-10 mb-2 rounded-lg lg:w-4/12"
            :value="foodMenus.date"
            @inputContent="onSelectFoodDate"
          />

          <p class="font-medium text-base ml-3 lg:ml-80 text-left mb-2">
            History
          </p>
          <SelectBox
            placeholder="Select from the history"
            :options="foodOptions"
            class="h-5/6 my-3 lg:w-4/12"
            @input="onSelectFoodHistory($event.target.value)"
          />

          <p class="font-medium text-base ml-3 lg:ml-80 text-left mb-2">Food</p>
          <RoundedInput
            placeholder="Enter the name of a food"
            class="my-2 lg:w-4/12"
            :value="foodMenus.title"
            @inputContent="inputFoodTitle"
          />

          <p class="font-medium text-base ml-3 lg:ml-80 text-left mb-2">
            Protein
          </p>
          <RoundedInput
            placeholder="Enter the amount of protein"
            class="my-2 lg:w-4/12"
            :value="foodMenus.protein"
            type="text"
            pattern="\d*"
            @inputContent="inputProtein"
          />

          <p class="font-medium text-base ml-3 lg:ml-80 text-left mb-2">Fat</p>
          <RoundedInput
            placeholder="Enter the amount of fat"
            class="my-2 lg:w-4/12"
            type="text"
            pattern="\d*"
            :value="foodMenus.fat"
            @inputContent="inputFat"
          />

          <p class="font-medium text-base ml-3 lg:ml-80 text-left mb-2">
            Carbo
          </p>
          <RoundedInput
            placeholder="Enter the amount of carbohydrate"
            class="my-2 lg:w-4/12"
            type="text"
            pattern="\d*"
            :value="foodMenus.carbo"
            @inputContent="inputCarbo"
          />

          <p class="font-medium text-base ml-3 lg:ml-80 text-left mb-2">Cost</p>
          <RoundedInput
            placeholder="Enter the cost"
            class="my-2 lg:w-4/12"
            type="text"
            pattern="\d*"
            :value="foodMenus.cost"
            @inputContent="inputCost"
          />
          <div class="flex justify-center">
            <Button
              class="bg-primary w-52 text-white mt-5 hover:bg-primary rounded-full lg:block lg:w-2/12"
              label="Done"
              @click="registerFoods"
            />
          </div>
        </div>
      </main>
    </div>

    <!-- Weight Tab -->
    <div v-if="isThirdMenuClicked === true">
      <div>
        <div class="mt-5 flex lg:justify-center items-center mx-8">
          <p>Body fat is what you really should care about</p>
          <img src="/icons/pilates.svg" alt="" />
        </div>
        <main class="px-6 font-sans mt-3 pb-32 lg:flex lg:justify-center">
          <div class="text-center lg:w-screen">
            <p class="font-medium text-base ml-3 lg:ml-80 text-left mb-2">
              Date
            </p>
            <RoundedInput
              type="date"
              class="h-10 mb-2 rounded-lg lg:w-4/12"
              :value="initialDate()"
              @inputContent="selectWeightAndFatDate"
            />

            <h2 class="text-base mx-3 mt-2 text-left font-medium lg:ml-80">
              Weight
            </h2>
            <RoundedInput
              placeholder="Enter your weight"
              class="my-2 lg:w-4/12"
              type="text"
              pattern="\d*"
              :value="weight.value"
              @inputContent="inputWeight"
            />
            <h2 class="text-base mx-3 text-left mt-3 font-medium lg:ml-80">
              Body Fat
            </h2>
            <RoundedInput
              placeholder="Enter your body fat"
              class="my-2 lg:w-4/12"
              type="text"
              pattern="\d*"
              :value="bodyFat.value"
              @inputContent="inputBodyFat"
            />
            <div class="flex justify-center">
              <Button
                class="bg-primary w-52 text-white mt-5 hover:bg-primary rounded-full lg:block lg:w-2/12"
                label="Done"
                @click="registerWeightAndFat"
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  </div>

  <!-- Success Alert -->
  <Alert
    :showsSuccessAlert="showsSuccessAlert"
    label="Congrats!! Succeeded to register workout data"
    class="fixed top-28"
  />
  <Footer />
</template>
