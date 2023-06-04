<script setup lang="ts">
import { db } from "@/firebase/init";
import { getFoodsList } from "@/apis/getFoodList";
import FoodCard from "@/components/organisms/food/FoodCard.vue";
import Footer from "@/components/organisms/commons/CommonFooter.vue";
import Header from "@/components/organisms/commons/CommonHeader.vue";
import { ref } from "vue";
import { useProfileStore } from "@/stores/profile";
import { deleteDoc, doc, setDoc } from "@firebase/firestore";
import CommonAlert from "../components/organisms/commons/CommonAlert.vue";

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
const edit = async (food) => {
  const userDocRef = doc(
    db,
    "users",
    useProfileStore().email,
    "foods",
    food.id
  );
  await setDoc(userDocRef, food)
    .then(() => {
      successfulAlertEvent();
      getList();
    })
    .catch((error) => {
      console.log(`Unsuccessful returned error ${error}`);
    });
};

const showsSuccessAlert = ref(false);

/** Shows an alert showing you succeeded to register */
const successfulAlertEvent = () => {
  showsSuccessAlert.value = true;

  // Keeps showing a bar for 2 secs
  setTimeout(() => {
    showsSuccessAlert.value = false;
  }, 2000);
};
</script>

<template>
  <Header title="Food List" />
  <div class="pb-32 mt-20 mx-96" id="food-list-body">
    <main class="font-sans mt-20 pb-32">
      <!-- Shown only when any data hasn't been registered -->
      <div v-if="foodList.length === 0" class="mt-24">
        <p class="font-semibold text-center">No Data Registered</p>
      </div>

      <!-- When any data is registered -->
      <div v-for="(menu, index) in foodList" :key="menu.title" v-else>
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
          @edit="edit"
          class="mt-5"
          :date="menu.date"
          :id="menu.id"
          :title="menu.title"
          :carbo="menu.carbo"
          :protein="menu.protein"
          :fat="menu.fat"
          :cost="menu.cost"
        />
      </div>
    </main>
  </div>
  <CommonAlert
    :showsSuccessAlert="showsSuccessAlert"
    label="Congrats!! Succeeded to register workout data"
    class="fixed bottom-28"
  />
  <Footer food />
</template>
