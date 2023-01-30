<script async setup lang="ts">
import { ref } from "vue";
import { getData } from "@/apis/getFirebase";
import { registerData } from "@/apis/postFirebase";

const data = ref();

const retrieveFromFirebase = () => {
  // Put foods data into data
  data.value = getData("foods", "foods");
};

// Keep data to register on firebase store
const registerOnFirebase = () => {
  registerData("foods", "foods");
};
</script>

<template>
  <div class="flex flex-col w-30 h-60">
    <button class="btn mb-4" @click="registerOnFirebase">
      Regist food data
    </button>
    <button class="btn" @click="retrieveFromFirebase">
      Retrieve food data
    </button>
    <div class="w-30 text-cyan-500">
      {{ data }}
    </div>
  </div>
</template>
