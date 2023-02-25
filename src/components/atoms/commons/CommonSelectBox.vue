<script setup lang="ts">
const props = defineProps({
  placeholder: String,
  options: Array,
  class: String,
});
</script>

<template>
  <div class="flex items-center justify-center">
    <select
      class="select select-bordered w-80 text-gray-3"
      :class="props.class"
    >
      <option disabled selected class="text-gray-2">
        {{ props.placeholder }}
      </option>
      <template v-for="option in options" :key="option">
        <option>{{ option }}</option>
      </template>
    </select>
  </div>
</template>
