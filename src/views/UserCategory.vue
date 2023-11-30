<template>
  <div class="category-overview-page">
    <h1 class="overview-title">Категории</h1>
    <div class="category-list">
      <div v-for="category in categories" :key="category.id" class="category-item">
        <div class="category-details">
          <h3 class="category-name">{{ category.name }}</h3>
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
  margin: 50px auto;
  padding: 40px;
  background-color: #f3f3f3;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.overview-title {
  color: #2c3e50;
  font-size: 36px;
  margin-bottom: 30px;
  text-transform: uppercase;
}

.category-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  justify-content: center;
}

.category-item {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  text-align: center;
}

.category-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.category-name {
  font-size: 18px;
  color: #333;
  font-weight: bold;
  margin-top: 10px;
}
</style>
