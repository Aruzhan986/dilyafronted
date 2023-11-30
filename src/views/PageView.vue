<template>
  <div class="admin-dashboard">
    <h1 class="dashboard-title">Admin Dashboard</h1>
    <div class="dashboard-menu">
      <div @click="goToPage('/category')" class="menu-card">Category</div>
      <div @click="goToPage('/adminproduct')" class="menu-card">Product</div>
      <div @click="goToPage('/adminclient')" class="menu-card">Client</div>
      <div @click="goToPage('/adminorder')" class="menu-card">Order</div>
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
.admin-dashboard {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
  background-color: #f5f5f5;
  border-radius: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.dashboard-title {
  color: #333;
  font-size: 26px;
  margin-bottom: 30px;
}

.dashboard-menu {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  width: 100%;
}

.menu-card {
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  cursor: pointer;
  transition: background-color 0.3s, box-shadow 0.3s;
}

.menu-card:hover {
  background-color: #e9ecef;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
}
</style>



