<script setup lang="ts">
const props = defineProps({
  placeholder: String,
});
</script>

<template>
  <div>
    <input
      type="text"
      class="bg-white input input-bordered w-full"
      :placeholder="props.placeholder"
    />
  </div>
</template>
