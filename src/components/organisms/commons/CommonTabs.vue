<script setup lang="ts">
import { ref } from "vue";

const props = defineProps({
  firstItem: String,
  secondItem: String,
});
const emits = defineEmits(["isFirstMenuClicked"]);

/** return true if the first item is clicked */
const isFirstMenuClicked = ref(true);

const onClickFirstTab = () => {
  emits("isFirstMenuClicked", true);
  isFirstMenuClicked.value = true;
};
const onClickSecondTab = () => {
  emits("isFirstMenuClicked", false);
  isFirstMenuClicked.value = false;
};
</script>

<template>
  <div
    class="flex h-12 mb-4 items-center justify-center fixed top-0 w-full z-40"
    :class="$attrs"
  >
    <span
      id="firstTab"
      :class="{
        'w-1/2 h-full font-bold text-xs border-b-2 bg-white border-primary border-bold flex items-center justify-center':
          isFirstMenuClicked,
        'w-1/2 h-full font-bold text-xs bg-gray-2 text-gray-3 flex items-center justify-center':
          !isFirstMenuClicked,
      }"
      @click="onClickFirstTab"
    >
      {{ props.firstItem }}
    </span>
    <span
      id="secondTab"
      :class="{
        'w-1/2 h-full font-bold text-xs bg-gray-2 text-gray-3 flex items-center justify-center':
          isFirstMenuClicked,
        'w-1/2 h-full font-bold text-xs border-b-2 bg-white border-primary border-bold flex items-center justify-center':
          !isFirstMenuClicked,
      }"
      @click="onClickSecondTab"
    >
      {{ props.secondItem }}
    </span>
  </div>
</template>
