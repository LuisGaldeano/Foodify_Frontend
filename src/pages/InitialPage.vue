<template>
  <div class="q-pa-md text-container">
    <router-link to="/Login">
      <img src="../img/Foodify_white.png" class="size_big" alt="Foodify Logo">
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'MyComponent',
};
</script>

<style scoped>

.text-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-image: linear-gradient(135deg, #0e658a 0%, #56B0D6 100%);
  color: white;
  font-family: sans-serif;
}

.sizes_big {
  width: 15%;
}
</style>
