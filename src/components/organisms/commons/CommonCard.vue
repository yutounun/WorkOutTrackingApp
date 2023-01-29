<script setup lang="ts">
const props = defineProps({
  url: String,
  title: String,
  text: String,
});
</script>

<template>
  <div class="card mb-5 bg-base-100 shadow-xl" :class="$attrs">
    <div class="card-body"></div>
  </div>
</template>
