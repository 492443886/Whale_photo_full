import { createStore } from "vuex";
import createPersistedState from 'vuex-persistedstate'
const store = createStore({
    strict: true,
    plugins: [createPersistedState({
        storage: window.sessionStorage,
    })],
    state: {
        token: "",
        username: "",
        profile: ""
    },
    getters: {
    },
    mutations: {
        setToken(state, input) {
            state.token = input;
        },
        setUsername: (state, input) => {
            state.username = input;
        },
        setProfile: (state, input) => {
            state.profile = input;
        }
    }
})

export default store