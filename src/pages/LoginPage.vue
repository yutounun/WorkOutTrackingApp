<script setup>
import { ref } from "vue";
import Button from "@/components/atoms/commons/CommonButton.vue";
import RoundedInput from "@/components/atoms/commons/CommonRoundedInput.vue";
import { useRouter } from "vue-router";
// import api from "@/http-common";

const router = useRouter();

const userId = ref("");
const password = ref("");

/** Go to Home page after login */
const onClickLogin = () => {
  if (userId.value === "yuto" && password.value === "yuto") {
    router.push("/");
  }
  // const params = {
  //   user_id: userId.value,
  //   password: password.value,
  // };
  // login API
  // api
  //   .post("/login", params)
  //   .then((response) => {
  //     // session_idをsessionStorageに保存し、リロードしても読み込めるようにする
  //     sessionStorage.setItem(
  //       "session-id",
  //       JSON.stringify(response.data.session_id)
  //     );
  //     // トップ画面に遷移
  //     router.push("/");
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //     // パスワードをクリア
  //     password.value = "";
  //   });
};
const inputUserId = (e) => {
  console.log("e :", e);
  userId.value = e;
};
const inputPass = (e) => {
  console.log("e :", e);
  password.value = e;
};
</script>

<template>
  <main class="px-6 font-sans h-screen">
    <div class="text-center mx-3">
      <h1 class="text-2xl pt-12 pb-12 font-black mt-10">Login</h1>

      <p class="text-xs font-bold text-left mb-2 mt-20">User ID</p>
      <RoundedInput
        placeholder="Enter user id"
        class="w-full mb-5"
        @inputContent="inputUserId"
      />

      <p class="text-xs font-bold text-left mb-2">Password</p>
      <RoundedInput
        placeholder="Enter password"
        type="password"
        class="w-full mb-20"
        @inputContent="inputPass"
      />

      <Button
        label="Login"
        class="text-white bg-primary mb-4"
        @click="onClickLogin"
      />

      <Button label="Cancel" class="text-gray-3 border-0 bg-gray-2" />
    </div>
  </main>
</template>
