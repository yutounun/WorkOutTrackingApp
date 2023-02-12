<script setup lang="ts">
import { ref } from "vue";
import { setDoc, doc } from "firebase/firestore";
import { db } from "@/firebase/init";

import Button from "@/components/atoms/commons/CommonButton.vue";
import RoundedInput from "@/components/atoms/commons/CommonRoundedInput.vue";
import { useRouter } from "vue-router";
import { signUp } from "@/apis/signUp";
import { useProfileStore } from "../stores/profile";

const profile = useProfileStore();
const router = useRouter();
const userName = ref("");
const bodyFat = ref("");
const email = ref("");
const password = ref("");

/** Register users account data on firebase */
const registerAccountOnFirebase = async () => {
  // Persist email across pages on Pinia
  profile.email = email.value;

  const params = {
    userName: userName.value,
    email: email.value,
  };

  // set user account
  const sentData = await setDoc(doc(db, "users", email.value), params);
  return sentData;
};

/** Go to Login page after create an account */
const onClickCreate = async () => {
  const status = await signUp(email.value, password.value);

  // If signup can get done successfully
  if (status) {
    router.push("/");
  }
  registerAccountOnFirebase();
};

/** Set userName in variable */
const inputUserName = (e: string) => {
  userName.value = e;
};
/** Set body fat in variable */
const inputBodyFat = (e: string) => {
  bodyFat.value = e;
};
/** Set email in variable */
const inputEmail = (e: string) => {
  email.value = e;
};
/** Set password in variable */
const inputPass = (e: string) => {
  password.value = e;
};
</script>

<template>
  <main class="px-6 font-sans h-screen">
    <div class="flex justify-center items-center flex-col">
      <h1 class="text-2xl pt-12 font-bold mt-5">Create your account</h1>

      <!-- UserName -->
      <div>
        <p class="text-xs font-bold text-left mb-2 mt-16">User Name</p>
        <RoundedInput
          placeholder="Enter your name"
          class="w-full mb-5"
          @inputContent="inputUserName"
        />
      </div>

      <!-- BodyFat -->
      <div>
        <p class="text-xs font-bold text-left mb-2 mt-5">Current Body Fat</p>
        <RoundedInput
          placeholder="Enter your current body fat"
          class="w-full mb-5"
          type="text"
          pattern="\d*"
          @inputContent="inputBodyFat"
        />
      </div>

      <!-- Email -->
      <div>
        <p class="text-xs font-bold text-left mb-2 mt-5">Email</p>
        <RoundedInput
          placeholder="Enter your email"
          class="w-full mb-5"
          @inputContent="inputEmail"
        />
      </div>

      <!-- Password -->
      <div>
        <p class="text-xs font-bold text-left mb-2 mt-5">Password</p>
        <RoundedInput
          placeholder="Enter password"
          type="password"
          class="w-full mb-16"
          @inputContent="inputPass"
        />
      </div>

      <!-- Create Button -->
      <div class="flex justify-center">
        <Button
          label="Create"
          class="text-white block bg-primary mb-8 hover:bg-primary"
          @click="onClickCreate"
        />
      </div>

      <!-- Go to login page -->
      <div class="flex items-center mb-20">
        <span class="text-accent">Have an account?? </span>
        <a class="text-accent font-semibold" @click="$router.push('/login')">
          Sign up here.
        </a>
      </div>
    </div>
  </main>
</template>
