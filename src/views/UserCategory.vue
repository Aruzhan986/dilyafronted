<template>
  <div class="user-categories-page">
    <h1 class="page-title">Категории</h1>
    <div class="categories-container">
      <div v-for="category in categories" :key="category.id" class="category-box">
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
.user-categories-page {
  max-width: 800px;
  margin: 40px auto;
  padding: 30px;
  background-color: #ffffff;
  border-radius: 15px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.page-title {
  color: #37474f;
  font-size: 24px;
  text-align: center;
  margin-bottom: 25px;
}

.categories-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 20px;
}

.category-box {
  background-color: #e0e0e0;
  border-radius: 10px;
  padding: 20px;
  text-align: center;
  transition: transform 0.3s, background-color 0.3s;
}

.category-box:hover {
  transform: scale(1.05);
  background-color: #cfd8dc;
}

.category-name {
  font-size: 16px;
  color: #263238;
  font-weight: bold;
}
</style>

  
