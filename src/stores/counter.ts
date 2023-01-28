import { defineStore } from "pinia";

export const useLoginStore = defineStore("login", {
  state: () => ({
    sessionId: "",
  }),
  actions: {
    setSessionId(sessionId: string) {
      this.sessionId = sessionId;
    },
  },
});
