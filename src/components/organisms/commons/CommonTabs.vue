<script setup lang="ts">
import { ref } from "vue";

const props = defineProps({
  firstItem: String,
  secondItem: String,
  thirdItem: String,
});
const emits = defineEmits(["onFirstTab", "onSecondTab", "onThirdTab"]);

/** return true if the first item is clicked */
const isFirstMenuClicked = ref(true);
const isSecondMenuClicked = ref(false);
const isThirdMenuClicked = ref(false);

const onClickFirstTab = () => {
  emits("onFirstTab");
  isFirstMenuClicked.value = true;
  isSecondMenuClicked.value = false;
  isThirdMenuClicked.value = false;
};
const onClickSecondTab = () => {
  emits("onSecondTab");
  isFirstMenuClicked.value = false;
  isSecondMenuClicked.value = true;
  isThirdMenuClicked.value = false;
};
const onClickThirdTab = () => {
  emits("onThirdTab");
  isFirstMenuClicked.value = false;
  isSecondMenuClicked.value = false;
  isThirdMenuClicked.value = true;
};
</script>

<template>
  <div
    class="flex h-12 mb-4 items-center justify-center fixed top-0 w-full z-10"
    :class="$attrs"
  >
    <span
      id="firstTab"
      :class="{
        'w-1/3 h-full font-bold text-xs border-b-2 bg-white border-primary border-bold flex items-center justify-center':
          isFirstMenuClicked,
        'w-1/3 h-full font-bold text-xs bg-gray-2 text-gray-3 flex items-center justify-center':
          !isFirstMenuClicked,
      }"
      @click="onClickFirstTab"
    >
      {{ props.firstItem }}
    </span>
    <span
      id="secondTab"
      :class="{
        'w-1/3 h-full font-bold text-xs bg-gray-2 text-gray-3 flex items-center justify-center border-l border-gray-1':
          !isSecondMenuClicked,
        'w-1/3 h-full font-bold text-xs border-b-2 bg-white border-primary border-bold flex items-center justify-center':
          isSecondMenuClicked,
      }"
      @click="onClickSecondTab"
    >
      {{ props.secondItem }}
    </span>
    <span
      id="thirdTab"
      :class="{
        'w-1/3 h-full font-bold text-xs bg-gray-2 text-gray-3 flex items-center justify-center border-l border-gray-1  ':
          !isThirdMenuClicked,
        'w-1/3 h-full font-bold text-xs border-b-2 bg-white border-primary border-bold flex items-center justify-center':
          isThirdMenuClicked,
      }"
      @click="onClickThirdTab"
    >
      {{ props.thirdItem }}
    </span>
  </div>
</template>
