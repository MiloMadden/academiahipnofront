import {reactive, readonly, computed} from 'vue'

const defaultState = {
    student: null, 
    isLoggedIn: false
}

const state = reactive(defaultState)

const getters = {
    getIsLoggedIn: ()=>{
        return computed(()=> state.isLoggedIn)
    }, 
    getStudent: ()=>{
        return computed(()=> state.student)
    }
}

const actions = {
    updateStudent: (student)=>{
        state.student = student
    },
    updateIsLoggedIn: (login)=>{
        state.isLoggedIn = login
    }

}

export default ()=>({
    state: readonly(state), 
    ...getters, 
    ...actions
})