<template>
  <div class="row mt-5 top-style">
    <div class="col-lg-8 q-pa-md">
      <q-table
        class="custom-table"
        title="Productos en la Lista de la Compra"
        :rows="shopping_list"
        title-class="custom-title"
        :pagination="{ rowsPerPage: 15, rowsPerPageOptions: [15, 30, 50] }"
      />
    </div>
    <div class="col-md-3 q-pt-md custom-input">
      <div>
        <q-btn @click="spendProduct()" class="q-mt-lg custom-button-2">Gastar producto</q-btn>
      </div>
      <q-card class="my-card q-pa-lg radius custom-card">
        <div class="items-center">
          <div class="row items-center">
            <h6 class="custom-title">EAN:</h6>
            <q-card-section class="col text-right data_style">
              {{ ean }}
            </q-card-section>
          </div>
          <div class="row items-center">
            <h6 class="custom-title">Nombre:</h6>
            <q-card-section class="col text-right data_style">
              {{ nombre }}
            </q-card-section>
          </div>
          <div class="row items-center">
            <h6 class="custom-title">Marca:</h6>
            <q-card-section class="col text-right data_style">
              {{ brand }}
            </q-card-section>
          </div>
          <div class="row items-center">
            <h6 class="custom-title">Nutriscore:</h6>
            <q-card-section class="col text-right data_style">
              {{ nutriscore }}
            </q-card-section>
          </div>
          <div class="row items-center">
            <h6 class="custom-title">Recurrente:</h6>
            <q-card-section class="col text-right data_style">
              {{ recurrente }}
            </q-card-section>
          </div>
          <div class="row items-center">
            <h6 class="custom-title">Unidades Paquete:</h6>
            <q-card-section class="col text-right data_style">
              {{ unit_package }}
            </q-card-section>
          </div>
        </div>
      </q-card>
      <div class="row">
        <q-btn @click="updateprices()" class="ql-align-justify custom-button-3 ">Actualizar Precios</q-btn>
      </div>
    </div>
  </div>
</template>

<script>
import {defineComponent, ref} from 'vue'
import {api} from "boot/axios";
import {Notify} from 'quasar'

export default defineComponent({
  name: "SpendProduct",
  setup() {
    let shopping_list = ref([])
    let ean = ref("-")
    let nombre = ref("-")
    let brand = ref("-")
    let nutriscore = ref("-")
    let recurrente = ref("-")
    let unit_package = ref("-")
    let informacion = ref([])
    let updatePrices = ref([])

    function getShoppingList() {
      console.log("calling api")
      api.get('/shopping_list').then((response) => {
        console.log("calling api")
        shopping_list.value = response.data;
        console.log(shopping_list.value)

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

    getShoppingList()


    function spendProduct() {
      console.log("calling spend product")
      api.get('/spend_product').then((response) => {
        console.log("calling api spend")
        console.log(response.status)

        const product = response.data
        ean.value = product["ean"]
        nombre.value = product["nombre"]
        brand.value = product["marca"]
        nutriscore.value = product["nutriscore"]
        recurrente.value = product["recurrente"]
        unit_package.value = product["unidades_paquete"]

        informacion.value = product["info"]

        console.log(informacion.value)

        getShoppingList()

        Notify.create(
          {
            color: 'blue',
            position: 'top',
            message: informacion.value,
          });
      })
        .catch(() => {
          Notify.create(
            {
              color: 'negative',
              position: 'top',
              message: 'API call failed',
              icon: 'report_problem'
            });
        });
    }

    function updateprices() {
      console.log("calling api")
      api.get('/update_all_prices').then((response) => {
        console.log("calling api")
        updatePrices.value = response.data;
        console.log(updatePrices.value)

        Notify.create(
          {
            color: 'blue',
            position: 'top',
            message: updatePrices.value,
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


    return {
      shopping_list,
      ean,
      nombre,
      brand,
      nutriscore,
      recurrente,
      unit_package,


      spendProduct,
      updateprices,

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

.custom-card {
  min-height: 435px;
  border-radius: 10px;
}

.radius {
  border-radius: 10px;
}

.custom-input {
  margin: 0px 20px 20px 50px;
}

.custom-button-2 {
  background-color: #D65C5A;
  color: white;
  margin: 0px 0px 20px 0px;
  padding: 20px 0px 20px 0px;
  width: 100%;
  border-radius: 10px;
}

.custom-button-3 {
  background-color: #0E658A;
  color: white;
  margin: 20px 0px 0px 0px;
  padding: 20px 0px 20px 0px;
  width: 100%;
  border-radius: 10px;
}

.custom-title {
  color: #0e658a;
  font-weight: bold;
  margin: 0px;
  padding: 0px;
}

.data_style {
  font-size: 18px;
  color: #0E658A;
}


</style>
