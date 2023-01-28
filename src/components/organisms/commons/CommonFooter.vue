<script setup lang="ts">
import { useRouter } from "vue-router";

const headerItems = [
  { name: "ホーム", src: "/assets/Footer/Icon_Home.png", to: "/" },
  {
    name: "スポット検索",
    src: "/assets/Footer/Icon_Search.png",
    to: "/search",
  },
  {
    name: "お気に入り",
    src: "/assets/Footer/Icon_Favorite.png",
    to: "/",
  },
  { name: "プラン", src: "/assets/Footer/Icon_Plan.png", to: "/" },
];

const router = useRouter();

const transition = (to) => {
  router.push(to);
};
</script>

<template>
  <footer
    class="h-100 flex flex-wrap flex-row bg-white fixed inset-x-0 bottom-0 pt-2"
  >
    <div
      class="w-1/4 text-center"
      v-for="item in headerItems"
      @click="transition(item.to)"
      :key="item.name"
    >
      <!-- アイコン -->
      <img :src="item.src" class="m-auto" alt="" width="20" height="17" />
      <!-- 文字 -->
      <span class="text-xxs text-black block mb-1 font-mono">
        {{ item.name }}
      </span>
    </div>
  </footer>
</template>
