<template>
  <div class="categories-display-container">
    <h1 class="categories-title">Страница пользователя</h1>
    <div class="categories-grid">
      <div v-for="category in categories" :key="category.id" class="category-card">
        <span class="category-name">{{ category.name }}</span>
      </div>
    </div>
  </div>
</template>

  
  <script>
  export default {
    data() {
      return {
        categories: []
      };
    },
    created() {
      this.fetchCategories();
    },
    methods: {
      async fetchCategories() {
        try {
          const response = await this.$http.get('/category/categories');
          this.categories = response.data;
        } catch (error) {
          console.error("Ошибка при получении категорий:", error);
        }
      }
    }
  };
  </script>
  
  <style scoped>
.categories-display-container {
  max-width: 800px;
  margin: auto;
  padding: 30px;
  background: #e3f2fd;
  border-radius: 15px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
}

.categories-title {
  text-align: center;
  color: #1e88e5;
  margin-bottom: 30px;
  font-size: 24px;
}

.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 20px;
}

.category-card {
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
}

.category-card:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.category-name {
  color: #333;
  font-size: 18px;
  font-weight: bold;
}
</style>
