<script setup lang="ts">
const props = defineProps({
  title: String,
});
</script>

<template>
  <div
    class="bg-primary z-30 w-screen h-16 text-white text-xl font-bold items-center flex justify-center fixed"
  >
    {{ props.title }}
  </div>
</template>
