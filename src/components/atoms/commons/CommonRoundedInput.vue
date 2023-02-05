<script setup lang="ts">
const props = defineProps({
  placeholder: String,
  value: String,
});
const emits = defineEmits(["inputContent"]);

const emitContent = (event: any) => {
  emits("inputContent", event.target.value);
};
</script>

<template>
  <input
    class="input input-bordered w-80 rounded-full"
    :id="$attrs.id"
    :class="$attrs.class"
    :placeholder="props.placeholder"
    @blur="emitContent($event)"
    :value="value"
  />
</template>
