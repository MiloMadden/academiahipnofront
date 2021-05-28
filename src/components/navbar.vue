<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container">
            <router-link class="navbar-brand" :to="loggedIn ? '/perfil' : '/'">Academia</router-link>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav ms-auto mb-2 mb-lg-0 d-flex align-items-center">

                <li v-if="loggedIn && student" class="text-white mx-4">
                    <span>Welcome, {{student.name}}</span>
                </li>
                <li v-if="!loggedIn" class="nav-item">
                    <router-link class="nav-link" aria-current="page" to="/">Home</router-link>
                </li>
                <li v-if="!loggedIn" class="nav-item">
                    <router-link class="nav-link" aria-current="page" to="/about">Quienes somos?</router-link>
                </li>
                <li v-if="!loggedIn" class="nav-item">
                    <router-link class="nav-link" to="/register">
                        <i class="fas fa-sign-in-alt me-2"></i>
                        <span>Join</span>
                    </router-link>
                </li>
                <li v-else class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <i class="far fa-user-circle me-2"></i>
                        <span>User</span>
                    </a>
                    <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                        <li><a class="dropdown-item" href="#">Action</a></li>
                        <li><a class="dropdown-item" href="#">Another action</a></li>
                        <li><hr class="dropdown-divider"></li>
                        <li @click="logout"><span class="dropdown-item" type="button">Cerrar Sesion</span></li>
                    </ul>
                </li>

            </ul>
            </div>
        </div>
    </nav>
</template>
<script>
//import {ref, inject, computed} from 'vue'
import useStudent from '../store/useStudent'
import {useRouter} from 'vue-router'
export default {
    setup(){
        
        const {getStudent, getIsLoggedIn, updateStudent, updateIsLoggedIn} = useStudent()
        const student = getStudent()
        const loggedIn = getIsLoggedIn()
        const router = useRouter()

        const logout = ()=>{
            localStorage.removeItem('token')
            updateStudent(null)
            updateIsLoggedIn(false)

            router.push('/')
        }

        return {
            student, loggedIn, logout
        }
    }
}
</script>