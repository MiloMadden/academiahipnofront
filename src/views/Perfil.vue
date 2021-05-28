<template>
    <div class="vh-100">
        perfil
        {{loggedIn}}
        {{student}}
    </div>
</template>
<script>

import {onMounted, onBeforeMount, ref} from 'vue'
import useStudent from '../store/useStudent'
import jwt_decode from "jwt-decode";
import {useRouter} from 'vue-router'

export default {
    setup(){

        const {updateStudent, updateIsLoggedIn, getStudent, getIsLoggedIn} = useStudent()

        const loggedIn = ref(false)
        const student = ref(null)
        const router = useRouter()

        onBeforeMount(()=>{
            
            if(localStorage.getItem('token') && localStorage.getItem('token') !== ''){
                const {student} = jwt_decode(localStorage.getItem('token'))
                

                updateStudent(student)
                updateIsLoggedIn(true)

            }else{
                updateStudent(null)
                updateIsLoggedIn(false)
                //router.push('/')
            }
        })

        onMounted(()=>{
            loggedIn.value = getIsLoggedIn().value
            student.value = getStudent().value

            //console.log(student.value.value)
        })

        return {
            loggedIn, student
        }
    }
}
</script>