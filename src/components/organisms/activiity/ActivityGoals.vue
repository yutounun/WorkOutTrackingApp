<script setup lang="ts">
// const props = defineProps({
//   title: String,
// });
</script>

<template>
  <div class="h-32 ml-4">
    <h1 class="text-xl mb-3">Goals</h1>
    <div class="flex items-center mx-5">
      <div class="text-center">
        <h2 class="block text-lg">Weight</h2>
        <p class="inline text-4xl font-semibold">43</p>
        <p class="inline text-lg">kg</p>
        <p class="block text-gray-600">Current</p>
      </div>
      <p class="text-2xl mx-10">→</p>
      <div class="text-center">
        <h2 class="block text-lg">Lose Weight</h2>
        <p class="inline text-4xl font-semibold">37</p>
        <p class="inline text-lg">kg</p>
        <p class="block text-gray-600">Goal</p>
      </div>
    </div>
    <div class="flex items-center mt-6 mx-5">
      <div class="text-center">
        <h2 class="block text-lg">Body Fat</h2>
        <p class="inline text-4xl font-semibold">22</p>
        <p class="inline text-lg">%</p>
        <p class="block text-gray-600">Current</p>
      </div>
      <p class="text-2xl mx-10">→</p>
      <div class="text-center">
        <h2 class="block text-lg">Lose Fat</h2>
        <p class="inline text-4xl font-semibold">15</p>
        <p class="inline text-lg">%</p>
        <p class="block text-gray-600">Goal</p>
      </div>
    </div>
  </div>
</template>
