<script setup lang="ts">
const props = defineProps({
  title: String,
  carbo: Number,
  protein: Number,
  fat: Number,
  cost: Number,
});
</script>

<template>
  <div
    class="card p-5 py-3 mb-5 border border-gray-3 flex flex-row"
    :class="$attrs"
  >
    <div class="flex-col flex justify-start gap-2">
      <span class="font-semibold text-lg text-primary">
        {{ props.title }}
      </span>
      <div class="flex gap-2">
        <span class="text-gray-3"> ${{ props.cost }} </span>
        <span class="text-gray-3"> P: {{ props.protein }} </span>
        <span class="text-gray-3"> F: {{ props.fat }} </span>
        <span class="text-gray-3"> C: {{ props.carbo }} </span>
      </div>
    </div>
  </div>
</template>
