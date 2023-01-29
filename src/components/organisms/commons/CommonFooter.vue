<script setup lang="ts">
import { useRouter, type RouteLocationRaw } from "vue-router";

const router = useRouter();

const transition = (to: RouteLocationRaw) => {
  router.push(to);
};
</script>

<template>
  <footer
    class="mx-4 h-20 flex items-center rounded-xl mb-5 flex-wrap flex-row bg-white fixed inset-x-0 bottom-0 drop-shadow-lg border border-gray-2"
  >
    <div class="w-1/5 text-center">
      <img src="/icons/Home.svg" class="m-auto" alt="" />
      <span class="text-xxs text-black block mb-1 font-mono"> HOME </span>
    </div>
    <div class="w-1/5 text-center">
      <img src="/icons/Food.svg" class="m-auto" alt="" />
      <span class="text-xxs text-black block mb-1 font-mono"> FOOD </span>
    </div>
    <img
      src="/icons/LargeAddBtn.svg"
      alt=""
      class="w-1/5 absolute bottom-5 left-40"
    />
    <div class="w-1/5 text-center">
      <span class="hidden"> </span>
    </div>
    <div class="w-1/5 text-center">
      <img src="/icons/Menu.svg" class="m-auto" alt="" />
      <span class="text-xxs text-black block mb-1 font-mono"> MENU </span>
    </div>
    <div class="w-1/5 text-center">
      <img src="/icons/Profile.svg" class="m-auto" alt="" />
      <span class="text-xxs text-black block mb-1 font-mono"> PROFILE </span>
    </div>
  </footer>
</template>
