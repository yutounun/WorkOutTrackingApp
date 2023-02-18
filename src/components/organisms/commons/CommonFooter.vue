<script setup lang="ts">
import { useRouter, type RouteLocationRaw } from "vue-router";

const router = useRouter();
const props = defineProps({
  /** Select From which page you want to call this method. */
  profile: Boolean,
  food: Boolean,
  menu: Boolean,
  chart: Boolean,
});

const transition = (to: RouteLocationRaw) => {
  console.log("transition :", to);
  router.push(to);
};
</script>

<template>
  <footer
    class="mx-4 h-20 flex items-center rounded-xl mb-5 flex-wrap flex-row bg-white fixed inset-x-0 bottom-0 drop-shadow-lg border border-gray-2"
  >
    <div
      v-if="props.profile"
      class="w-1/5 text-center"
      @click="transition('/chart')"
    >
      <img src="/icons/SelectedProfile.svg" class="m-auto mt-1" alt="" />
      <span class="text-xxs text-black block mb-1 -mt-1 font-bold">
        PROFILE
      </span>
    </div>
    <div v-else class="w-1/5 text-center" @click="transition('/profile')">
      <img src="/icons/Profile.svg" class="m-auto mt-1" alt="" />
      <span class="text-xxs text-black block mb-1 -mt-1 font-bold">
        PROFILE
      </span>
    </div>
    <div
      v-if="props.food"
      class="w-1/5 text-center"
      @click="transition('/food/list')"
    >
      <img src="/icons/SelectedFood.svg" class="m-auto" alt="" />
      <span class="text-xxs text-black block mb-1 font-bold"> FOOD </span>
    </div>
    <div v-else class="w-1/5 text-center" @click="transition('/food/list')">
      <img src="/icons/Food.svg" class="m-auto" alt="" />
      <span class="text-xxs text-black block mb-1 font-bold"> FOOD </span>
    </div>

    <!-- + icon -->
    <img
      src="/icons/LargeAddBtn.svg"
      @click="router.push('/register')"
      alt=""
      class="w-1/5 absolute bottom-5 left-[135px]"
    />

    <div class="w-1/5 text-center">
      <span class="hidden"> </span>
    </div>

    <div
      v-if="props.menu"
      class="w-1/5 text-center"
      @click="transition('/workout/list')"
    >
      <img src="/icons/SelectedMenu.svg" class="m-auto" alt="" />
      <span class="text-xxs text-black block mb-1 font-bold"> MENU </span>
    </div>
    <div v-else class="w-1/5 text-center" @click="transition('/workout/list')">
      <img src="/icons/Menu.svg" class="m-auto" alt="" />
      <span class="text-xxs text-black block mb-1 font-bold"> MENU </span>
    </div>

    <div
      v-if="props.chart"
      class="w-1/5 text-center"
      @click="transition('/chart')"
    >
      <img src="/icons/SelectedChart.svg" class="m-auto mt-1" alt="" />
      <span class="text-xxs text-black block mb-1 mt-1 font-bold"> CHART </span>
    </div>
    <div v-else class="w-1/5 text-center" @click="transition('/chart')">
      <img src="/icons/Chart.svg" class="m-auto mt-1" alt="" />
      <span class="text-xxs text-black block mb-1 mt-1 font-bold"> CHART </span>
    </div>
  </footer>
</template>
