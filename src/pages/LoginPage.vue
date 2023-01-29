<script setup>
import { ref } from "vue";
import Bu
// import { useRouter } from "vue-router";
// import api from "@/http-common";

// const router = useRouter();

const userId = ref("");
const password = ref("");

/** ログイン後トップページに遷移 */
// const onClickLogin = () => {
//   const params = {
//     user_id: userId.value,
//     password: password.value,
//   };

//   // login API
//   api
//     .post("/login", params)
//     .then((response) => {
//       // session_idをsessionStorageに保存し、リロードしても読み込めるようにする
//       sessionStorage.setItem(
//         "session-id",
//         JSON.stringify(response.data.session_id)
//       );

//       // トップ画面に遷移
//       router.push("/");
//     })
//     .catch((error) => {
//       console.log(error);
//       // パスワードをクリア
//       password.value = "";
//     });
// };
</script>

<template>
  <EntryLayout>
    <main class="px-6 font-sans h-screen">
      <div class="text-center">
        <h1 class="text-xl pt-12 pb-12 font-black">ログイン</h1>
        <div>
          <p class="text-xs font-bold text-left mb-2">ユーザーID</p>
          <input
            type="text"
            class="h-12 w-full mb-8 common-input"
            v-model="userId"
          />
        </div>

        <div>
          <p class="text-xs font-bold text-left mb-2">パスワード</p>
          <input
            type="password"
            class="h-12 w-full mb-8 common-input"
            v-model="password"
          />
        </div>

        <button
          class="h-12 w-64 mb-8 text-base bg-primary common-btn"
          @click="onClickLogin"
        >
          ログイン
        </button>

        <button
          class="h-12 w-64 mb-5 text-base border-gray-3 bg-gray-2 common-btn text-black"
          @click="onClickLogin"
        >
          戻る
        </button>
      </div>
    </main>
  </EntryLayout>
</template>
