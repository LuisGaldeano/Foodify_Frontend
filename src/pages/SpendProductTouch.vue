<template>
  <div class="q-pa-md">
    <div class="flex-container">
      <div class="personal_card">
        <q-row>
          <q-col
            v-for="product in products"
            :key="product.id"
            cols="3"
          >
            <q-btn
              class="custom-button"
              @click="handleButtonClick(product)"
            >
              {{ product.name }}
            </q-btn>
          </q-col>
        </q-row>
      </div>

      <div class="secondary_card">
        <div class="col-md-3 q-pt-md custom-input">
          <q-card class="my-card q-pa-lg radius">
            <q-input v-model="names" label="Producto" class="q-pa-md up_margin"/>
            <q-input v-model="ean" label="Producto" class="q-pa-md up_margin"/>
            <q-input v-model="units" label="Unidades" class="q-pa-md up_margin"/>
          </q-card>

        </div>
        <q-card>
          <div class="q-pa-md">
            <div class="phone-keypad">
              <div class="phone-row">
                <q-btn class="boton_redondo" @click="updateInput(1)">1</q-btn>
                <q-btn class="boton_redondo" @click="updateInput(2)">2</q-btn>
                <q-btn class="boton_redondo" @click="updateInput(3)">3</q-btn>
                <q-btn class="boton_redondo" @click="updateInput(4)">4</q-btn>
                <q-btn class="boton_redondo" @click="updateInput(5)">5</q-btn>
              </div>
              <div class="phone-row">
                <q-btn class="boton_redondo" @click="updateInput(6)">6</q-btn>
                <q-btn class="boton_redondo" @click="updateInput(7)">7</q-btn>
                <q-btn class="boton_redondo" @click="updateInput(8)">8</q-btn>
                <q-btn class="boton_redondo" @click="updateInput(9)">9</q-btn>
                <q-btn class="boton_redondo" @click="updateInput(0)">0</q-btn>
              </div>

            </div>
          </div>
        </q-card>
        <div class="row items-center no-wrap">
          <q-btn @click="spend_n_products()" class="q-mt-lg custom-button-1">Gastar producto</q-btn>
        </div>
      </div>


    </div>
  </div>


</template>

<script>
import {ref} from "vue";
import {api} from "boot/axios";
import {Notify} from "quasar";

export default {
  name: "ShoppingList",

  setup: function () {
    let products = ref([])
    let ean = ref("")
    let units = ref([])
    let names = ref("")
    let inf = ref([])


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

    function spend_n_products() {
      console.log("calling api")
      const Product = {
        "ean": ean.value,
        "units": units.value
      }
      api.post('/spend_n_products', Product).then((response) => {
        console.log("calling api")
        inf.value = response.data
        console.log(inf.value)
        Notify.create(
          {
            color: 'blue',
            position: 'top',
            message: inf.value,
          })

        getProducts()

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

    function updateInput(number) {
      units.value = number;
    }

    function handleButtonClick(product) {
      ean.value = product.ean;
      names.value = product.name
    }

    function convertToInteger(ean) {
      return parseInt(ean, 10);
    }


    getProducts()

    return {
      products,
      ean,
      units,
      names,

      updateInput,
      getProducts,
      handleButtonClick,
      spend_n_products,
    }
  }
}

</script>

<style>
.custom-button {
  margin: 20px;
  padding: 20px;
  width: 150px; /* Establece el ancho deseado para los botones */
  height: 150px;
  background: #0E658A;
  color: white;
  border-radius: 15px;
}

.personal_card {
  width: 60%;
  margin: 50px;
  flex: 6;
}

.secondary_card {
  width: 40%;
  margin: 50px 100px 0px 0px;
  flex: 3;
  border-radius: 20px;
}

.color_back {
  background: red;
}

.up_margin {

}

.flex-container {
  display: flex;
}

.phone-keypad {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.phone-row {
  display: flex;
  margin-bottom: 5px;
}

q-btn {
  width: 100%;
  height: 60px;
}

.boton_redondo {
  margin: 10px;
  padding: 10px;
  width: 80px;
  height: 80px;
  background: #0E658A;
  color: white;
  border-radius: 10%;
}

.custom-button-1 {
  background-color: #D65C5A;
  color: white;
  margin: 20px 0px 20px 0px;
  padding: 20px 20px 20px 0px;
  width: 100%;
  border-radius: 10px;
}

.custom-button-2 {
  background-color: #0E658A;
  color: white;
  margin: 20px 0px 20px 20px;
  padding: 20px 0px 20px 0px;
  width: 100%;
  border-radius: 10px;
}

.custom-input {
  margin: 0px 0px 20px 0px;
}
</style>
