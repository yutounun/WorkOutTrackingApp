<script setup lang="ts">
import CommonBurgerMenu from "@/components/organisms/commons/CommonBurgerMenu.vue";
const props = defineProps({
  title: String,
});
</script>

<template>
  <div
    class="bg-primary z-30 w-screen h-16 text-white text-xl lg:text-2xl items-center flex justify-center fixed"
  >
    <CommonBurgerMenu />
    {{ props.title }}
  </div>
</template>
