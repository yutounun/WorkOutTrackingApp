<script setup lang="ts">
const props = defineProps({
  word: String,
});
</script>

<template>
  <div class="flex justify-center">
    <button class="btn bg-primary w-48">
      {{ props.word }}
    </button>
  </div>
</template>
