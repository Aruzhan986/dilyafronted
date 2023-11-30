<template>
  <div class="category-container">
    <h1>Explore Categories</h1>
    <div class="category-grid">
      <div v-for="category in categories" :key="category.id" class="category-card">
        <div class="category-name">{{ category.name }}</div>
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
.category-container {
  max-width: 800px;
  margin: 40px auto;
  padding: 20px;
  background: #f8f9fa; 
  border-radius: 15px;
  text-align: center;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
}

h1 {
  color: #343a40; 
  margin-bottom: 30px;
}

.category-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); 
  gap: 20px;
  padding: 0;
  margin: 0;
}

.category-card {
  background: #ffffff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  cursor: pointer;
}

.category-name {
  font-size: 16px;
  font-weight: bold;
  color: #495057;
}

.category-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

</style>