<script setup lang="ts"></script>

<template>
  <div class="border-b mt-0 border-gray-2">
    <div class="py-3 mx-3 flex flex-row" :class="$attrs">
      <span class="font-semibold text-lg text-primary">
        <slot name="date" />
      </span>
      <div class="w-1/5 flex justify-center items-center">
        <slot name="icon" />
      </div>
      <div class="w-3/5 flex-col flex justify-start">
        <span class="font-semibold text-lg text-primary">
          <slot name="title" />
        </span>
        <span class="text-gray-3">
          <slot name="bottom" />
        </span>
      </div>
      <div class="w-1/5 flex mr-10">
        <img src="/icons/trash.svg" alt="" />
        <img src="/icons/pen.svg" alt="" />
      </div>
    </div>
  </div>
</template>
