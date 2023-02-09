<script setup lang="ts">
import PopularItem from "@/components/organisms/home/PopularItem.vue";
import Footer from "@/components/organisms/commons/CommonFooter.vue";

const video = "/temp-pix/video.svg";
const runnerVideo = "/temp-pix/runnerVideo.svg";
</script>

<template>
  <div
    class="z-30 w-screen h-16 mt-4 text-primary text-2xl font-bold items-center flex justify-start"
  >
    <h1 class="font-semibold text-xl ml-7 border-primary border-b">
      Welcome!!
    </h1>
  </div>
  <main class="px-6 font-sans h-screen">
    <h1 class="font-semibold text-xl mt-8 mb-4">Videos For Trainees</h1>
    <div class="flex items-center overflow-x-scroll">
      <img :src="video" alt="" />
      <img :src="video" alt="" />
      <img :src="video" alt="" />
      <img :src="video" alt="" />
      <img :src="video" alt="" />
      <img :src="video" alt="" />
      <img :src="video" alt="" />
      <img :src="video" alt="" />
      <img :src="video" alt="" />
      <img :src="video" alt="" />
    </div>

    <h1 class="font-semibold text-xl mt-8 mb-4">Videos For Runners</h1>
    <div class="flex items-center overflow-x-scroll">
      <img :src="runnerVideo" alt="" class="mr-3" />
      <img :src="runnerVideo" alt="" class="mr-3" />
      <img :src="runnerVideo" alt="" class="mr-3" />
      <img :src="runnerVideo" alt="" class="mr-3" />
      <img :src="runnerVideo" alt="" class="mr-3" />
      <img :src="runnerVideo" alt="" class="mr-3" />
      <img :src="runnerVideo" alt="" class="mr-3" />
      <img :src="runnerVideo" alt="" class="mr-3" />
      <img :src="runnerVideo" alt="" class="mr-3" />
    </div>

    <h1 class="font-semibold text-xl mt-8 mb-4">Recommended Items For You</h1>
    <div class="flex overflow-x-scroll w-full pb-44">
      <PopularItem
        url="/temp-pix/nikeShoes.png"
        text="This is wonderful shoes like Jackey Chen"
        title="Nike Airmax 999"
      />
      <PopularItem
        url="/temp-pix/nikeShoes.png"
        text="This is wonderful shoes like Jackey Chen"
        title="Nike Airmax 999"
      />
      <PopularItem
        url="/temp-pix/nikeShoes.png"
        text="This is wonderful shoes like Jackey Chen"
        title="Nike Airmax 999"
      />
      <PopularItem
        url="/temp-pix/nikeShoes.png"
        text="This is wonderful shoes like Jackey Chen"
        title="Nike Airmax 999"
      />
      <PopularItem
        url="/temp-pix/nikeShoes.png"
        text="This is wonderful shoes like Jackey Chen"
        title="Nike Airmax 999"
      />
    </div>
  </main>
  <Footer home />
</template>
