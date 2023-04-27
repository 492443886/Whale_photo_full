<script setup>
const props = defineProps({
  photos: Array
})
const emit = defineEmits(['select'])

</script>

<template>
  <div class="gallery">

    <img v-for="(photo, index) in photos " :key="index" :my_i="index" :src="photo.str"
      @click="emit('select', { pho: photo })" />
  </div>
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
</style>