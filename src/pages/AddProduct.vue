<template>
  <div class="row mt-5 top-style">
    <div class="col-lg-8 q-pa-md">
      <q-table
        class="custom-table"
        title="Productos en la nevera"
        :rows="products"
        title-class="custom-title"
        :pagination="{ rowsPerPage: 15, rowsPerPageOptions: [15, 30, 50] }"
      />
    </div>
    <div class="col-md-3 q-pt-md custom-input">
      <q-card class="my-card q-pa-lg radius">
        <q-input v-model="units" label="Unidades" class="q-pa-lg"/>
        <q-toggle v-model="recurrent" label="Recurrente" class="q-pa-lg"/>
      </q-card>
      <div>
        <q-btn @click="addProduct()" class="q-mt-lg custom-button-1">Añadir producto</q-btn>
      </div>
    </div>
  </div>
</template>

<script>

import {defineComponent, ref} from 'vue'
import {api} from "boot/axios";
import {Notify} from 'quasar'

export default defineComponent({
  name: "AddProduct",
  setup() {
    let products = ref([])
    let recurrent = ref(true)
    let units = ref(1)
    const recurrentOptions = ['true', 'false']

    function getProducts() {
      console.log("calling api")
      api.get('/fridge').then((response) => {
        console.log("calling api")
        products.value = response.data
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

    getProducts()

    function addProduct() {
      console.log("Calling add product")
      console.log("Recurrente es: " + recurrent.value)
      console.log("Unidades es: " + units.value)
      const newProduct = {
        "recurrent": recurrent.value,
        "units": units.value
      }
      api.post("/add_product", newProduct).then(
        (response) => {
          console.log(response.data)
          Notify.create(
          {
            color: 'blue',
            position: 'top',
            message: response.data,
          },
          getProducts()
        )
        }
      ).catch(() => {
        Notify.create(
          {
            color: 'negative',
            position: 'top',
            message: 'Problem adding product',
            icon: 'report_problem'
          }
        )

      })
    }

    return {
      products,
      units,
      recurrent,
      recurrentOptions,

      addProduct
    }
  }
})

</script>

<style>

.top-style {
  margin: 100px 0px 20px 50px;
}

.custom-table {
  min-height: 600px;
  border-radius: 10px;
}

.radius {
  border-radius: 10px;
}

.custom-input {
   margin: 0px 20px 20px 50px;
}

.custom-button-1 {
  background-color: #0E658A;
  color: white;
  margin: 20px 0px 20px 0px;
  padding: 20px 0px 20px 0px;
  width: 100%;
  border-radius: 10px;
}

.custom-title {
  color: #0e658a;
  font-weight: bold;
}


</style>
