<script setup lang="ts">
import { format } from "date-fns";
import { ref } from "vue";
import CommonRoundedInput from "../../atoms/commons/CommonRoundedInput.vue";
import Modal from "../commons/CommonModal.vue";

const props = defineProps({
  id: String,
  title: String,
  carbo: Number,
  protein: Number,
  fat: Number,
  cost: Number,
  date: String,
});

const emits = defineEmits(["remove", "edit"]);
const remove = () => {
  emits("remove");
};

////////// Edit Modal //////////

const foodMenu = ref({ ...props });

const initialDate = () => {
  return format(new Date(), "yyyy-MM-dd");
};

const onSelectDate = (date: any) => {
  foodMenu.value.date = date;
};

const inputTitle = (title: string) => {
  foodMenu.value.title = title;
};

const inputProtein = (protein: number) => {
  foodMenu.value.protein = protein;
};

const inputFat = (fat: number) => {
  foodMenu.value.fat = Number(fat);
};

const inputCarbo = (carbo: number) => {
  foodMenu.value.carbo = Number(carbo);
};

const inputCost = (cost: number) => {
  foodMenu.value.cost = Number(cost);
};

const submit = () => {
  emits("edit", foodMenu.value);
};
</script>

<template>
  <div class="border-b border-gray-2 mt-0 w-auto">
    <div class="ml-3 my-2 flex justify-between" :class="$attrs">
      <div class="pl-6">
        <span class="font-semibold text-lg text-primary">
          {{ props.title }}
        </span>
        <div class="flex gap-2 mt-2">
          <span class="text-gray-3"> ${{ props.cost }} </span>
          <span class="text-gray-3"> P: {{ props.protein }} </span>
          <span class="text-gray-3"> F: {{ props.fat }} </span>
          <span class="text-gray-3"> C: {{ props.carbo }} </span>
        </div>
      </div>
      <div class="flex mr-16">
        <!-- Remove item -->
        <img src="/icons/trash.svg" alt="" @click="remove" />
        <!-- Edit item -->
        <Modal @submit="submit" to="#food-list-body">
          <template #inputBoxes>
            <main class="px-6 font-sans mt-3">
              <div class="text-center">
                <!-- calendar -->
                <p class="font-medium text-base ml-3 text-left mb-2 mt-5">
                  Date
                </p>
                <CommonRoundedInput
                  type="date"
                  class="h-10 mb-5 rounded-lg"
                  :value="initialDate()"
                  @input="onSelectDate($event.target.value)"
                />
                <!-- title -->
                <p class="font-medium text-base ml-3 text-left mb-2">Title</p>
                <CommonRoundedInput
                  placeholder="Enter the title"
                  class="my-2"
                  @inputContent="inputTitle"
                  :value="foodMenu.title"
                />

                <!-- protein -->
                <p class="font-medium text-base ml-3 text-left mb-2 mt-2">
                  Protein
                </p>
                <CommonRoundedInput
                  placeholder="Enter the amount of protein"
                  class="my-2"
                  @inputContent="inputProtein"
                  type="text"
                  pattern="\d*"
                  :value="foodMenu.protein"
                />

                <!-- fat -->
                <p class="font-medium text-base ml-3 text-left mb-2 mt-2">
                  Fat
                </p>
                <CommonRoundedInput
                  placeholder="Enter the amount of fat"
                  class="my-2"
                  @inputContent="inputFat"
                  type="text"
                  pattern="\d*"
                  :value="foodMenu.fat"
                />

                <!-- carbo -->
                <p class="font-medium text-base ml-3 text-left mb-2 mt-2">
                  Carbo
                </p>
                <CommonRoundedInput
                  placeholder="Enter the amount of carbo"
                  class="my-2"
                  type="text"
                  pattern="\d*"
                  @inputContent="inputCarbo"
                  :value="foodMenu.carbo"
                />

                <!-- cost -->
                <p class="font-medium text-base ml-3 text-left mt-2">Cost</p>
                <CommonRoundedInput
                  placeholder="Enter the amount of cost"
                  class="my-2 mb-10"
                  type="text"
                  pattern="\d*"
                  @inputContent="inputCost"
                  :value="foodMenu.cost"
                />
              </div>
            </main>
          </template>
        </Modal>
      </div>
    </div>
  </div>
</template>
