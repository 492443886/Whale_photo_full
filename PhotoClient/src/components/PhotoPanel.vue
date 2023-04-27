
<script setup>
const props = defineProps({
  p: Object
})
</script>

<template>
  <img :src="p.str" />

  <div class="description">{{ p.description }}</div>

  <slot></slot>
</template>
  
<style scoped>
img {
  width: 100%;
  border-radius: 4px;
}

.description {

  padding: 10px;
  line-height: 1.5;
  color: var(--Maroon_Brown);
  font-size: 20px;
  line-height: 1.5;
  font-style: italic;
}
</style>