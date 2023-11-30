<template>
  <div class="navigation-container">
    <h1 class="navigation-title">Admin Dashboard</h1>
    <div class="circle-menu">
      <button @click="goToPage('/category')" class="menu-item">Category</button>
      <button @click="goToPage('/adminproduct')" class="menu-item">Product</button>
      <button @click="goToPage('/adminclient')" class="menu-item">Client</button>
      <button @click="goToPage('/adminorder')" class="menu-item">Order</button>
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
.navigation-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
  background-color: #eceff1;
  border-radius: 20px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.navigation-title {
  color: #2e3c48;
  font-size: 24px;
  margin-bottom: 40px;
  text-align: center;
}

.circle-menu {
  position: relative;
  width: 250px;
  height: 250px;
  border-radius: 50%;
  background-color: #455a64;
  display: flex;
  align-items: center;
  justify-content: center;
}

.menu-item {
  position: absolute;
  padding: 10px 20px;
  background-color: #90a4ae;
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  transition: transform 0.2s, background-color 0.3s;
}

.menu-item:hover {
  transform: translateY(-5px);
  background-color: #78909c;
}

.menu-item:nth-child(1) { top: 10px; left: 50%; transform: translateX(-50%); }
.menu-item:nth-child(2) { right: 10px; top: 50%; transform: translateY(-50%); }
.menu-item:nth-child(3) { bottom: 10px; left: 50%; transform: translateX(-50%); }
.menu-item:nth-child(4) { left: 10px; top: 50%; transform: translateY(-50%); }
</style>


