<script async setup lang="ts">
import sample from "../components/samples/FirebaseSample.vue";
</script>

<template>
  <Suspense>
    <template #default>
      <sample />
    </template>
    <template #fallback> loading... </template>
  </Suspense>
</template>
