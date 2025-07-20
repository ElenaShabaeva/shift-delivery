import { createStore } from "vuex"
import { auth } from "./auth.module"
import { main } from "./main.module"
import { user } from "./user.module"
import { delivery } from "./delivery.module"

export default createStore({
    modules: {
        auth: auth,
        main: main,
        user: user,
        delivery: delivery
    }
})