<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="background-white">
        <q-btn class="personal-text"
               flat
               dense
               round
               icon="menu"
               aria-label="Menu"
               @click="toggleLeftDrawer"
        />

        <q-toolbar-title class="personal-text">


        </q-toolbar-title>

        <div class="icon-name">
          Luis Galdeano
        </div>
        <q-avatar>
          <img src="../img/Icono.jpg" alt="Imagen del usuario">
        </q-avatar>
        <q-btn outline style="color: #0E658A;" label="Salir" class="q-ml-lg" to="/Login"/>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label
          header
        >
          <q-img src="../img/Foodify_White.png" alt="Foodify Image"/>
        </q-item-label>

        <EssentialLink class="white-text"
                       v-for="link in essentialLinks"
                       :key="link.title"
                       v-bind="link"
        />
      </q-list>
    </q-drawer>
    <q-page-container>
      <router-view/>
    </q-page-container>
  </q-layout>

</template>

<script>
import {defineComponent, ref} from 'vue'
import EssentialLink from 'components/EssentialLink.vue'

const linksList = [
  {
    title: 'Dashboard',
    icon: 'ion-md-speedometer',
    link: 'http://localhost:9000/Dashboard'
  },
  {
    title: 'Añadir Producto',
    icon: 'ion-md-cart',
    link: 'http://localhost:9000/AddProduct'
  },
  {
    title: 'Gastar Producto',
    icon: 'ion-md-trash',
    link: 'http://localhost:9000/SpendProduct'
  },
  {
    title: 'Lista de la compra',
    icon: 'ion-md-briefcase',
    link: 'http://localhost:9000/ShoppingList'
  },

]

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink
  },

  setup() {
    const leftDrawerOpen = ref(false)

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
})
</script>

<style>

.q-drawer {
  /* Cambia el color de fondo del sidebar */
  background-color: #0E658A;
}

.white-text {
  color: white;
}

.personal-text {
  color: #0E658A;
}

.background-white {
  background: #ffffff;
}

.icon-name {
  color: #8a8c9b;
  font-size: small;
  padding-right: 10px;
}

</style>
