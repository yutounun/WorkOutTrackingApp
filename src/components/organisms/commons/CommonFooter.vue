<script setup lang="ts">
import { useRouter, type RouteLocationRaw } from "vue-router";

const router = useRouter();
const props = defineProps({
  /** Select From which page you want to call this method. */
  home: Boolean,
  food: Boolean,
  menu: Boolean,
  profile: Boolean,
});

const transition = (to: RouteLocationRaw) => {
  router.push(to);
};
</script>

<template>
  <footer
    class="mx-4 h-20 flex items-center rounded-xl mb-5 flex-wrap flex-row bg-white fixed inset-x-0 bottom-0 drop-shadow-lg border border-gray-2"
  >
    <div
      v-if="props.home"
      class="w-1/5 text-center"
      @click="transition('/home')"
    >
      <img src="/icons/SelectedHome.svg" class="m-auto" alt="" />
      <span class="text-xxs text-black block mb-1 font-bold"> HOME </span>
    </div>
    <div v-else class="w-1/5 text-center" @click="transition('/home')">
      <img src="/icons/Home.svg" class="m-auto" alt="" />
      <span class="text-xxs text-black block mb-1 font-bold"> HOME </span>
    </div>

    <div
      v-if="props.food"
      class="w-1/5 text-center"
      @click="transition('/food')"
    >
      <img src="/icons/SelectedFood.svg" class="m-auto" alt="" />
      <span class="text-xxs text-black block mb-1 font-bold"> FOOD </span>
    </div>
    <div v-else class="w-1/5 text-center" @click="transition('/food')">
      <img src="/icons/Food.svg" class="m-auto" alt="" />
      <span class="text-xxs text-black block mb-1 font-bold"> FOOD </span>
    </div>

    <!-- + icon -->
    <img
      src="/icons/LargeAddBtn.svg"
      alt=""
      class="w-1/5 absolute bottom-5 left-32"
    />

    <div class="w-1/5 text-center">
      <span class="hidden"> </span>
    </div>

    <div
      v-if="props.menu"
      class="w-1/5 text-center"
      @click="transition('/workout')"
    >
      <img src="/icons/SelectedMenu.svg" class="m-auto" alt="" />
      <span class="text-xxs text-black block mb-1 font-bold"> MENU </span>
    </div>
    <div v-else class="w-1/5 text-center" @click="transition('/workout')">
      <img src="/icons/Menu.svg" class="m-auto" alt="" />
      <span class="text-xxs text-black block mb-1 font-bold"> MENU </span>
    </div>

    <div
      v-if="props.profile"
      class="w-1/5 text-center"
      @click="transition('/profile')"
    >
      <img src="/icons/SelectedProfile.svg" class="m-auto" alt="" />
      <span class="text-xxs text-black block mb-1 font-bold"> PROFILE </span>
    </div>
    <div v-else class="w-1/5 text-center" @click="transition('/profile')">
      <img src="/icons/Profile.svg" class="m-auto" alt="" />
      <span class="text-xxs text-black block mb-1 font-bold"> PROFILE </span>
    </div>
  </footer>
</template>
