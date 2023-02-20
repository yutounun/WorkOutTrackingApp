<script setup lang="ts">
import { db } from "@/firebase/init";
import { getFoodsList } from "@/apis/getFoodList";
import FoodCard from "@/components/organisms/food/FoodCard.vue";
import Footer from "@/components/organisms/commons/CommonFooter.vue";
import Header from "@/components/organisms/commons/CommonHeader.vue";
import { ref } from "vue";
import { useProfileStore } from "@/stores/profile";
import { deleteDoc, doc } from "@firebase/firestore";

const foodList = ref([]);

const getList = () => {
  getFoodsList(useProfileStore().email, "desc")
    .then((result) => {
      foodList.value = result;
    })
    .catch((err) => {
      console.log("err :", err);
    });
};
/** Created */
getList();

const remove = async (id) => {
  await deleteDoc(doc(db, "users", useProfileStore().email, "foods", id));
  getList();
};
const edit = (id) => {
  console.log("id :", id);
};
</script>

<template>
  <Header title="Food List" />
  <main class="font-sans mt-20 pb-32">
    <div v-for="(menu, index) in foodList" :key="menu.title">
      <div
        class="mt-7"
        v-if="index === 0 || foodList[index - 1].date !== menu.date"
      >
        <span class="px-6 font-semibold text-lg text-primary">{{
          menu.date
        }}</span>
      </div>
      <FoodCard
        @remove="remove(menu.id)"
        @edit="edit(menu.id)"
        class="mt-5"
        :id="menu.id"
        :date="menu.date"
        :title="menu.title"
        :carbo="menu.carbo"
        :protein="menu.protein"
        :fat="menu.fat"
        :cost="menu.cost"
      />
    </div>
  </main>
  <Footer food />
</template>
