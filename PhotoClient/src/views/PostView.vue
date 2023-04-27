<script setup>
import AddPostComponent from "../components/AddPostComponent.vue"
import Service from "../service"
import { ref, onBeforeMount, onMounted } from "vue"
import PostComponent from "../components/PostComponent.vue"
import Btn from "../components/Btn.vue"

const allPosts = ref([])
const isAddPost = ref(false)
const getPosts = async () => {

    allPosts.value = await Service.getPosts()
    isAddPost.value = false
}

onMounted(async () => {
    await getPosts()
})

</script>

<template>
    <div class="m">
        <div class="container">

            <Btn v-if="!isAddPost" @click="isAddPost = true">Add Post</btn>
            <Btn v-if="isAddPost" @click="isAddPost = false">Cancel</btn>
            <br>
            <br>

            <AddPostComponent @posted="getPosts" v-if="isAddPost"></AddPostComponent>

            <div class="reverseorder">
                <PostComponent v-for="(post, index) in allPosts" :key="index" :p="post"></PostComponent>
            </div>
        </div>
    </div>
</template>
  
<style scoped>
.reverseorder {
    display: flex;
    flex-direction: column-reverse;
}

.m {
    background-color: var(--Beige);
    color: var(--Maroon_Brown)
}

.container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    background-color: var(--Perriwinkle);

}
</style>
  