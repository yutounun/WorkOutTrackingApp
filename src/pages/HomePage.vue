<script setup lang="ts">
import PopularItem from "@/components/organisms/home/PopularItem.vue";
import Footer from "@/components/organisms/commons/CommonFooter.vue";
import { useRouter } from "vue-router";

const video = "/temp-pix/video.svg";
const runnerVideo = "/temp-pix/runnerVideo.svg";
const smallProfile = "/icons/SmallProfile.svg";
const router = useRouter();
</script>

<template>
  <div
    class="bg-primary z-30 w-screen h-16 text-white text-2xl font-bold items-center flex justify-center fixed"
  >
    <h1 class="font-semibold text-xl mr-5">Welcome Jesica!!</h1>
    <img :src="smallProfile" alt="" @click="router.push('/welcome')" />
  </div>
  <main class="px-6 pt-20 font-sans h-screen">
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
