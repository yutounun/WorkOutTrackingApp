<script setup lang="ts">
import Alert from "@/components/organisms/commons/CommonAlert.vue";
import { db } from "@/firebase/init";
import {
  doc,
  collection,
  getDocs,
  deleteDoc,
  setDoc,
  orderBy,
  query,
} from "firebase/firestore";
import WorkoutCard from "@/components/organisms/workout/WorkoutCard.vue";
import Footer from "@/components/organisms/commons/CommonFooter.vue";
import Header from "@/components/organisms/commons/CommonHeader.vue";
import Modal from "@/components/organisms/commons/CommonModal.vue";
import { ref } from "vue";
import { useProfileStore } from "../stores/profile";

const profile = useProfileStore();
const workoutList = ref([]);

/** Get all workout menus from firestore */
const getWorkoutList = async () => {
  try {
    // Get the ref to workouts collection in user doc
    const q = query(
      collection(db, "users", profile.email, "workouts"),
      orderBy("date", "desc")
    );
    // add data in workouts ref
    const workoutDocs = await getDocs(q);

    const list = [];

    workoutDocs.forEach((doc) => {
      const data = doc.data();
      // Insert id of a document
      data.id = doc.id;
      list.push(data);
    });

    console.log("workout menus :", list);

    // clear workout list
    workoutList.value = [];

    list.forEach((doc) => {
      workoutList.value.push(doc);
    });
  } catch (e) {
    console.log(e);
  }
};

/** Created */
getWorkoutList();

const remove = async (id) => {
  await deleteDoc(doc(db, "users", useProfileStore().email, "workouts", id));
  getWorkoutList();
};
const submit = async (workoutMenu) => {
  const userDocRef = doc(
    db,
    "users",
    useProfileStore().email,
    "workouts",
    workoutMenu.id
  );
  await setDoc(userDocRef, workoutMenu)
    .then(() => {
      successfulAlertEvent();
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
  <Header title="Workout List" />
  <div class="pb-32 mt-20 lg:mx-96" id="workout-list-body">
    <main>
      <!-- Shown only when any data hasn't been registered -->
      <div v-if="workoutList.length === 0" class="mt-24">
        <p class="font-semibold text-center">No Data Registered</p>
      </div>

      <!-- When any data is registered -->
      <div
        v-else
        v-for="(menu, index) in workoutList"
        :key="menu.title"
        class="font-sans"
      >
        <div
          v-if="index === 0 || workoutList[index - 1].date !== menu.date"
          class="px-6 mt-7"
        >
          <span class="font-semibold text-lg text-primary">{{
            menu.date
          }}</span>
        </div>
        <WorkoutCard
          class="mt-5"
          @remove="remove(menu.id)"
          @submit="submit"
          :menu="menu"
        >
          <template #title>{{ menu.title }}</template>
          <template #bottom
            >{{ menu.weight }}kg × {{ menu.reps }}reps ×
            {{ menu.sets }}</template
          >
          <Modal />
        </WorkoutCard>
      </div>
    </main>
  </div>
  <Alert
    :showsSuccessAlert="showsSuccessAlert"
    label="Congrats!! Succeeded to register workout data"
    class="fixed bottom-28"
  />
  <Footer menu />
</template>
