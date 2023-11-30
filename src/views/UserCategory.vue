<template>
  <div class="category-container">
    <h1>Категории</h1>
    <ul class="category-list">
      <li v-for="category in categories" :key="category.id" class="category-item">{{ category.name }}</li>
    </ul>
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
.category-container {
  max-width: 600px;
  margin: auto;
  padding: 20px;
  background: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.category-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.category-item {
  background: #fff;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  cursor: pointer;
  transition: background-color 0.3s, box-shadow 0.3s;
}

.category-item:hover {
  background-color: #e9ecef;
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
}
</style>