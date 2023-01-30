<script setup lang="ts">
const props = defineProps({
  label: String,
});
</script>

<template>
  <button class="btn w-48 text-center" :class="$attrs">
    {{ props.label }}
  </button>
</template>
