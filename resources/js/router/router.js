import { createRouter, createWebHistory } from "vue-router";
import Middleware from "../middleware/index";
import store from "../store/index";
import middlewarePipeline from "./middlewarePipeline"


const routes = [
    {
        path: "/",
        name: "Container",
        component: function () { return import('../views/layout/Container') }
    },
    {
        path: "/login",
        name: 'Login',
        component: function () { return import('../views/auth/Login') },
       /* meta: {
            middleware: [Middleware.guest]
        }*/
    },
    {
        path: "/register",
        name: 'Register',
        component: function () { return import('../views/auth/Register') },
      /*  meta: {
            middleware: [Middleware.guest]
        }*/
    },
    {
        path: "/dashboard",
        name: 'Dashboard',
        component: function () { return import('../views/pages/Dashboard') },
         meta: {
            middleware: [Middleware.auth]
        }
       

    },
    {
        path: "/dashboard/userprofile",
        name: 'dashboard.UserProfile',
        component: function () { return import('../views/pages/Profile') },
      /*  meta: {
            middleware: [Middleware.auth, Middleware.isSubscribed]
        }*/
    }


]
const router = createRouter(
    {
        routes,
        history: createWebHistory(process.env.BASE_URL)
    }
)
router.beforeEach((to, from, next) => {
  
    if (!to.meta.middleware) {
        return next()
    }

    const middleware = to.meta.middleware

    const context = {
        to,
        from,
        next,
        store
    }


    return middleware[0]({
        ...context,
       next: middlewarePipeline(context, middleware, 1)
    })
})
export default router