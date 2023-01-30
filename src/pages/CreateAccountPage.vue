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
    <div class="text-center">
      <h1 class="text-2xl pt-12 font-bold mt-5">Create an account</h1>

      <!-- Email -->
      <p class="text-xs font-bold text-left mb-2 mt-16">Email</p>
      <RoundedInput
        placeholder="Enter email"
        class="w-full mb-5"
        @inputContent="inputEmail"
      />

      <!-- Password -->
      <p class="text-xs font-bold text-left mb-2">Password</p>
      <RoundedInput
        placeholder="Enter password"
        type="password"
        class="w-full mb-20"
        @inputContent="inputPass"
      />

      <!-- Create Button -->
      <Button
        label="Create"
        class="text-white bg-primary mb-4 hover:bg-primary"
        @click="onClickCreate"
      />

      <!-- Go to login page -->
      <a class="block mt-5" @click="$router.push('/login')">
        Do you already have an account??
      </a>
    </div>
  </main>
</template>
