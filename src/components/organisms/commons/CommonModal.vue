<script setup lang="ts">
import { ref } from "vue";
import Button from "@/components/atoms/commons/CommonButton.vue";

const props = defineProps({
  /** Where to teleport this modal */
  to: String,
});
const emits = defineEmits(["submit"]);
const showsModal = ref(false);

const onSubmit = () => {
  showsModal.value = false;
  emits("submit");
};
</script>
<template>
  <Teleport :to="props.to">
    <div
      v-if="showsModal"
      class="w-screen border overflow-y-auto rounded-lg border-gray-2 h-4/5 fixed top-20 z-50 bg-white"
    >
      <div class="flex justify-between ml-10 mr-4 mt-3">
        <h1 class="font-bold text-lg mt-5">Edit Your Record</h1>
        <img src="/icons/close.svg" alt="" @click="showsModal = false" />
      </div>
      <slot name="inputBoxes" />
      <div class="text-center mb-10">
        <Button
          class="bg-primary w-52 text-white mt-1 hover:bg-primary rounded-full"
          label="Submit"
          @click="onSubmit"
        />
      </div>
    </div>
  </Teleport>
  <img src="/icons/pen.svg" alt="" @click="showsModal = true" />
</template>
