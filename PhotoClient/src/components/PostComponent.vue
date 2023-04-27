<script setup>

import { ref, onMounted, onBeforeMount, defineEmits } from "vue"
import { RouterLink, RouterView, useRouter } from 'vue-router'

import PhotoGallery from "./PhotoGallery.vue";
import PhotoPanel from "./PhotoPanel.vue";
import Pop from "../components/Pop.vue"
import Service from "../service"
import Btn from "./Btn.vue"
import store from '../store/store';

const props = defineProps({
  p: Object
})
const router = useRouter()
let m_phtotos = ref([])
const selectedPhoto = ref("")
const r_comment = ref("")
const is_add_c = ref(false)
const selectP = async p => selectedPhoto.value = p.pho

const timeFormat = (t) => {

  const date = new Date(t);
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };

  const formattedDate = date.toLocaleDateString('en-US', options);
  console.log(formattedDate);

  return formattedDate
}


const getPhotos = async () => {

  m_phtotos.value = await Service.getPhotoById(props.p.photos)
}

const f_comment = async () => {

  let myicon = await getIcon(store.state.username)

  props.p.comments.push({ user: "You", comment: r_comment.value, iconstr: myicon })
  await Service.commentPost(props.p._id, r_comment.value)

  is_add_c.value = false

}

const setProfile = (user) => {
  store.commit('setProfile', user)
  router.push("/profile")
}
const getIcon = async (user) => {
  let pf = await Service.getProfile(user)

  // console.log("TTTT")
  // console.log(pf.icon)

  if (pf.icon === "") {
    return ""
  } else {
    let photo = await Service.getPhotoById([pf.icon])

    if (photo.length === 0 & photo[0] == undefined) {
      return ""
    }
    return photo[0].str;
  }


}


onBeforeMount(async () => {
  await getPhotos()
  props.p.iconstr = await getIcon(props.p.username)


  for (let i = 0; i < props.p.comments.length; i++) {

    props.p.comments[i].iconstr = await getIcon(props.p.comments[i].user)
    console.log(props.p.comments[i])
  }

})


</script>

<template>
  <div>
    <Pop v-if="selectedPhoto !== ''">
      <PhotoPanel :p="selectedPhoto"></PhotoPanel>
      <Btn @click="selectedPhoto = ''">
        cancel
      </Btn>
    </Pop>

    <div class="container">


      <div class="postheader">
        <div>
          <h1>{{ p.title }}</h1>

          <p class="date">Posted on {{ timeFormat(p.createdAt) }} by <a @click="setProfile(p.username)" href="#">{{
            p.username }}</a>

          </p>
        </div>
        <img v-if="(p.iconstr !== '')" :src="p.iconstr" style="border-radius: 50%; height: 50px; width: 50px; " />
      </div>

      <PhotoGallery @select="selectP" :photos=m_phtotos></PhotoGallery>
      <p class="content">
        {{ p.content }}
      </p>
      <hr>

      <div class="commnets">


        <Btn v-show="!is_add_c" @click="is_add_c = true">
          + Comment
        </Btn>
        <div v-show="is_add_c">

          <textarea v-model="r_comment"></textarea>
          <br>
          <Btn @click="f_comment()">Comment</Btn>
          <Btn @click="is_add_c = false">Cancel</Btn>

        </div>
        <br>
        <br>



        <div v-for="(comment, index) in p.comments.slice().reverse()" :key="index">

          <div class="comment-container">

            <img v-if="(comment.iconstr === '')" @click="setProfile(comment.user)" src="../assets/user.png"
              class="comment-img" />
            <img v-if="(comment.iconstr !== '')" @click="setProfile(comment.user)" :src="comment.iconstr"
              class="comment-img" />
            <h4 @click="setProfile(comment.user)" class="comment-username">{{ comment.user }}</h4>
          </div>

          <div>{{ comment.comment }}</div>
          <hr>
        </div>

      </div>
    </div>
    <br>
  </div>
</template>
  
<style scoped>
.commnets {
  width: 95%;
  margin: auto;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: var(--Muted_Green);
}

h1 {
  font-size: 32px;
  margin-bottom: 10px;
}

.date {
  font-style: italic;
  margin-bottom: 20px;
}

img {
  max-width: 100%;
  margin-bottom: 20px;
}

.content {
  font-size: 23px;
  line-height: 1.5;
  font-style: italic;

}

textarea {
  width: 100%
}

.postheader {
  display: flex;
  justify-content: space-between;
}


.comment-container {
  display: flex;
  align-items: stretch;
}

.comment-img {
  border-radius: 50%;
  height: 30px;
  width: 30px;
  margin-right: 10px;
  object-fit: cover;
}

.comment-username {
  margin: 0;
  font-size: 18px;
  line-height: 30px;
}

.comment-img:hover,
.comment-username:hover {
  cursor: pointer;
}
</style>