<script setup lang="ts">
import { onBeforeMount } from "vue";
import { useRouter } from "vue-router";
import CommonFooter from "@/components/organisms/commons/CommonFooter.vue";

const router = useRouter();
const props = defineProps({
  // 設定アイコンを表示するか
  setting: Boolean,
  // 戻るボタンを表示するか
  backBtn: Boolean,
  // 切り替えヘッダーを表示するか
  secondHeader: Boolean,
});

onBeforeMount(() => {
  sessionIdCheck();
});

/** sessionStorageにsessionIdが含まれているか確認 */
const sessionIdCheck = () => {
  const sessionId = JSON.parse(sessionStorage.getItem("session-id"));
  if (
    !Object.prototype.hasOwnProperty.call(sessionStorage, "session-id") ||
    !sessionId
  ) {
    transitionToLoginPage();
  }
};

/** もしログインが済んでいなければ、ログイン画面に遷移する */
const transitionToLoginPage = () => {
  router.push("/login");
};
</script>

<template>
  <div class="fixed top-0 z-40 bg-white w-full">
    <header
      class="h-16 flex items-center"
      :class="{
        'justify-end': props.setting,
        'justify-start': props.backBtn,
        'justify-center': !props.setting && !props.backBtn,
      }"
    >
      <!-- 戻るボタン -->
      <img
        src="@/assets/icons/Icon_vector2.png"
        alt=""
        class="h-3.5 mr-20 ml-6"
        v-if="props.backBtn"
        @click="$router.go(-1)"
      />
      <!-- タイトル -->
      <span class="font-black text-xl">
        <slot name="titleHeader"></slot>
      </span>
      <!-- 歯車アイコン -->
      <img
        src="@/assets/icons/Icon_Setting.png"
        alt=""
        class="h-6 mr-5 ml-20"
        v-if="props.setting"
      />
    </header>
    <slot name="secondHeader" />
  </div>
  <!-- メイン部分 -->
  <div
    class="mx-6 pb-16"
    :class="{ 'pt-44': props.secondHeader, 'pt-16': !props.secondHeader }"
  >
    <slot />
  </div>
  <!-- フッター部分 -->
  <CommonFooter />
</template>
