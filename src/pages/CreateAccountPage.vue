<script setup lang="ts">
import { ref } from "vue";
import Button from "@/components/atoms/commons/CommonButton.vue";
import RoundedInput from "@/components/atoms/commons/CommonRoundedInput.vue";
import { useRouter } from "vue-router";
import { signUp } from "@/apis/signUp";

const router = useRouter();
const email = ref("");
const password = ref("");

/** Go to Login page after create an account */
const onClickCreate = () => {
  try {
    signUp(email.value, password.value);
  } finally {
    router.push("/");
  }
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

      <!-- Email -->
      <div>
        <p class="text-xs font-bold text-left mb-2 mt-16">Email</p>
        <RoundedInput
          placeholder="Enter email"
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
      <div class="flex items-center">
        <span class="text-accent">Have an account?? </span>
        <a class="text-accent font-semibold" @click="$router.push('/login')">
          Sign up here.
        </a>
      </div>
    </div>
  </main>
</template>
