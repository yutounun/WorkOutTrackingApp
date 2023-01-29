<script setup lang="ts">
const props = defineProps({
  url: String,
  title: String,
  text: String,
});
</script>

<template>
  <div class="card bg-base-100 shadow-xl" :class="$attrs">
    <figure>
      <img :src="url" alt="Shoes" />
    </figure>
    <div class="p-5 bg-white">
      <h2 class="card-title pb-2">
        {{ props.title }}
      </h2>
      <div class="badge badge-secondary mb-2">NEW</div>
      <p class="text-xss">{{ props.text }}</p>
    </div>
  </div>
</template>
