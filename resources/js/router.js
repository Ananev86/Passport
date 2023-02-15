import { createRouter, createWebHistory } from "vue-router";
//import { Container } from "./views/layout/Container";
//import {AppComponent} from "./components/ExampleComponent.vue"

const routes = [
    {
        path: "/",
    //    name:"Container",
        component: function() {return import('./views/layout/Container')}
    }

]
const router=createRouter(
    {
        routes,
        history:createWebHistory(process.env.BASE_URL)
    }
)
export default router