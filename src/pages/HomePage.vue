<script setup lang="ts">
import { db } from "@/firebase/init";
import PopularItem from "@/components/organisms/home/PopularItem.vue";
import { useProfileStore } from "@/stores/profile";
import { doc, getDoc } from "@firebase/firestore";
import { ref } from "vue";
import { useRouter } from "vue-router";

const email = ref("");
const router = useRouter();
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
    class="z-30 w-screen h-16 mt-16 text-primary text-2xl font-bold items-center flex justify-start"
    @click="router.push('/profile')"
  >
    <h1 class="font-semibold text-xl ml-7 border-primary border-b">
      Welcome {{ userName }}!!
    </h1>
    <svg
      class="ml-2"
      width="18"
      height="18"
      viewBox="0 0 21 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.1413 12.1263L15.2661 11.0014C15.4419 10.8257 15.7477 10.9487 15.7477 11.2018V16.3127C15.7477 17.2443 14.9919 18 14.0604 18H1.68725C0.755749 18 0 17.2443 0 16.3127V3.93956C0 3.00806 0.755749 2.25231 1.68725 2.25231H11.3011C11.5507 2.25231 11.6772 2.55461 11.5014 2.73388L10.3766 3.85871C10.3239 3.91144 10.2536 3.93956 10.1762 3.93956H1.68725V16.3127H14.0604V12.3231C14.0604 12.2493 14.0886 12.179 14.1413 12.1263ZM19.6459 5.03276L10.4153 14.2634L7.23761 14.615C6.31665 14.7169 5.53278 13.94 5.63472 13.0121L5.98623 9.8344L15.2169 0.60372C16.0219 -0.20124 17.3225 -0.20124 18.1239 0.60372L19.6424 2.12225C20.4474 2.92721 20.4474 4.23131 19.6459 5.03276ZM16.173 6.11893L14.1307 4.07665L7.59967 10.6112L7.34306 12.9066L9.63843 12.65L16.173 6.11893ZM18.4508 3.31739L16.9323 1.79886C16.7882 1.65474 16.5527 1.65474 16.412 1.79886L15.3259 2.88503L17.3682 4.92731L18.4543 3.84114C18.5949 3.6935 18.5949 3.4615 18.4508 3.31739Z"
        fill="black"
      />
    </svg>
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
</template>
