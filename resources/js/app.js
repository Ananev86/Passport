/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */



window.Vue = require('vue').default;
import { createApp } from 'vue';
import router from "./router/router";
import lab from "./components/UI/index"
import store from "./store/index";

const app=createApp({})
lab.forEach(com => {
    app.component(com.name, com)
})


app.use(router).use(store).mount("#app")

