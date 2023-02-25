<script setup lang="ts">
const props = defineProps({
  label: String,
  class: String,
});
</script>

<template>
  <button class="btn w-48 text-center" :class="props.class">
    {{ props.label }}
  </button>
</template>
