<template>
  <div class="category-overview-page">
    <h1 class="overview-title">Просмотр Категорий</h1>
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
  max-width: 900px;
  margin: auto;
  padding: 40px;
  background: #f7f7f7;
  border-radius: 25px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.15);
  text-align: center;
}

.overview-title {
  color: #5c6bc0;
  font-size: 28px;
  margin-bottom: 35px;
}

.category-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 25px;
}

.category-tile {
  background: #fff;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.category-tile:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.category-heading {
  font-size: 18px;
  color: #424242;
  font-weight: 600;
}
</style>

  
