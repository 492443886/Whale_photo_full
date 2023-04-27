<script setup>
import LRS from "../LRServiceClient";
import Service from "../service";
import { ref } from 'vue'
import { useRouter } from 'vue-router';

const username = ref("")
const password = ref("");
const password2 = ref("");
const message = ref("");
const router = useRouter()

const register = async () => {

  if (password.value !== password2.value) {
    message.value = "Passwords do not match!";
    return;
  }

  const res = await LRS.register(username.value, password.value);

  if (res.status === 200) {
    alert("Register Success");
    Service.createProfile(username.value)

    router.push("/Login");
  } else {
    message.value = res.data.message;
  }
}


</script>

<template>
  <div class="login-box">

    <h1>Resgister</h1>
    <div class="form">
      <label>Username:</label>
      <input type="text" v-model="username" />
      <label>Password:</label>
      <input type="password" v-model="password" />
      <label>Password:</label>
      <input type="password" v-model="password2" />
      <button @click="register"> Resgister </button>

    </div>
    <br />
    <label>{{ message }}</label>

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