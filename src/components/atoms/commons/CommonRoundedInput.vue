<script setup lang="ts">
const props = defineProps({
  placeholder: String,
});
</script>

<template>
  <div>
    <input
      type="text"
      class="input input-bordered w-full"
      :placeholder="props.placeholder"
    />
  </div>
</template>
