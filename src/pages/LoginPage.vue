<script setup lang="ts">
import { ref } from "vue";
import Button from "@/components/atoms/commons/CommonButton.vue";
import RoundedInput from "@/components/atoms/commons/CommonRoundedInput.vue";
import { useRouter } from "vue-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/init";

const router = useRouter();
const email = ref("");
const password = ref("");

/** Sign in with Firebase */
const signIn = () => {
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("user :", user);
      router.push("/");
    })
    .catch((error) => {
      console.log(error.code);
      alert(error.message);
    });
};

/** Go to Home page after login */
const onClickLogin = () => {
  signIn();
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
    <div class="text-center">
      <h1 class="text-2xl pt-12 pb-12 font-black mt-10">Login</h1>

      <!-- Email -->
      <p class="text-xs font-bold text-left mb-2 mt-10">Email</p>
      <RoundedInput
        placeholder="Enter user id"
        class="w-full mb-5"
        @inputContent="inputEmail"
      />

      <p class="text-xs font-bold text-left mb-2">Password</p>
      <RoundedInput
        placeholder="Enter password"
        type="password"
        class="w-full mb-20"
        @inputContent="inputPass"
      />

      <!-- Login Button -->
      <Button
        label="Login"
        class="text-white bg-primary mb-4"
        @click="onClickLogin"
      />

      <!-- Cancel Button -->
      <Button label="Cancel" class="text-gray-3 border-0 bg-gray-2" />

      <!-- Go to create account page -->
      <a class="block mt-5" @click="$router.push('/create-account')">
        Have you not created your account yet??
      </a>
    </div>
  </main>
</template>
