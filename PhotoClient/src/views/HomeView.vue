<script setup>
import Btn from "../components/Btn.vue"
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <main>

    <video autoplay loop playsinline muted>
      <source src="https://css-tricks-post-videos.s3.us-east-1.amazonaws.com/Island%20-%204141.mp4" type="video/mp4">
    </video>
    <div class="content">
      <h1>Welcome Whale Photo</h1>
      <p>Easy way to manage your photos</p>

      <RouterLink to="/Login">
        <Btn>login</Btn>
      </RouterLink>


    </div>

  </main>
</template>

<style scoped>
video {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
}

.content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: #fff;
  font-size: 2rem;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
}
</style>