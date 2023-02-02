<script setup lang="ts"></script>

<template>
  <div
    class="card py-3 mb-5 border border-gray-3 flex flex-row"
    :class="$attrs"
  >
    <div class="w-1/5 flex justify-center items-center">
      <slot name="icon" />
    </div>
    <div class="w-4/5 flex-col flex justify-start gap-2">
      <span class="font-semibold text-lg text-primary">
        <slot name="title" />
      </span>
      <span class="text-gray-3">
        <slot name="bottom" />
      </span>
    </div>
  </div>
</template>
