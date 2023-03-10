import axios from "axios";

const state = {
    userDetails: {},
    isLoggedIn: true
}

const actions = {
    registerUser({ }, user) {

        //  return new Promise((resolve, reject) => {
        axios
            .post('/api/register', {
                name: user.name,
                email: user.email,
                password: user.password,
                password_confirmation: user.password_confirmation
            })

            .then(response => {
                console.log(response)
                if (response.data) {
                    window.location.replace("/login")
                    //   resolve(response)
                } else {
                    //     reject(response)
                }
            }).catch((error) => {
                // let errors = error.response.data.errors;
                console.log(error.response)
                // reject(error);
            })
        //       })
    },
    loginUser(ctx, payload) {
        //      return new Promise((resolve, reject) => {
        axios
            .post("/api/login", payload)
            .then(response => {
                if (response.data.access_token) {
                    localStorage.setItem('token', response.data.access_token)
                    window.location.replace("/dashboard")
                }

            }).catch((error) => {
                console.log(error.response);
                //     reject(error)
            })

        //      })
    },

    logout(ctx) {
    //    return new Promise((resolve) => {
            localStorage.removeItem('token');
            ctx.commit('setLoggedIn', false)
       //     resolve(true)
            window.location.replace("login")
  //      })
    },

    setLoggedInstate(ctx) {
       // return new Promise((resolve) => {
            if (localStorage.getItem('token')) {
                ctx.commit('setLoggedIn', true)
               // resolve(true)
            } else {
                ctx.commit('setLoggedIn', false)
             //   resolve(false)
            }
  //      })
    }

}
const mutations = {

    setLoggedIn(state, payload) {
        state.isLoggedIn = payload
    }

}

const getters = {
    loggedIn(state) {
        return state.isLoggedIn
    },
    userDetails(state) {
        return state.userDetails
    }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}