<template>
  <div class="category-overview-page">
    <h1 class="overview-title">Просмотр</h1>
    <div class="category-grid">
      <div v-for="category in categories" :key="category.id" class="category-tile">
        <div class="category-content">
          <h3 class="category-heading">{{ category.name }}</h3>
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
  .category-overview-page {
    max-width: 950px;
    margin: 50px auto;
    padding: 50px;
    background: linear-gradient(to right, #8e9eab, #eef2f3); 
    border-radius: 30px; 
    box-shadow: 0 12px 25px rgba(0, 0, 0, 0.2); 
    text-align: center;
  }
  
  .overview-title {
    color: #3f51b5; 
    font-size: 32px; 
    margin-bottom: 40px; 
  }
  
  .category-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); 
    gap: 30px;
  }
  
  .category-tile {
    background: #fff;
    padding: 25px; 
    border-radius: 20px; 
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15); 
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  
  .category-tile:hover {
    transform: scale(1.05); 
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.25); 
  }
  
  .category-heading {
    font-size: 20px; 
    color: #1a237e; 
    font-weight: 700;
  }
  </style>
  

  
