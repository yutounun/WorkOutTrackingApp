<script setup lang="ts">
import { computed, onMounted, readonly, ref } from "vue";
import { db } from "@/firebase/init";
import { doc, setDoc, getDoc } from "firebase/firestore";
import Footer from "@/components/organisms/commons/CommonFooter.vue";
import Button from "@/components/atoms/commons/CommonButton.vue";
import RoundedInput from "@/components/atoms/commons/CommonRoundedInput.vue";
import SelectBox from "@/components/atoms/commons/CommonSelectBox.vue";
import { useProfileStore } from "@/stores/profile";

const email = ref("");

const showsSuccessAlert = ref(false);
const BackgroundRound = "/icons/BackgroundRound.svg";
const genderOptions = readonly(["Male", "Female"]);

/** Data that will be registered on user doc on Firebase Store */
const profile = ref({
  userName: null,
  age: null,
  gender: null,
  height: null,
  currentWeight: null,
  idealWeight: null,
  currentBodyFat: null,
  idealBodyFat: null,
  basalMetabolism: null,
});

const isEdited = ref(false);

onMounted(async () => {
  email.value = await useProfileStore().email;
  getProfile();
});

/** get profile on firebase */
const getProfile = async () => {
  // Get the ref to foods collection in user doc
  const docRef = doc(db, "users", email.value);

  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    console.log("persisted profile:", docSnap.data());
    Object.assign(profile.value, docSnap.data());
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }
};

const basalMetabolism = computed(() => {
  return (
    66.47 +
    profile.value.currentWeight * 13.75 +
    profile.value.height * 5.0 -
    profile.value.age * 6.76
  );
});

/** Register profile on firebase */
const registerProfile = async () => {
  // Add basal metabolism
  profile.value.basalMetabolism = basalMetabolism;
  console.log("profile.value :", profile.value);
  // Get the ref to each user doc
  const userDocRef = doc(db, "users", email.value);
  await setDoc(userDocRef, profile.value)
    .then(() => {
      successfulAlertEvent();
      isEdited.value = false;
      getProfile();
      isEdited.value = false;
    })
    .catch((error) => {
      console.log(`Unsuccessful returned error ${error}`);
    });
};

/** Shows an alert showing you succeeded to register */
const successfulAlertEvent = () => {
  showsSuccessAlert.value = true;

  // Keeps showing a bar for 2 secs
  setTimeout(() => {
    showsSuccessAlert.value = false;
  }, 2000);
};

const inputUserName = (name: string) => {
  profile.value.userName = name;
};
const inputUserAge = (age: number) => {
  profile.value.age = Number(age);
};
const inputUserHeight = (height: number) => {
  profile.value.height = Number(height);
};
const inputCurrentWeight = (weight: number) => {
  profile.value.currentWeight = Number(weight);
};
const inputIdealWeight = (weight: number) => {
  profile.value.idealWeight = Number(weight);
};
const inputCurrentBodyFat = (fat: number) => {
  profile.value.currentBodyFat = Number(fat);
};
const inputIdealBodyFat = (fat: number) => {
  profile.value.idealBodyFat = Number(fat);
};
const selectGender = (gender: string) => {
  profile.value.gender = gender;
};
</script>

