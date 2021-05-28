<template>

  <div class="container col-xl-10 col-xxl-8 px-4 py-5">
    <div class="row align-items-center g-lg-5 py-5">
      <div class="col-lg-7 text-center text-lg-start">
        <h1 class="display-4 fw-bold lh-1 mb-3">Vertically centered hero sign-up form</h1>
        <p class="col-lg-10 fs-4">Below is an example form built entirely with Bootstrap’s form controls. Each required form group has a validation state that can be triggered by attempting to submit the form without completing it.</p>
        <router-link class="btn btn-dark btn-lg" to="/about">Sobre Nosotros</router-link>
      </div>
      <div class="col-md-10 mx-auto col-lg-5">
        
        <form @submit.prevent="loguearse" class="p-4 p-md-5 mt-2 border rounded-3 bg-light">
          <div v-if="error" class="alert alert-warning">{{error}}</div>
          <div class="form-floating mb-3">
            <input 
              type="email" 
              class="form-control" id="floatingInput" 
              placeholder="name@example.com"
              v-model.trim="email"  
            >
            <label for="floatingInput">Email address</label>
          </div>
          <div class="form-floating mb-3">
            <input 
              type="password"  
              class="form-control" 
              id="floatingPassword" 
              placeholder="Password"
              v-model.trim="password"
            >
            <label for="floatingPassword">Password</label>
          </div>
          <button :disabled="inactivo" class="w-100 btn btn-lg btn-dark" type="submit">Sign up</button>
          <hr class="my-4">
          <small class="text-muted">By clicking Sign up, you agree to the terms of use.</small>
        </form>
      </div>
    </div>
  </div>

</template>

<script>

import {ref, computed, onBeforeMount} from 'vue'
import useStudent from '../store/useStudent'
import jwt_decode from "jwt-decode";
import { useRouter } from 'vue-router'
export default {
  name: 'Home',
  components: {}, 
  setup(){

    //const router = useRouter()
    const {updateStudent, updateIsLoggedIn, getIsLoggedIn, getStudent} = useStudent()
    const email = ref('')
    const password = ref('')
    const error = ref('')
    const router = useRouter()

    const loggedIn = getIsLoggedIn()
    const student = getStudent()

    const inactivo = computed(()=>{
      return email.value !== '' && password.value !== '' && password.value.length >= 6 ? false : true
    })

    const loguearse = async()=>{

        const datos = {email: email.value, password: password.value}

        email.value = '';
        password.value = '';

        try {

            const res = await fetch('https://hypnothera.herokuapp.com/api/students/login', {
                method: 'POST', 
                headers: {'Content-Type': 'application/json'}, 
                body: JSON.stringify(datos)
            })

            const data = await res.json()

            if(!data.token){

              if(data.errors){
                console.log(data.errors[0].msg)
                error.value = data.errors[0].msg
              }else{
                console.log(data.msg)
                error.value = data.msg
              }

              setTimeout(()=>{
                error.value = ''
              }, 4000)
              
              return
            }
              
            const {student} = jwt_decode(data.token)
            localStorage.setItem('token', data.token)
            
            updateStudent(student)
            updateIsLoggedIn(true)

            router.push('/perfil')
          
        } catch (err) {
          error.value = err.msg
        }

    }

    onBeforeMount(()=>{

      if(localStorage.getItem('token') && localStorage.getItem('token').length > 0){
        router.push('/perfil')
      }

    })

    return {
      email, password, loguearse, inactivo, error, loggedIn, student
    }

  }
}
</script>
