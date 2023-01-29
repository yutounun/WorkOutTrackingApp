<script setup lang="ts">
const props = defineProps({
  label: String,
});
</script>

<template>
  <div class="flex justify-center">
    <button class="btn bg-primary w-48 text-white">
      {{ props.label }}
    </button>
  </div>
</template>
