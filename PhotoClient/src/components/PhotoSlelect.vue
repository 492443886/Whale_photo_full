<script setup>
import Service from "../service"
import { ref, onBeforeMount, defineEmits } from "vue"
import Btn from "./Btn.vue"

const photos = ref("")
const selectedPhotos = ref([])
const emit = defineEmits(['submit'])

const getPhotos = async () => {
  photos.value = await Service.getPhoto();
}

const onPhoto = async (e) => {
  let i = e.currentTarget.getAttribute('my_i')


  if (!selectedPhotos.value.includes(photos.value[i])) {

    e.currentTarget.classList.add("selected")
    selectedPhotos.value.push(photos.value[i])
  }
  else {
    e.currentTarget.classList.remove("selected");


    selectedPhotos.value = selectedPhotos.value.filter(x => x !== photos.value[i]);
  }

}

const emitEvent = async () => {

  emit('submit', { pho: selectedPhotos.value });
}

onBeforeMount(async () => {
  await getPhotos()

})

</script>

<template>
  <h3>Choose your photo:</h3>
  <div class="gallery">

    <img v-for="(photo, index) in photos " :key="index" :my_i="index" :src="photo.str" @click="onPhoto" />
  </div>
  <br>
  <Btn @click="emitEvent">submit</Btn>
</template>
  
<style scoped>
.gallery {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 1em;
}

/* Gallery Image */
.gallery img {
  width: 100%;
  height: auto;
}

/* Image Hover Effect */
.gallery img:hover {
  opacity: 0.7;
  cursor: pointer;
}

.gallery .selected {
  padding: 2px;
  border: 2px rgb(127, 58, 218) dotted;
  /* cursor: pointer; */
}
</style>