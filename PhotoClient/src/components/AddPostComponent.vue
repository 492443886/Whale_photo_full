<script setup>
import PhotoSlelect from "./PhotoSlelect.vue"
import PhotoPanel from "./PhotoPanel.vue"
import PhotoGallery from "./PhotoGallery.vue"
import Btn from "./Btn.vue"
import Pop from "./Pop.vue"
import { ref, onBeforeMount, defineEmits } from "vue"
import Service from "../service"


const photos = ref([])
const title = ref("")
const content = ref("")
const isAddPhoto = ref(false)
const selectedPhoto = ref("")
const selectP = async p => selectedPhoto.value = p.pho

const emit = defineEmits(['posted'])
const handlePotoSelect = event => {

    let v = event.pho;

    for (let i = 0; i < v.length; i++) {
        photos.value.push(v[i])
    }

    isAddPhoto.value = false
}

const toPost = async () => {

    console.log(title.value, content.value, photos.value)
    let result = { title: title.value, content: content.value, photos: photos.value.map(p => p._id) }
    await Service.makePost(result)
    emit('posted');
}
</script>
<template>
    <div class="m">
        <Pop v-if="selectedPhoto !== ''">
            <PhotoPanel :p="selectedPhoto">

                <Btn @click="selectedPhoto = ''">cancel</Btn>
                <Btn @click="photos = photos.filter(p => p !== selectedPhoto); selectedPhoto = ''">remove</Btn>

            </PhotoPanel>
        </Pop>
        <div>
            <h3>New post:</h3>
            <h4>title:</h4>
            <input type="text" v-model="title" />
            <h3>content:</h3>
            <textarea v-model="content"></textarea>
            <br>
            <br>
            <hr>
            <btn v-if="!isAddPhoto" @click="isAddPhoto = true">Add photos</btn>
            <Pop v-if="isAddPhoto">
                <PhotoSlelect @submit="handlePotoSelect"></PhotoSlelect>
                <btn @click="isAddPhoto = false">cancel</btn>
            </Pop>


            <PhotoGallery :photos=photos @select="selectP"></PhotoGallery>
            <btn @click="toPost">Post</btn>
        </div>
    </div>

    <br>
</template>

<style scoped>
.m {
    padding: 15px;
    background-color: var(--Muted_Green);
}

textarea {

    width: 95%;
}
</style>
  