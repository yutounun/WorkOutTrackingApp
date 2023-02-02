<script async setup lang="ts">
import Firebase from "@/components/samples/FirebaseSample.vue";
import Button from "@/components/atoms/commons/CommonButton.vue";
import SelectBox from "@/components/atoms/commons/CommonSelectBox.vue";
import RoundedInput from "@/components/atoms/commons/CommonRoundedInput.vue";
import Card from "@/components/organisms/food/FoodCard.vue";
import PopularItem from "@/components/organisms/home/PopularItem.vue";
import Header from "@/components/organisms/commons/CommonHeader.vue";
import Tabs from "@/components/organisms/commons/CommonTabs.vue";
import Footer from "@/components/organisms/commons/CommonFooter.vue";

const video = "/temp-pix/video.svg";
const smallProfile = "/icons/SmallProfile.svg";
const options = ["aa", "bb"];
const onClickFirstMenu = (status: any) => {
  console.log(status.value);
};
</script>

<template>
  <Suspense>
    <template #default>
      <div>
        <Header title="Workout" />
        <Firebase class="pt-32" />
        <Tabs
          first-item="sausage"
          second-item="bread"
          @isFirstMenuClicked="onClickFirstMenu"
        />
        <img :src="video" alt="" />
        <RoundedInput placeholder="test" class="w-full" />
        <SelectBox placeholder="test" :options="options" class="h-5/6" />
        <Button label="Submit" class="bg-primary h-40" />
        <img :src="smallProfile" alt="" />
        <Card
          class="h-44 w-44"
          text="This is a new shoes every single person are craving for"
          title="AirMax 999"
        />
        <PopularItem
          class="w-44 mb-32"
          url="/temp-pix/nikeShoes.png"
          text="This is a new shoes every single person are craving for"
          title="AirMax 999"
        />
        <Footer />
      </div>
    </template>
    <template #fallback> loading... </template>
  </Suspense>
</template>
