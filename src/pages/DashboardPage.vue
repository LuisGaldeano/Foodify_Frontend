<template>
  <div class="q-pa-md buttons" align="right">

    <q-btn @click="buyProducts()" class="q-mt-lg custom-button-3 float-left">Comprar
      <q-icon right name="attach_money"/>
    </q-btn>

    <router-link to="/AddProduct">
      <q-btn push class="q-pa-lg custom-button-1">
        <div class="row items-center no-wrap">
          <div class="text-center">
            Añadir Producto
          </div>
          <q-icon right name="ion-md-cart"/>
        </div>
      </q-btn>
    </router-link>
    <router-link to="/SpendProduct">
      <q-btn push class="q-pa-lg custom-button-2">
        <div class="row items-center no-wrap">
          <div class="text-center">
            Gastar Producto
          </div>
          <q-icon right name="ion-md-trash"/>
        </div>
      </q-btn>
    </router-link>
  </div>
  <div class="row row_style">
    <div class="col table_style">
      <q-table
        class="custom-table"
        title="Productos en la nevera"
        :rows="fridge"
        :pagination="{ rowsPerPage: 15, rowsPerPageOptions: [15, 30, 50] }"
        title-class="custom-title"
      />
    </div>
    <div class="col table_style">
      <q-table
        class="custom-table"
        title="Productos en la lista de la compra"
        :rows="shopping_list"
        :pagination="{ rowsPerPage: 15, rowsPerPageOptions: [15, 30, 50] }"
        title-class="custom-title"
      />
    </div>
  </div>
</template>

<script>

import {defineComponent, ref} from 'vue'
import {api} from "boot/axios";
import {Notify} from 'quasar'

export default defineComponent({
  name: "DashboardPage",
  setup() {
    let fridge = ref([])
    let shopping_list = ref([])
    let info = ref ([])

    function getFridge() {
      console.log("calling api")
      api.get('/fridge').then((response) => {
        console.log("calling api")
        fridge.value = response.data
        console.log(response.data)

      }).catch(() => {
        Notify.create(
          {
            color: 'negative',
            position: 'top',
            message: 'API call failed',
            icon: 'report_problem'
          }
        )

      })
    }

    function buyProducts() {
      console.log("calling api")
      api.get('/buy_shopping_list').then((response) => {
        console.log("calling api")
        const buyResponse = response.data
        console.log(buyResponse)
        console.log(buyResponse["response"])
        info.value = buyResponse["response"];
        console.log(info.value)

        getFridge()
        getShoppingList()

        Notify.create(
          {
            color: 'blue',
            position: 'top',
            message: info.value,
          })

      }).catch(() => {
        Notify.create(
          {
            color: 'negative',
            position: 'top',
            message: 'API call failed',
            icon: 'report_problem'
          }
        )
      })
    }

    function getShoppingList() {
      console.log("calling api")
      api.get('/shopping_list').then((response) => {
        console.log("calling api")
        shopping_list.value = response.data
        console.log(response.data)

      }).catch(() => {
        Notify.create(
          {
            color: 'negative',
            position: 'top',
            message: 'API call failed',
            icon: 'report_problem'
          }
        )
      })


    }

    getFridge()
    getShoppingList()


    return {
      fridge,
      shopping_list,

      buyProducts

    }
  }
})


// Falta por que cuadres los paréntesis

</script>

<style>
.buttons {
  margin: 50px 50px 20px 50px;
}

.custom-button-1 {
  background-color: #0E658A;
  color: white;
  margin: 20px;
}

.custom-button-2 {
  background-color: #D65C5A;
  color: white;
  margin: 20px;
}

.row_style {
  margin: 10px 50px 10px 50px;
}

.table_style {
  margin: 0px 20px 0px 20px;

}

.custom-table {
  min-height: 350px;
}

.custom-title {
  color: #0e658a;
  font-weight: bold;
}

.custom-button-3 {
  background-color: #21BA45;
  color: white;
  margin: 20px;
  padding: 20px;

}

</style>
