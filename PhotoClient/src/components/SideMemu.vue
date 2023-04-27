<template>
    <div class="dropdown">
        <button @click="isOpen = !isOpen"><img style="width: 20px" src="../assets/dots.png"></button>
        <ul v-show="isOpen">
            <li @click="selectOption('')">Home</li>

            <div v-show="$store.state.username == ''">

                <li @click="selectOption('Login')">Login</li>
                <li @click="selectOption('Register')">Register</li>

            </div>

            <div v-show="$store.state.username !== ''">

                <li @click="selectOption('photo')">photo</li>
                <li @click="selectOption('Post')">Post</li>
                <li @click="setProfile()">Profile</li>
                <li @click="logOut()">Logout</li>

            </div>

            <li @click="selectOption('About')">About</li>
        </ul>
    </div>
</template>

<script setup>
import { RouterLink, RouterView, useRouter } from 'vue-router'
import store from '../store/store';
import { ref, onBeforeMount, defineEmits, } from "vue"

const router = useRouter()
const isOpen = ref(false)
const selectOption = (option) => {

    isOpen.value = false;
    router.push("/" + option)
}

const setProfile = () => {

    isOpen.value = false;
    let sn = store.state.username
    store.commit('setProfile', sn)
    router.push("/profile")
}


const logOut = () => {

    isOpen.value = false;

    store.commit('setProfile', "")
    store.commit('setToken', "")
    store.commit('setUsername', "")
    router.push("/")
}
</script>
  
<style scoped>
.dropdown {
    position: relative;
    display: inline-block;
}

button {
    background-color: transparent;
    border: none;
    color: #333;
    padding: 10px;
    font-size: 16px;
    cursor: pointer;
}

ul {

    color: var(--Maroon_Brown);
    list-style: none;
    padding: 0;
    margin: 0;
    position: absolute;
    top: 100%;
    left: -60px;
    background-color: #f2f2f2;
    min-width: 100px;
    z-index: 1;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
}

li {
    background-color: antiquewhite;
    padding: 10px;
    cursor: pointer;
}

li:hover {
    background-color: #e6e6e6;
}
</style>
  