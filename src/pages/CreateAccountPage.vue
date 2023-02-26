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
    router.push("/profile");
  }
  registerAccountOnFirebase();
};

/** Set userName in variable */
const inputUserName = (e: string) => {
  userName.value = e;
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
      <h1 class="text-2xl pt-12 font-bold mt-3">Create your account</h1>

      <!-- UserName -->
      <div>
        <p class="text-xs font-bold text-left mb-2 mt-10">User Name</p>
        <RoundedInput
          placeholder="Enter your name"
          class="w-full mb-5"
          @inputContent="inputUserName"
        />
      </div>

      <!-- Email -->
      <div>
        <p class="text-xs font-bold text-left mb-2 mt-3">Email</p>
        <RoundedInput
          placeholder="Enter your email"
          class="w-full mb-5"
          @inputContent="inputEmail"
        />
      </div>

      <!-- Password -->
      <div>
        <p class="text-xs font-bold text-left mb-2 mt-3">Password</p>
        <RoundedInput
          placeholder="Enter password"
          type="password"
          class="w-full mb-10"
          @inputContent="inputPass"
        />
      </div>

      <!-- Create Button -->
      <div class="flex justify-center">
        <Button
          label="Create"
          class="text-white block bg-primary mb-4 hover:bg-primary"
          @click="onClickCreate"
        />
      </div>

      <!-- Tutorial Button to open a modal -->
      <label for="my-modal" class="btn w-48 mb-7">Watch a Tutorial</label>

      <!-- Go to login page -->
      <div class="flex items-center mb-5">
        <span class="text-accent">Have an account?? </span>
        <a class="text-accent font-semibold" @click="$router.push('/login')">
          Sign up here.
        </a>
      </div>
    </div>
  </main>

  <!-- Tutorial Modal -->
  <input type="checkbox" id="my-modal" class="modal-toggle" />
  <div class="modal absolute h-full">
    <div class="modal-box">
      <!-- Tutorial -->
      <div class="carousel w-full">
        <div
          id="slide1"
          class="carousel-item w-full flex items-center justify-between"
        >
          <a class="text-white">❮</a>
          <div class="mx-3 w-2/3">
            This app helps you track your daily workout, foods, weight, and body
            fat.
          </div>
          <a href="#slide2" class="">❯</a>
        </div>
        <div id="slide2" class="carousel-item w-full flex items-center">
          <a href="#slide1" class="">❮</a>
          <div class="mx-10 w-2/3">
            On the registration page, you can register those by selecting the
            tab you'd like to register.
          </div>
          <a href="#slide3" class="">❯</a>
        </div>
        <div id="slide3" class="carousel-item w-full flex items-center">
          <a href="#slide2" class="">❮</a>
          <div class="mx-10 w-2/3">
            On the food list page, you can see the list of foods you've had
            before including protein, fat, carbo. Also, you can edit and remove
            registered data.
          </div>
          <a href="#slide4" class="">❯</a>
        </div>
        <div id="slide4" class="carousel-item w-full flex items-center">
          <a href="#slide3" class="">❮</a>
          <div class="mx-10 w-2/3">
            On the workout list page, you can do same things as you do on foods
            list page.
          </div>
          <a href="#slide5" class="">❯</a>
        </div>
        <div id="slide5" class="carousel-item w-full flex items-center">
          <a href="#slide4" class="">❮</a>
          <div class="mx-10 w-2/3">
            On the profile page, you can see your own profile including your
            current and ideal status such as weight and body fat. You can also
            edit your information and image at anytime.
          </div>
          <a href="#slide6" class="">❯</a>
        </div>
        <div id="slide6" class="carousel-item w-full flex items-center">
          <a href="#slide5" class="">❮</a>
          <div class="mx-10 w-2/3">
            On the chart page, you can compare your current status and goal.
            Also, that shows you chart graphs with PFC balance from your recent
            meals history, and with weight and body fat from registered history.
          </div>
          <a class="text-white">❯</a>
        </div>
      </div>
      <div class="modal-action">
        <label for="my-modal" class="btn">DONE!</label>
      </div>
    </div>
  </div>
</template>
