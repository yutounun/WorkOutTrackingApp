<script setup lang="ts">
const props = defineProps({
  title: String,
});
</script>

<template>
  <div
    class="bg-primary w-screen h-16 text-white text-2xl font-bold items-center flex justify-center fixed"
  >
    {{ props.title }}
  </div>
</template>
