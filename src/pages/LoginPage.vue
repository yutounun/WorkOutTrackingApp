<script setup lang="ts">
import { ref } from "vue";
import Button from "@/components/atoms/commons/CommonButton.vue";
import RoundedInput from "@/components/atoms/commons/CommonRoundedInput.vue";
import { useRouter } from "vue-router";
import { signIn } from "@/apis/signIn";
import { useProfileStore } from "../stores/profile";

const profile = useProfileStore();
const router = useRouter();
const email = ref("");
const password = ref("");

/** Go to Home page after login */
const onClickLogin = async () => {
  // Persist email across pages on Pinia
  profile.email = email.value;

  const status = await signIn(email.value, password.value);
  // If signup can get done successfully
  console.log("status :", status);
  if (status) {
    router.push("/register");
  }
};
const inputEmail = (e: string) => {
  email.value = e;
};
const inputPass = (e: string) => {
  password.value = e;
};
</script>

<template>
  <main class="px-6 font-sans h-screen w-screen flex justify-center">
    <div class="flex flex-col sm:justify-center lg:justify-start items-center">
      <h1 class="text-2xl lg:text-3xl pt-12 font-bold mt-5">Login</h1>

      <!-- Email -->
      <div>
        <label
          for="email"
          class="text-xs lg:text-base font-bold text-left block mb-2 mt-16"
        >
          Email
        </label>
        <RoundedInput
          id="email"
          placeholder="Enter Your Email"
          class="w-full mb-5"
          @inputContent="inputEmail"
        />
      </div>

      <div>
        <label
          for="password"
          class="text-xs lg:text-base font-bold text-left block mb-2 mt-5"
        >
          Password
        </label>
        <RoundedInput
          id="password"
          placeholder="Enter Password"
          type="password"
          class="w-full mb-16"
          @inputContent="inputPass"
        />
      </div>

      <!-- Login Button -->
      <div class="flex justify-center">
        <Button
          label="Login"
          class="text-white bg-primary hover:bg-primary mb-8"
          @click="onClickLogin"
        />
      </div>

      <!-- Go to create account page -->
      <div class="text-accent">
        <span>Don't have an account?? </span>
        <a
          class="mt-5 font-semibold text-accent hover:bg-white cursor-alias"
          @click="$router.push('/create-account')"
        >
          Create one here.
        </a>
      </div>
    </div>
  </main>
</template>
