<script setup lang="ts">
import RoundedInput from "@/components/atoms/commons/CommonRoundedInput.vue";
import Modal from "@/components/organisms/commons/CommonModal.vue";
import { format } from "date-fns";
import { ref } from "vue";

const props = defineProps({
  menu: Object,
});
const emits = defineEmits(["remove", "submit"]);
const remove = () => {
  emits("remove");
};

////////// Edit Modal //////////

const workoutMenu = ref(props.menu);

const initialDate = () => {
  return format(new Date(), "yyyy-MM-dd");
};

const onSelectDate = (date: any) => {
  workoutMenu.value.date = date;
};

const inputTitle = (title: string) => {
  workoutMenu.value.title = title;
};

const inputWeight = (weight: number) => {
  workoutMenu.value.weight = weight;
};

const inputReps = (reps: number) => {
  workoutMenu.value.reps = Number(reps);
};

const inputSets = (sets: number) => {
  workoutMenu.value.sets = Number(sets);
};

const submit = () => {
  console.log("workoutMenu.value :", workoutMenu.value);
  emits("submit", workoutMenu.value);
};
</script>

<template>
  <div class="border-b mt-0 border-gray-2">
    <div class="py-3 mx-3 flex flex-row" :class="$attrs">
      <span class="font-semibold text-lg text-primary">
        <slot name="date" />
      </span>
      <div class="w-1/12 flex justify-center items-center">
        <slot name="icon" />
      </div>
      <div class="w-3/5 flex-col flex justify-start">
        <span class="font-semibold text-lg text-primary">
          <slot name="title" />
        </span>
        <span class="text-gray-3">
          <slot name="bottom" />
        </span>
      </div>
      <div class="w-1/5 flex mr-10 lg:mr-0 lg:justify-end">
        <!-- Remove item -->
        <img src="/icons/trash.svg" alt="" @click="remove" />
        <!-- Edit item -->
        <Modal @submit="submit" to="#workout-list-body">
          <template #inputBoxes>
            <main class="px-6 font-sans mt-3">
              <div class="text-center">
                <!-- calendar -->
                <p class="font-medium text-base ml-3 text-left mb-2 mt-5">
                  Date
                </p>
                <RoundedInput
                  type="date"
                  class="h-10 mb-5 rounded-lg"
                  :value="initialDate()"
                  @input="onSelectDate($event.target.value)"
                />
                <!-- title -->
                <p class="font-medium text-base ml-3 text-left mb-2">
                  Name Of Workout
                </p>
                <RoundedInput
                  placeholder="Enter the title"
                  class="my-2"
                  @inputContent="inputTitle"
                  :value="workoutMenu.title"
                />

                <!-- weight -->
                <p class="font-medium text-base ml-3 text-left mb-2 mt-2">
                  Weight
                </p>
                <RoundedInput
                  placeholder="Enter the weight"
                  class="my-2"
                  @inputContent="inputWeight"
                  type="text"
                  pattern="\d*"
                  :value="workoutMenu.weight"
                />

                <!-- reps -->
                <p class="font-medium text-base ml-3 text-left mb-2 mt-2">
                  Reps
                </p>
                <RoundedInput
                  placeholder="Enter the reps"
                  class="my-2"
                  type="text"
                  pattern="\d*"
                  @inputContent="inputReps"
                  :value="workoutMenu.reps"
                />

                <!-- sets -->
                <p class="font-medium text-base ml-3 text-left mt-2">Sets</p>
                <RoundedInput
                  placeholder="Enter the number of sets"
                  class="my-2 mb-10"
                  type="text"
                  pattern="\d*"
                  @inputContent="inputSets"
                  :value="workoutMenu.sets"
                />
              </div>
            </main>
          </template>
        </Modal>
      </div>
    </div>
  </div>
</template>
