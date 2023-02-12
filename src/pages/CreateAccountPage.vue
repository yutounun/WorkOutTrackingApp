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
const weight = ref("");
const email = ref("");
const password = ref("");

/** Register users account data on firebase */
const registerAccountOnFirebase = async () => {
  // Persist email across pages on Pinia
  profile.email = email.value;

  const params = {
    userName: userName.value,
    email: email.value,
    weight: weight.value,
  };

  // set user account
  const sentData = await setDoc(doc(db, "users", email.value), params);
  return sentData;
};

/** Go to Login page after create an account */
const onClickCreate = () => {
  try {
    signUp(email.value, password.value);
    registerAccountOnFirebase();
  } finally {
    router.push("/");
  }
};

/** Set userName in variable */
const inputUserName = (e: string) => {
  userName.value = e;
};
/** Set weight in variable */
const inputWeight = (e: string) => {
  weight.value = e;
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

      <!-- Weight -->
      <div>
        <p class="text-xs font-bold text-left mb-2 mt-5">Weight</p>
        <RoundedInput
          placeholder="Enter your weight"
          class="w-full mb-5"
          type="text"
          pattern="\d*"
          @inputContent="inputWeight"
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
