<script setup lang="ts">
import { ref, watch } from "vue";

const props = defineProps({
  firstItem: String,
  secondItem: String,
});
const emits = defineEmits(["isFirstMenuClicked"]);

/** return true if the first item is clicked */
const isFirstMenuClicked = ref(false);

/** Topページから遷移した場合などは右側のタブが活性化された初期状態 */
// if (props.isFirstItem) {
//   isFirstMenuClicked.value = true;
// }
// もしisFirstMenuClickedが変更されたらisFirstMenuClickedの状態をemitする
watch(isFirstMenuClicked, () => {
  emits("isFirstMenuClicked", isFirstMenuClicked);
});
</script>
<template>
  <div class="flex h-12 mb-4 items-center justify-center">
    <span
      :class="{
        'w-1/2 h-full font-bold text-xs border-b-2 border-primary border-bold flex items-center justify-center':
          isFirstMenuClicked,
        'w-1/2 h-full font-bold text-xs bg-gray-2 text-gray-3 flex items-center justify-center':
          !isFirstMenuClicked,
      }"
      @click="isFirstMenuClicked = true"
    >
      {{ props.firstItem }}
    </span>
    <span
      :class="{
        'w-1/2 h-full font-bold text-xs bg-gray-2 text-gray-3 flex items-center justify-center':
          isFirstMenuClicked,
        'w-1/2 h-full font-bold text-xs border-b-2 border-primary border-bold flex items-center justify-center':
          !isFirstMenuClicked,
      }"
      @click="isFirstMenuClicked = false"
    >
      {{ props.secondItem }}
    </span>
  </div>
</template>
