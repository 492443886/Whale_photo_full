<script setup>
import Service from "../service"
import { ref, onBeforeMount } from "vue"
import ImageUploader from "../components/ImageUploader.vue"
import PhotoPanel from "../components/PhotoPanel.vue"
import PhotoGallery from "../components/PhotoGallery.vue"
import Pop from "../components/Pop.vue"
import { useRouter } from 'vue-router';
import Btn from "../components/Btn.vue"
const photos = ref([])
const imgfup = ref("")
const description = ref("")
const selectedPhoto = ref("");
const isAddPhoto = ref(false)
const isUploading = ref(false)

const router = useRouter()

const imageChange = (imgs) => {
    imgfup.value = imgs
}

const makePhoto = async () => {


    isUploading.value = true;
    for (let i = 0; i < imgfup.value.length; i++) {
        let post = { str: imgfup.value[i], description: description.value };
        let res = await Service.makePhoto(post);
        description.value = ""
        await getPhotos()
    }

    isUploading.value = false

    isAddPhoto.value = false
}
const getPhotos = async () => {
    photos.value = await Service.getPhoto();
}

const onDelete = async () => {


    let result = await Service.deletePhoto(selectedPhoto.value._id);
    selectedPhoto.value = ""
    console.log(result);
    getPhotos()
}

const selectP = async p => selectedPhoto.value = p.pho

onBeforeMount(async () => {
    await getPhotos()

})



</script>

<template>
    <Pop v-if="selectedPhoto !== ''">
        <PhotoPanel :p="selectedPhoto">
            <btn @click="selectedPhoto = ''">
                cancel
            </btn>
            <btn @click="onDelete">
                delete
            </btn>
        </PhotoPanel>
    </Pop>

    <div class="container">

        <btn v-if="!isAddPhoto" @click="isAddPhoto = true">+ Photo</btn>
        <div v-if="isAddPhoto">
            <br>
            <ImageUploader v-on:imageChange="imageChange" style="width: 70%;" />
            <br>
            <div>Description: </div>
            <br>
            <textarea v-model="description" style="width: 100%;"></textarea>
            <br>
            <br>
            <div v-if="!isUploading">
                <btn @click="makePhoto">
                    Upload
                </btn>
                <btn @click="isAddPhoto = false">
                    Cancel
                </btn>
            </div>
            <h5 v-if="isUploading">Uploading your photo...</h5>

            <hr>
        </div>
        <br>
        <br>
        <PhotoGallery :photos=photos @select="selectP"></PhotoGallery>
    </div>
</template>

<style scoped>
.container {

    max-width: 1300px;
    padding: 20px;
    margin: auto;
    background-color: var(--Muted_Green);
    font-size: 20px;
    color: var(--Maroon_Brown);
}
</style>
  