<script async setup lang="ts">
import { collection, doc, setDoc, getDoc } from "firebase/firestore";
import { ref } from "vue";
import db from "@/firebase/init";

// get a collection Reference
const foodsRef = collection(db, "foods");

// Get data of a specified document
const docRef = doc(db, "foods", "foods");
const docSnap = await getDoc(docRef);

const data = ref();

const retrieveFromFirebase = () => {
  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
    data.value = docSnap.data();
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }
};

// Keep data to register on firebase store
const registerOnFirebase = () => {
  const sentData = setDoc(doc(foodsRef, "foods"), {
    foods: [
      {
        carbo: 120,
        cost: 400,
        fat: 30,
        name: "salmon",
        protein: 30,
      },
      {
        carbo: 100,
        cost: 1000,
        fat: 70,
        name: "portk",
        protein: 50,
      },
    ],
  });
  console.log("sentData :", sentData);
};
</script>

<template>
  <div class="flex flex-col w-30 h-60">
    <button class="btn mb-4" @click="registerOnFirebase">
      Regist food data
    </button>
    <button class="btn" @click="retrieveFromFirebase">
      Retrieve food data
    </button>
    <div class="w-30 text-cyan-500">
      {{ data }}
    </div>
  </div>
</template>
