<script setup lang="ts">
import { reactive, ref } from "vue";
import { registerData } from "@/apis/postFirebase";
import Tabs from "@/components/organisms/commons/CommonTabs.vue";
import Button from "@/components/atoms/commons/CommonButton.vue";
import Header from "@/components/organisms/commons/CommonHeader.vue";
import SelectBox from "@/components/atoms/commons/CommonSelectBox.vue";
import Footer from "@/components/organisms/commons/CommonFooter.vue";
import RoundedInput from "@/components/atoms/commons/CommonRoundedInput.vue";
import { useRouter } from "vue-router";

const router = useRouter();
const SittingDownGirl = "/icons/SittingDownGirl.svg";
const GirlHavingCookie = "/icons/GirlHavingCookie.svg";

/** status true means you clicked WORKOUT tab */
const isFirstTabClicked = ref(true);

const showsSuccessAlert = ref(false);

const onClickFirstMenu = (status: any) => {
  isFirstTabClicked.value = status;
};

/** Data that will be registered on workout doc on Firebase Store */
const workoutMenus = ref({
  icon: "/icons/barbel.svg",
  title: null,
  weight: null,
  reps: null,
  time: null,
});

/** Register formed workout menu on firebase */
const registerWorkout = async () => {
  const registeredData = await registerData("workout", workoutMenus.value);

  // Clear up all the forms
  Object.assign(workoutMenus.value, {
    icon: "/icons/barbel.svg",
    title: null,
    weight: null,
    reps: null,
    time: null,
  });

  // In case when data is registered successfully
  if (registeredData) {
    showsSuccessAlert.value = true;

    // Keeps showing a bar for 2 secs
    setTimeout(() => {
      showsSuccessAlert.value = false;
    }, 2000);
  }
};

const inputTitle = (title: string) => {
  workoutMenus.value.title = title;
};

const inputWeight = (weight: number) => {
  workoutMenus.value.weight = weight;
};

const inputReps = (reps: number) => {
  workoutMenus.value.reps = reps;
};

const inputTime = (time: number) => {
  workoutMenus.value.time = time;
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

  <!-- Workout Tab -->
  <div v-if="isFirstTabClicked === true">
    <div class="mt-5 flex items-center mx-8">
      <p>Let’s see how hard you had workout today</p>
      <img :src="SittingDownGirl" alt="" />
    </div>

    <!-- When Workout tab is selected -->
    <main class="px-6 font-sans mt-3 pb-32">
      <div class="text-center">
        <!-- title -->
        <RoundedInput
          placeholder="Enter the title"
          class="my-2"
          @inputContent="inputTitle"
          :value="workoutMenus.title"
        />

        <span class="block font-bold my-3">OR</span>

        <!-- templates -->
        <SelectBox
          placeholder="Choose your title"
          :options="['Push up bar', 'Tread mill', 'Aero bike']"
          class="h-5/6 mb-3"
        />

        <!-- weight -->
        <RoundedInput
          placeholder="Enter the weight"
          class="my-2"
          @inputContent="inputWeight"
          :value="workoutMenus.weight"
        />

        <!-- reps -->
        <RoundedInput
          placeholder="Enter the reps"
          class="my-2"
          @inputContent="inputReps"
          :value="workoutMenus.reps"
        />

        <!-- time -->
        <RoundedInput
          placeholder="Enter how long it takes"
          class="my-2"
          @inputContent="inputTime"
          :value="workoutMenus.time"
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
        <SelectBox
          placeholder="Select from templates"
          :options="['Push up bar', 'Tread mill', 'Aero bike']"
          class="h-5/6 my-3"
        />
        <RoundedInput placeholder="Enter the menu" class="my-2" />
        <RoundedInput placeholder="Enter the amount of protein" class="my-2" />
        <RoundedInput placeholder="Enter the amount of fat" class="my-2" />
        <RoundedInput
          placeholder="Enter the amount of carbohydrate"
          class="my-2"
        />
        <RoundedInput placeholder="Enter the cost" class="my-2" type="number" />
        <Button
          class="bg-primary w-52 text-white mt-5 hover:bg-primary rounded-full"
          label="Done"
          @click="router.push('/login')"
        />
      </div>
    </main>
  </div>

  <div class="alert shadow-lg fixed top-20" v-if="showsSuccessAlert">
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
