<script setup lang="ts">
import { ref } from "vue";
import Button from "@/components/atoms/commons/CommonButton.vue";
import RoundedInput from "@/components/atoms/commons/CommonRoundedInput.vue";
import { useRouter } from "vue-router";
import { signIn } from "@/apis/signIn";

const router = useRouter();
const email = ref("");
const password = ref("");

/** Go to Home page after login */
const onClickLogin = () => {
  try {
    signIn(email.value, password.value);
  } finally {
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
  <main class="px-6 font-sans h-screen">
    <div class="flex justify-center items-center flex-col">
      <h1 class="text-2xl pt-12 font-bold mt-5">Login</h1>

      <!-- Email -->
      <div>
        <label for="email" class="text-xs font-bold text-left block mb-2 mt-16">
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
          class="text-xs font-bold text-left block mb-2 mt-5"
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
          class="mt-5 font-semibold text-accent"
          @click="$router.push('/create-account')"
        >
          Create one here.
        </a>
      </div>
    </div>
  </main>
</template>
