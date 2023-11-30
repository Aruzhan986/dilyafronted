<template>
  <div class="admin-panel">
    <h1 class="panel-title">Административная Панель</h1>
    <div class="panel-options">
      <div @click="goToPage('/category')" class="option-item">Категории</div>
      <div @click="goToPage('/adminproduct')" class="option-item">Продукты</div>
      <div @click="goToPage('/adminclient')" class="option-item">Клиенты</div>
      <div @click="goToPage('/adminorder')" class="option-item">Заказы</div>
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
  max-width: 700px;
  margin: auto;
  padding: 40px;
  background-color: #f7f7f7;
  border-radius: 20px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.panel-title {
  color: #333;
  font-size: 26px;
  margin-bottom: 30px;
}

.panel-options {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.option-item {
  padding: 20px;
  background-color: #e3f2fd;
  border-radius: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  cursor: pointer;
  transition: transform 0.3s ease-in-out, background-color 0.3s ease;
  font-size: 18px;
}

.option-item:hover {
  transform: translateY(-5px);
  background-color: #bbdefb;
}
</style>




