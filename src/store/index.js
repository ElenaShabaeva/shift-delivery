import { createStore } from "vuex"
import { auth } from "./auth.module"
import { delivery } from "./delivery.module"
import { user } from "./user.module"

export default createStore({
    modules: {
        auth: auth,
        delivery: delivery,
        user: user,
    }
})