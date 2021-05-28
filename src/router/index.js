import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Registro.vue')
  },
  {
    path: '/perfil',
    name: 'Perfil',
    component: () => import('../views/Perfil.vue'), 
    meta: {
        protegida: true
    }
  },
  {
    path: '/404',
    name: '404',
    component: () => import('../views/404.vue')
  },
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next)=>{
  const rutaEsProtegida = to.matched.some(item=>item.meta.protegida)

  if(rutaEsProtegida && !localStorage.getItem('token')){
    
    next('/')

  }else{
    next()
  }
})

export default router
