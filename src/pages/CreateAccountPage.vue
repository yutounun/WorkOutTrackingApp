<script setup lang="ts">
import { ref } from "vue";
import Button from "@/components/atoms/commons/CommonButton.vue";
import RoundedInput from "@/components/atoms/commons/CommonRoundedInput.vue";
import { useRouter } from "vue-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/init";

const router = useRouter();
const email = ref("");
const password = ref("");

/** Go to Login page after create an account */
const onClickCreate = () => {
  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then(() => {
      console.log("Successfully registered!");
      router.push("/login");
    })
    .catch((error) => {
      console.log(error.code);
      alert(error.message);
    });
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
      <h1 class="text-2xl pt-12 pb-12 font-black mt-10">Create an account</h1>

      <!-- Email -->
      <p class="text-xs font-bold text-left mb-2 mt-20">Email</p>
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
        class="text-white bg-primary mb-4"
        @click="onClickCreate"
      />

      <!-- Cancel Button -->
      <Button label="Cancel" class="text-gray-3 border-0 bg-gray-2" />
    </div>
  </main>
</template>
