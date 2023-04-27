import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store';
import './assets/main.css'
import axios from 'axios';



const app = createApp(App)

app.use(router)
app.use(store)
axios.defaults.headers.common["authorization"] = store.state.token
app.mount('#app')
