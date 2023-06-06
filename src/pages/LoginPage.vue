<template>
  <q-layout>
    <q-page-container>
      <q-page class="flex bg-image flex-center">
        <q-card v-bind:style="$q.screen.lt.sm?{'width': '80%'}:{'width':'30%'}">
          <q-card-section>
            <q-avatar size="103px" class="absolute-center shadow-10">
              <img src="../img/Icono.jpg">
            </q-avatar>
          </q-card-section>
          <q-card-section>
            <div class="text-center q-pt-lg">
              <div class="col text-h6 ellipsis">
                Log in
              </div>
            </div>
          </q-card-section>
          <q-card-section>
            <q-form
              class="q-gutter-md"
            >
              <q-input
                filled
                v-model="username"
                label="Username"
                lazy-rules
              />

              <q-input
                type="password"
                filled
                v-model="password"
                label="Password"
                lazy-rules

              />

              <q-btn push label="Login" to="/Dashboard" type="button" color="primary" class="q-mt-lg"/>
            </q-form>
          </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import {defineComponent, ref} from 'vue'
import {api} from "boot/axios";
import {Notify} from 'quasar'

export default defineComponent({
  setup() {
    return {
      username: ref('Luis Galdeano'),
      password: ref('123456789')
    }
  },
})
</script>

<style>

.bg-image {
  background-image: linear-gradient(135deg, #0e658a 0%, #56B0D6 100%);
}

</style>
