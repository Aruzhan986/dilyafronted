<template>
  <div class="admin-dashboard-container">
    <h1 class="dashboard-heading">Панель Управления</h1>
    <div class="dashboard-menu">
      <div @click="goToPage('/category')" class="menu-item">Категории</div>
      <div @click="goToPage('/adminproduct')" class="menu-item">Продукция</div>
      <div @click="goToPage('/adminclient')" class="menu-item">Клиенты</div>
      <div @click="goToPage('/adminorder')" class="menu-item">Заказы</div>
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
.admin-dashboard-container {
  max-width: 800px;
  margin: 50px auto;
  padding: 50px;
  background: linear-gradient(135deg, #6e8efb, #a777e3);
  border-radius: 25px;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
  color: #fff;
}

.dashboard-heading {
  text-align: center;
  font-size: 30px;
  margin-bottom: 50px;
}

.dashboard-menu {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.menu-item {
  padding: 25px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
}

.menu-item:hover {
  background-color: rgba(255, 255, 255, 0.2);
  transform: scale(1.05);
}
</style>



