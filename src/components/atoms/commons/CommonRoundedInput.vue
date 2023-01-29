<script setup lang="ts">
const props = defineProps({
  placeholder: String,
});
const emits = defineEmits(["inputContent"]);

const emitContent = (event: any) => {
  emits("inputContent", event.target.value);
};
</script>

<template>
  <input
    class="input input-bordered w-80"
    :placeholder="props.placeholder"
    @blur="emitContent($event)"
  />
</template>
