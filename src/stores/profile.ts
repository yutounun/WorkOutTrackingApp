import { defineStore } from "pinia";
import { ref } from "vue";

export const useProfileStore = defineStore("profile", () => {
  const email = ref("");
  const userName = ref("");
  return { email, userName };
});
