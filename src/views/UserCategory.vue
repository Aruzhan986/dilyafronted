<template>
  <div class="user-page-container">
    <h1 class="user-page-title">Категории</h1>
    <div class="category-cards-container">
      <div v-for="category in categories" :key="category.id" class="category-card">
        <div class="card-content">
          <span class="category-title">{{ category.name }}</span>
        </div>
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
  .user-page-container {
    max-width: 900px;
    margin: auto;
    padding: 40px;
    background: #fff;
    border-radius: 20px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
  
  .user-page-title {
    text-align: center;
    color: #2e3c48;
    font-size: 28px;
    margin-bottom: 30px;
  }
  
  .category-cards-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 20px;
  }
  
  .category-card {
    background-color: #f0f4f7;
    border-radius: 10px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    text-align: center;
    padding: 20px;
    transition: background-color 0.3s, box-shadow 0.3s;
  }
  
  .category-card:hover {
    background-color: #e3f2fd;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }
  
  .card-content {
    padding: 10px;
  }
  
  .category-title {
    color: #333;
    font-size: 18px;
    font-weight: bold;
  }
  </style>
  
