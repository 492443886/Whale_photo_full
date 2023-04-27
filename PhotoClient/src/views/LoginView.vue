<script setup>
import LRS from "../LRServiceClient";
import { ref } from 'vue'
import { useStore } from 'vuex'
import axios from 'axios'
import { useRouter } from 'vue-router';

const username = ref("")
const password = ref("")
const message = ref("")
const store = useStore()
const router = useRouter()

const log = () => {
    console.log(username.value, password.value)
}

const login = async () => {
    const res = await LRS.login(username.value, password.value);

    if (res.status === 200) {

        store.commit('setToken', res.data.accessToken)
        store.commit('setUsername', username.value)

        axios.defaults.headers.common["authorization"] = store.state.token;

        alert("Login Success!")
        router.push("/");

    } else {
        message.value = res.data.message;
    }
}
</script>

<template>
    
    <div class="login-box">
        <h1>Login</h1>
        <div class="form">
            <label for="username">Username</label>
            <input type="text" id="username" name="username" v-model="username">
            <label for="password">Password</label>
            <input type="password" id="password" name="password" v-model="password">
            <button @click="login">Login</button>

        </div>
        <br>
        <div style="color:crimson">{{ message }}</div>
    </div>
</template>


<style scoped>
.login-box {
    background-color: #aec0da;
    max-width: 400px;
    margin: 100px auto;
    padding: 50px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

}

h1 {
    text-align: center;
    color: var(--Maroon_Brown);
}

.form {
    display: flex;
    flex-direction: column;
}

label {
    margin-bottom: 10px;
    color: var(--Maroon_Brown);
}

/* input[type="text"],
input[type="password"] {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-bottom: 20px;
} */

button {
    background-color: var(--Muted_Green);
    color: #fff;
    padding: 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.2s;
}

button:hover {
    background-color: #3e8e41;
}
</style>