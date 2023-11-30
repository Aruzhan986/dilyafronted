<template>
  <div class="admin-panel">
    <h1 class="panel-title">Админ Панель</h1>
    <div class="navigation-cards">
      <div @click="goToPage('/category')" class="navigation-card">Категории</div>
      <div @click="goToPage('/adminproduct')" class="navigation-card">Продукты</div>
      <div @click="goToPage('/adminclient')" class="navigation-card">Клиенты</div>
      <div @click="goToPage('/adminorder')" class="navigation-card">Заказы</div>
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
.admin-panel {
  max-width: 600px;
  margin: 40px auto;
  padding: 40px;
  background-color: #ffffff;
  border-radius: 20px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.panel-title {
  color: #2e3c48;
  font-size: 28px;
  margin-bottom: 40px;
}

.navigation-cards {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.navigation-card {
  padding: 20px;
  background-color: #e0f7fa;
  border-radius: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  cursor: pointer;
  transition: all 0.3s ease;
}

.navigation-card:hover {
  background-color: #b2ebf2;
  transform: translateY(-5px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>


