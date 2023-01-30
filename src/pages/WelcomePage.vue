<script setup lang="ts">
import Button from "@/components/atoms/commons/CommonButton.vue";
import { useRouter } from "vue-router";

const router = useRouter();
const BackgroundRound = "/icons/BackgroundRound.svg";
const Workout = "/icons/Workout.svg";
</script>

<template>
  <main
    class="px-6 font-sans h-screen bg-primary relative overflow-x-hidden overflow-y-auto"
  >
    <!-- round icons on background -->
    <img :src="BackgroundRound" alt="" class="absolute -top-10 -left-3" />
    <img :src="BackgroundRound" alt="" class="absolute top-10 -left-20" />
    <img :src="BackgroundRound" alt="" class="absolute -bottom-10 -right-10" />
    <img :src="BackgroundRound" alt="" class="absolute bottom-10 -right-20" />

    <!-- Title -->
    <div class="pt-20 mb-10 pl-4 font-bold text-white text-2xl">Kia Ora!!</div>

    <!-- Drawing -->
    <div class="flex justify-center">
      <img :src="Workout" alt="" />
    </div>

    <!-- Create your account -->
    <div class="flex justify-center">
      <Button
        class="bg-white rounded-full text-primary w-auto mt-16 hover:bg-white"
        label="Create your account"
        @click="router.push('/create-account')"
      />
    </div>

    <!-- Login -->
    <div class="flex justify-center">
      <Button
        class="bg-white w-52 text-primary mt-5 hover:bg-white rounded-full"
        label="Login"
        @click="router.push('/login')"
      />
    </div>
  </main>
</template>
