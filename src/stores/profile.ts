import { defineStore } from "pinia";
import { ref } from "vue";

export const useProfileStore = defineStore(
  "profile",
  () => {
    const email = ref("");
    const userName = ref("");
    return { email, userName };
  },

  {
    // https://prazdevs.github.io/pinia-plugin-persistedstate/guide/
    persist: true,
  }
);
