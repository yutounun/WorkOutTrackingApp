<script setup lang="ts">
import { onMounted, ref } from "vue";
import { db } from "@/firebase/init";
import { doc, setDoc, getDoc } from "firebase/firestore";
import Button from "@/components/atoms/commons/CommonButton.vue";
import RoundedInput from "@/components/atoms/commons/CommonRoundedInput.vue";
import { useProfileStore } from "@/stores/profile";
import { useRouter } from "vue-router";

const router = useRouter();
const email = ref("");

const showsSuccessAlert = ref(false);
const BackgroundRound = "/icons/BackgroundRound.svg";

/** Data that will be registered on user doc on Firebase Store */
const profile = ref({
  userName: null,
  currentWeight: null,
  idealWeight: null,
  currentBodyFat: null,
  idealBodyFat: null,
});

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

/** Register profile on firebase */
const registerProfile = async () => {
  // Get the ref to each user doc
  const userDocRef = doc(db, "users", email.value);
  await setDoc(userDocRef, profile.value)
    .then(() => {
      successfulAlertEvent();
      // Clear up all the forms
      Object.assign(profile.value, {
        userName: null,
        currentWeight: null,
        idealWeight: null,
        currentBodyFat: null,
        idealBodyFat: null,
      });
      router.push("/");
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
const inputCurrentWeight = (weight: string) => {
  profile.value.currentWeight = weight;
};
const inputIdealWeight = (weight: string) => {
  profile.value.idealWeight = weight;
};
const inputCurrentBodyFat = (fat: string) => {
  profile.value.currentBodyFat = fat;
};
const inputIdealBodyFat = (fat: string) => {
  profile.value.idealBodyFat = fat;
};
</script>

<template>
  <header
    class="px-6 font-sans h-1/3 bg-primary relative font-bold flex flex-col items-center gap-5 pt-3"
  >
    <!-- round icons on background -->
    <img :src="BackgroundRound" alt="" class="absolute -top-10 -left-20" />
    <img :src="BackgroundRound" alt="" class="absolute top-10 -left-20" />
    <img :src="BackgroundRound" alt="" class="absolute bottom-10 -right-20" />

    <p class="text-white font-semibold block text-xl">Profile</p>

    <!-- profile picture -->
    <div class="relative">
      <img src="/icons/SmallProfile.svg" alt="" class="h-28 w-28" />
      <img src="/icons/edit.svg" alt="" class="mr-2 absolute top-0 -left-1" />
    </div>

    <div class="flex items-center">
      <p class="text-white font-semibold text-lg block">Yuto Ichihara</p>
    </div>
  </header>

  <div class="mt-10 bg-white z-50">
    <main class="px-6 font-sans mt-3 pb-32">
      <div class="text-center">
        <!-- user name -->
        <p class="text-left mx-7">User Name</p>
        <RoundedInput
          placeholder="Enter your name"
          class="mb-4 mt-2"
          @inputContent="inputUserName"
          :value="profile.userName"
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
          @click="router.push('/')"
        />
      </div>
    </main>
  </div>

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
  <Footer />
</template>
