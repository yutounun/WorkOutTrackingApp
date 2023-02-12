<script setup lang="ts">
import { db } from "@/firebase/init";
import PopularItem from "@/components/organisms/home/PopularItem.vue";
import Footer from "@/components/organisms/commons/CommonFooter.vue";
import { useProfileStore } from "@/stores/profile";
import { doc, getDoc } from "@firebase/firestore";
import { ref } from "vue";

const email = ref("");

const video = "/temp-pix/video.svg";
const runnerVideo = "/temp-pix/runnerVideo.svg";
const userName = ref("");

const getUserName = async () => {
  email.value = await useProfileStore().email;

  const docRef = doc(db, "users", email.value);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    console.log("persisted profile:", docSnap.data());
    userName.value = docSnap.data().userName;
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }
};
getUserName();
</script>

<template>
  <div
    class="z-30 w-screen h-16 mt-4 text-primary text-2xl font-bold items-center flex justify-start"
  >
    <h1 class="font-semibold text-xl ml-7 border-primary border-b">
      Welcome {{ userName }}!!
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
