<script setup lang="ts">
defineProps({
  goalData: Object,
});
</script>

<template>
  <div class="h-32 ml-4">
    <h1 class="text-xl mb-3">Goals</h1>
    <div class="flex justify-between items-center mx-5">
      <div class="">
        <h2 class="block text-lg">Weight</h2>
        <p class="inline text-4xl font-semibold">
          {{ goalData.weight.current }}
        </p>
        <p class="inline text-lg">kg</p>
        <p class="block text-gray-600">Current</p>
      </div>
      <p class="text-2xl text-center w-1/3">→</p>
      <div class="w-1/3">
        <h2 class="block">Lose Weight</h2>
        <p class="inline text-4xl font-semibold">{{ goalData.weight.goal }}</p>
        <p class="inline text-lg">kg</p>
        <p class="block text-gray-600">Goal</p>
      </div>
    </div>
    <div class="flex justify-between items-center mt-6 mx-5">
      <div class="">
        <h2 class="block text-lg">Body Fat</h2>
        <p class="inline text-4xl font-semibold">
          {{ goalData.bodyFat.current }}
        </p>
        <p class="inline text-lg">%</p>
        <p class="block text-gray-600">Current</p>
      </div>
      <p class="text-2xl w-1/3 text-center">→</p>
      <div class="w-1/3">
        <h2 class="block">Lose Fat</h2>
        <p class="inline text-4xl font-semibold">{{ goalData.bodyFat.goal }}</p>
        <p class="inline text-lg">%</p>
        <p class="block text-gray-600">Goal</p>
      </div>
    </div>
  </div>
</template>
