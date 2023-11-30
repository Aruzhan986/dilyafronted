<template>
  <div class="custom-admin-panel">
    <h1 class="custom-panel-title">Административная Панель</h1>
    <div class="custom-panel-options">
      <div @click="goToPage('/category')" class="custom-option-item">Категории</div>
      <div @click="goToPage('/adminproduct')" class="custom-option-item">Продукты</div>
      <div @click="goToPage('/adminclient')" class="custom-option-item">Клиенты</div>
      <div @click="goToPage('/adminorder')" class="custom-option-item">Заказы</div>
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
.custom-admin-panel {
  max-width: 800px;
  margin: auto;
  padding: 60px 40px;
  background-color: #1f1f1f;
  border-radius: 30px;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.3);
  text-align: center;
  color: #fff;
}

.custom-panel-title {
  color: #ccc;
  font-size: 32px;
  margin-bottom: 40px;
}

.custom-panel-options {
  display: flex;
  flex-direction: column;
  gap: 30px;
  align-items: center;
}

.custom-option-item {
  padding: 25px 40px;
  background-color: #333;
  border-radius: 20px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  transition: transform 0.3s ease-in-out, background-color 0.3s ease;
  font-size: 24px;
  color: #fff;
}

.custom-option-item:hover {
  transform: translateY(-5px);
  background-color: #444;
}
</style>
