<script setup>
import { RouterLink, RouterView, useRouter } from 'vue-router'
import store from './store/store';
import SideMenu from './components/SideMemu.vue'

const router = useRouter()
const sn = store.state.username

const setProfile = () => {
  store.commit('setProfile', sn)
  router.push("/profile")
}

</script>

<template>
  <header>
    <nav>
      <h3>WhalePhoto</h3>
      <SideMenu></SideMenu>
    </nav>
  </header>
  <RouterView />
</template>

<style>
body {
  background-color: var(--Muted_Green);
}

/* Navigation Bar */
nav {
  background-color: var(--Beige);
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  color: var(--Maroon_Brown);
}

/* Navigation Bar Links */
nav a {

  text-decoration: none;
  font-size: 18px;
  margin-right: 20px;

}

/* Active Link */
nav a.active {
  color: white;
}

input[type="text"],
input[type="password"] {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 20px;
}
</style>
