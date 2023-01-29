<script setup lang="ts">
const props = defineProps({
  placeholder: String,
});
</script>

<template>
  <div>
    <input
      type="text"
      :class="$attrs"
      class="input input-bordered w-80"
      :placeholder="props.placeholder"
    />
  </div>
</template>
