<template>
  <div class="container">
    <h1>Выберите страницу:</h1>
    <button @click="goToPage('/category')" class="button-style">Category</button>
    <button @click="goToPage('/adminproduct')" class="button-style">Product</button>
    <button @click="goToPage('/adminclient')" class="button-style">Client</button>
    <button @click="goToPage('/adminorder')" class="button-style">Order</button>
  </div>
</template>

<script>
export default {
  methods: {
    goToPage(path) {
      this.$router.push(path);
    }
  }
};
</script>

<style>
.container {
  text-align: center;
  padding: 20px;
}

.button-style {
  margin: 10px;
  padding: 10px 20px;
  background-color: #4CAF50; 
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s;
}

.button-style:hover {
  background-color: #45a049; 
}

h1 {
  color: #333;
  font-family: Arial, sans-serif;
}
</style>
