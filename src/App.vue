<template>
  <div id="app">
    <Navbar />
    <div class="vh-100">
      <router-view/>      
      <Footer />
    </div>
    


  </div>
</template>
<script>
import Navbar from './components/navbar'
import Footer from './components/footer'
import useStudent from './store/useStudent'

export default {
  components: {
    Navbar, Footer
  },
  setup(){

    const {getIsLoggedIn, getStudent} = useStudent()
    const loggedIn = getIsLoggedIn()
    const student = getStudent()

    // ver si hay token en el localstorage y fijar variables student y logged in

  }
  
}
</script>
<style>

@import url('https://fonts.googleapis.com/css2?family=Comfortaa&display=swap');

body{
  font-family: 'Comfortaa', cursive;
}

</style>
