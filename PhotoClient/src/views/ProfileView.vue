<script setup>

import PhotoSlelect from "../components/PhotoSlelect.vue"
import Btn from "../components/Btn.vue"
import Pop from "../components/Pop.vue"
import store from '../store/store';
import Service from '../service'
import { ref, onBeforeMount, defineEmits, } from "vue"

const profile = ref("")

const isEdit = ref(false)
const isSelectPhoto = ref(false)
const picture = ref("")
const user = ref("")

const update = async () => {

  await Service.createProfile(user.value)

  alert("Your profile is updated!")
  isEdit.value = false

}
const handlePotoSelect = event => {

  let v = event.pho;

  if (v.length !== 0) {

    user.value.icon = v[0]._id
    console.log(user.value.icon)
    picture.value = v[0].str
  }

  isSelectPhoto.value = false
}
onBeforeMount(async () => {
  profile.value = store.state.profile
  user.value = await Service.getProfile(profile.value)

  let ps
  if (user.value.icon !== "") {
    ps = await Service.getPhotoById([user.value.icon])
  }

  if (ps !== undefined) {
    if (ps[0] !== undefined) {
      picture.value = ps[0].str
    }
  }
})

</script>


<template>
  <pop v-if="isSelectPhoto">
    <PhotoSlelect @submit="handlePotoSelect"></PhotoSlelect>
    <btn @click="isSelectPhoto = false">cancel</btn>
  </pop>

  <div class="header">

    <img v-if="picture === ''" src="../assets/user.png" style="border-radius: 50%; height: 100%; width: 100%;">
    <img v-if="picture !== ''" :src="picture" style="border-radius: 50%; height: 100%; width: 100%;">
  </div>
  <div style="text-align: center;">
    <btn v-if="isEdit" @click="isSelectPhoto = true">Edit Picture</btn>
  </div>



  <h2>{{ profile }}'s Profile</h2>
  <div class="form">
    <label for="email">Email:</label>
    <input :disabled="!isEdit" v-model="user.email" type="text" id="email" name="email" required>

    <label for="location">Location:</label>
    <input :disabled="!isEdit" v-model="user.location" type="text" id="location" name="location" required>

    <label for="hobby">Hobby:</label>
    <input :disabled="!isEdit" v-model="user.hobby" type="text" id="hobby" name="hobby" required>

    <label for="food">Favorite Food:</label>
    <input :disabled="!isEdit" v-model="user.food" type="text" id="food" name="food" required>

    <label for="birth_year">Birth Year:</label>
    <input :disabled="!isEdit" v-model="user.birth_year" type="number" id="birth_year" name="birth_year" required>

    <btn v-if="isEdit" @click="update()">Save</btn>
    <btn v-if="!isEdit && store.state.profile === store.state.username" @click="isEdit = true">Edit Profile</btn>
  </div>
</template>
  
<style scoped>
.form {
  margin: 20px auto;
  padding: 20px;
  max-width: 500px;
  border: 2px solid var(--Dusty_Rose);
  border-radius: 10px;
  background-color: var(--Beige);
  box-shadow: 0px 0px 5px 0px var(--Dusty_Rose);

}

h2 {
  text-align: center;
  margin-top: 50px;
  font-size: 25px;
  color: var(--Maroon_Brown);
}

label {
  display: block;
  margin-bottom: 10px;
  font-size: 18px;
  color: var(--Maroon_Brown);
}

input[type="text"],
input[type="email"],
input[type="number"] {
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 16px;
  color: #333;
  box-sizing: border-box;
}

.header {
  background-size: cover;
  height: 100px;
  width: 100px;
  border-radius: 50%;
  margin: 20px auto;
  box-shadow: 0px 0px 5px 0px #ccc;
}
</style>
  