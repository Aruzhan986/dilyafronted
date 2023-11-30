<template>
  <div class="custom-container">
    <h1>Select a Page:</h1>
    <div class="custom-button-group">
      <div class="custom-button-row">
        <button @click="goToPage('/category')" class="custom-button-style">Category</button>
        <button @click="goToPage('/adminproduct')" class="custom-button-style">Product</button>
      </div>
      <div class="custom-button-row">
        <button @click="goToPage('/adminclient')" class="custom-button-style">Client</button>
        <button @click="goToPage('/adminorder')" class="custom-button-style">Order</button>
      </div>
    </div>
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
.custom-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  background: linear-gradient(to bottom, #f8f9fa, #ced4da);
  border-radius: 20px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.custom-button-group {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.custom-button-row {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.custom-button-style {
  padding: 14px 28px;
  background-color: #3498db;
  color: #ffffff;
  border: 2px solid #2980b9;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s ease-out;
  font-size: 16px;
}

.custom-button-style:hover {
  background-color: #2980b9;
  transform: translateY(-3px);
}

h1 {
  color: #333333;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  margin-bottom: 30px;
  font-size: 24px;
  text-transform: uppercase;
}
</style>
