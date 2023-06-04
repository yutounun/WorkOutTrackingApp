<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

const props = defineProps({
  title: String,
});

const router = useRouter();
const drawerOpen = ref(false);

const openDrawer = () => {
  console.log("drawerOpen :", drawerOpen);
  drawerOpen.value = true;
};
const closeDrawer = () => {
  drawerOpen.value = false;
};

const navigate = (to) => {
  console.log("navigate :", to);
  router.push(to);
};
</script>

<template>
  <div
    class="bg-primary z-30 w-screen h-16 text-white text-xl items-center flex justify-center fixed"
  >
    <!-- burger menu -->
    <div class="hidden lg:block">
      <svg
        for="my-drawer"
        @click="openDrawer"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        class="inline-block w-6 h-6 stroke-current fixed left-5 top-5"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4 6h16M4 12h16M4 18h16"
        ></path>
      </svg>
      <div
        v-if="drawerOpen === true"
        class="fixed left-0 top-0 h-screen w-screen backdrop-opacity-20 backdrop-invert bg-white/30 flex"
      >
        <div class="w-1/5 text-black bg-white">
          <div class="flex-col text-center">
            <div @click="navigate('/register')">
              <p class="py-4 hover:bg-gray-300 rounded-lg mx-7 my-3">
                Add record
              </p>
            </div>
            <div @click="navigate('/workout/list')">
              <p class="py-4 hover:bg-gray-300 rounded-lg mx-7 my-3">
                Workout records
              </p>
            </div>
            <div @click="navigate('/food/list')">
              <p class="py-4 hover:bg-gray-300 rounded-lg mx-7 my-3">
                Food records
              </p>
            </div>
            <div @click="navigate('/chart')">
              <p class="py-4 hover:bg-gray-300 rounded-lg mx-7 my-3">Chart</p>
            </div>
            <div @click="navigate('/profile')">
              <p class="py-4 hover:bg-gray-300 rounded-lg mx-7 my-3">Profile</p>
            </div>
          </div>
        </div>
        <div class="w-4/5" @click="closeDrawer">"></div>
      </div>
    </div>
    {{ props.title }}
  </div>
</template>