<template>
  <header
    class="px-6 font-sans h-2/5 bg-primary relative font-bold flex flex-col items-center gap-5 pt-3 z-40"
  >
    <!-- round icons on background -->
    <img :src="BackgroundRound" alt="" class="absolute -top-10 -left-20" />
    <img :src="BackgroundRound" alt="" class="absolute top-10 -left-20" />
    <img :src="BackgroundRound" alt="" class="absolute bottom-10 -right-20" />

    <p class="text-white font-semibold text-xl block">Profile</p>

    <!-- profile picture -->
    <div class="relative">
      <img src="/icons/SmallProfile.svg" alt="" class="h-28 w-28" />
      <img src="/icons/edit.svg" alt="" class="mr-2 absolute top-0 -right-5" />
    </div>

    <div class="flex items-center">
      <p class="text-white font-semibold text-lg block pb-20">
        {{ profile.userName }}
      </p>
    </div>
  </header>

  <div class="mt-10 bg-white mb-20">
    <main class="px-6 font-sans mt-3 pb-10">
      <!-- Editing mode -->
      <div class="text-center" v-if="isEdited">
        <!-- user name -->
        <p class="text-left mx-7">User Name</p>
        <RoundedInput
          placeholder="Enter your name"
          class="mb-4 mt-2"
          @inputContent="inputUserName"
          :value="profile.userName"
        />

        <!-- age -->
        <p class="text-left mx-7">Age</p>
        <RoundedInput
          placeholder="Enter your age"
          class="mb-4 mt-2"
          @inputContent="inputUserAge"
          :value="profile.age"
        />

        <!-- gender -->
        <p class="text-left mx-7 mb-3">Gender</p>
        <SelectBox
          placeholder="Gender"
          :options="genderOptions"
          @input="selectGender($event.target.value)"
        ></SelectBox>

        <!-- height -->
        <p class="text-left mx-7 mt-3">Height</p>
        <RoundedInput
          placeholder="Enter your height"
          class="mb-4 mt-2"
          @inputContent="inputUserHeight"
          :value="profile.height"
        />

        <!-- current weight -->
        <p class="text-left mx-7">Current Weight</p>
        <RoundedInput
          placeholder="Enter your current weight"
          class="mb-4 mt-2"
          @inputContent="inputCurrentWeight"
          type="text"
          pattern="\d*"
          :value="profile.currentWeight"
        />

        <!-- ideal weight -->
        <p class="text-left mx-7">Ideal Weight</p>
        <RoundedInput
          placeholder="Enter your ideal weight"
          class="mb-4 mt-2"
          type="text"
          pattern="\d*"
          @inputContent="inputIdealWeight"
          :value="profile.idealWeight"
        />

        <!-- current body fat -->
        <p class="text-left mx-7">Current Body Fat</p>
        <RoundedInput
          placeholder="Enter your current body fat"
          class="mb-4 mt-2"
          type="text"
          pattern="\d*"
          @inputContent="inputCurrentBodyFat"
          :value="profile.currentBodyFat"
        />

        <!-- ideal body weight -->
        <p class="text-left mx-7">Ideal Body Fat</p>
        <RoundedInput
          placeholder="Enter your ideal body fat"
          class="mb-4 mt-2"
          type="text"
          pattern="\d*"
          @inputContent="inputIdealBodyFat"
          :value="profile.idealBodyFat"
        />

        <Button
          class="bg-primary w-52 text-white mt-5 hover:bg-primary rounded-full"
          label="Done"
          @click="registerProfile"
        />

        <Button
          class="bg-white w-52 text-gray-3 mt-5 hover:bg-white rounded-full border-none"
          label="Cancel"
          @click="isEdited = false"
        />
      </div>

      <!-- Not editing mode -->
      <div class="mx-7" v-else>
        <!-- user name -->
        <div>
          <p class="text-left mb-3 mt-5 font-semibold">User Name</p>
          {{ profile.userName ? profile.userName : "No Information" }}
        </div>

        <!-- age -->
        <div>
          <p class="text-left mb-3 mt-5 font-semibold">Age</p>
          <p v-if="profile.age">{{ profile.age }} years old</p>
          <p v-else>No Information</p>
        </div>

        <!-- gender -->
        <div>
          <p for="gender" class="text-left mb-3 mt-5 font-semibold">Gender</p>
          {{ profile.gender ? profile.gender : "No Information" }}
        </div>

        <!-- height -->
        <div>
          <p class="text-left mb-3 mt-5 font-semibold">Height</p>
          <p v-if="profile.height">{{ profile.height }} cm</p>
          <p v-else>No Information</p>
        </div>

        <!-- current weight -->
        <div>
          <p class="text-left mb-3 mt-5 font-semibold">Current Weight</p>
          <p v-if="profile.currentWeight">{{ profile.currentWeight }} kg</p>
          <p v-else>No Information</p>
        </div>

        <!-- ideal weight -->
        <div>
          <p class="text-left mb-3 mt-5 font-semibold">Ideal Weight</p>
          <p v-if="profile.idealWeight">{{ profile.idealWeight }} kg</p>
          <p v-else>No Information</p>
        </div>

        <!-- current body fat -->
        <div>
          <p class="text-left mb-3 mt-5 font-semibold">Current Body Fat</p>
          <p v-if="profile.currentBodyFat">{{ profile.currentBodyFat }} %</p>
          <p v-else>No Information</p>
        </div>

        <!-- ideal body weight -->
        <div>
          <p class="text-left mb-3 mt-5 font-semibold">Ideal Body Fat</p>
          <p v-if="profile.idealBodyFat">{{ profile.idealBodyFat }} %</p>
          <p v-else>No Information</p>
        </div>

        <!-- basal metabolism -->
        <div>
          <p class="text-left mb-3 mt-5 font-semibold">Basal Metabolism</p>
          <p v-if="profile.basalMetabolism">{{ profile.basalMetabolism }} g</p>
          <p v-else>No Information</p>
        </div>

        <div class="text-center">
          <Button
            class="bg-primary w-52 text-white mt-5 hover:bg-primary rounded-full"
            label="Edit"
            @click="isEdited = true"
          />
        </div>
      </div>
    </main>
  </div>
  <Footer profile />

  <!-- Successful Alert -->
  <div class="alert shadow-lg fixed top-0 z-20" v-if="showsSuccessAlert">
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
</template>
