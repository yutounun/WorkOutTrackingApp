<script setup lang="ts">
const props = defineProps({
  title: String,
  carbo: Number,
  protein: Number,
  fat: Number,
  cost: Number,
  date: String,
});

const emits = defineEmits(["remove", "edit"]);
const remove = () => {
  emits("remove");
};
const edit = () => {
  emits("edit");
};
</script>

<template>
  <div class="border-b border-gray-2 mt-0 w-auto">
    <div class="ml-3 my-2 flex justify-between" :class="$attrs">
      <div class="pl-6">
        <span class="font-semibold text-lg text-primary">
          {{ props.title }}
        </span>
        <div class="flex gap-2 mt-2">
          <span class="text-gray-3"> ${{ props.cost }} </span>
          <span class="text-gray-3"> P: {{ props.protein }} </span>
          <span class="text-gray-3"> F: {{ props.fat }} </span>
          <span class="text-gray-3"> C: {{ props.carbo }} </span>
        </div>
      </div>
      <div class="flex mr-16">
        <!-- Remove item -->
        <img src="/icons/trash.svg" alt="" @click="remove" />
        <!-- Edit item -->
        <img src="/icons/pen.svg" alt="" @click="edit" />
      </div>
    </div>
  </div>
</template>
