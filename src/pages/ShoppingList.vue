<template>
  <q-page class="q-pa-sm">
    <q-card>
      <q-card-section class="row justify-between background">
        <div class="text-h6 text-weight-bolder text-style">Lista de la compra</div>
        <div class="q-ml-lg q-mr-xs">
          <q-btn style="color: #ffffff; background: #21BA45;" label="Comprar" @click="buyProducts" class="q-mr-lg"/>
          <q-btn outline style="color: #0E658A;" label="Descargar PDF" @click="createPDF"/>
        </div>
      </q-card-section>
      <q-separator></q-separator>

      <div class="q-pa-md">
        <q-markup-table>
          <thead>
          <tr>
            <th class="text-left">Nº</th>
            <th class="text-right">Nombre</th>
            <th class="text-right">Supermercado</th>
            <th class="text-right">Precio</th>
            <th class="text-right">URL</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="producto in productos" :key="producto.id">
            <td class="text-left">{{ producto["id"] }}</td>
            <td class="text-right">{{ producto["Nombre"] }}</td>
            <td class="text-right">{{ producto["Supermercado"] }}</td>
            <td class="text-right">{{ producto["Precio"] }}</td>
            <td class="text-right">
              <a :href="producto.URL" target="_blank">{{ producto.URL }}</a>
            </td>
          </tr>
          </tbody>
        </q-markup-table>
      </div>


    </q-card>
  </q-page>
</template>


<script>
import {ref} from "vue";
import {api} from "boot/axios";
import {Notify} from "quasar";

export default {
  name: "ShoppingList",

  setup() {
    let productos = ref([])
    let generate = ref([])
    let info = ref([])


    function shopping_links() {
      console.log("calling api")
      api.get('/create_buy_links').then((response) => {
        console.log("calling api")
        productos.value = response.data
        console.log(productos.value)

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

    function createPDF() {
      console.log("calling api")
      api.get('/create_pdf').then((response) => {
        console.log("calling api")
        generate.value = response.data
        console.log(generate.value)

        Notify.create(
          {
            color: 'blue',
            position: 'top',
            message: "Se ha generado el PDF",
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

    function buyProducts() {
      console.log("calling api")
      api.get('/buy_shopping_list').then((response) => {
        console.log("calling api")
        const buyResponse = response.data
        console.log(buyResponse)
        console.log(buyResponse["response"])
        info.value = buyResponse["response"];
        console.log(info.value)

        Notify.create(
          {
            color: 'blue',
            position: 'top',
            message: info.value,
          })

        shopping_links()

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

    shopping_links()

    return {
      productos,
      createPDF,
      buyProducts

    }

  }
}
</script>

<style>

.text-style {
  color: #0E658A;
}

</style>
