<template>
  <div class="products-page">
    <h1>Продукты</h1>
    <div class="products-list">
      <div v-for="item in items" :key="item.item_id" class="product-item">
        <div class="product-details">
          <h3 class="product-name">{{ item.item_name }}</h3>
          <p class="product-category">{{ getCategoryName(item.product_category_id) }}</p>
          <p class="product-price">{{ item.unit_price }} тг.</p>
          <input type="number" v-model.number="item.quantity" min="1">
          <button>Добавить в корзину</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [],
      categories: []
    };
  },
  created() {
    this.fetchItems();
    this.fetchCategories();
  },
  methods: {
    async fetchItems() {
      try {
        const response = await this.$http.get('/item');
        this.items = response.data.map(item => ({
          ...item,
          quantity: 1
        }));
      } catch (error) {
        console.error("Ошибка при получении товаров:", error);
      }
    },
    async fetchCategories() {
      try {
        const response = await this.$http.get('/product_categories');
        this.categories = response.data;
      } catch (error) {
        console.error("Ошибка при получении категорий:", error);
      }
    },
    getCategoryName(categoryId) {
      const category = this.categories.find(cat => cat.category_id === categoryId);
      return category ? category.name : 'Неизвестная категория';
    },
    
  }
};
</script>

<style scoped>
.products-page {
  background-color: white;
  padding: 20px;
  font-family: 'Arial', sans-serif;
}

h1 {
  color: #333;
  text-align: center;
  margin-bottom: 30px;
}

.products-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.product-item {
  width: 200px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  padding: 15px;
  background-color: #f9f9f9;
  border-radius: 10px;
  text-align: center;
}

.item-image {
  max-width: 100%;
  height: auto;
  border-radius: 5px;
}

.product-details {
  margin-top: 10px;
}

.product-name {
  color: #444;
  font-size: 18px;
  margin-bottom: 5px;
}

.product-category {
  color: #666;
  font-size: 14px;
}

.product-price {
  font-size: 16px;
  font-weight: bold;
  color: #1a1a1a;
  margin: 10px 0;
}

input[type='number'] {
  width: 50px;
  padding: 5px;
  margin-right: 5px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

button {
  background-color: #4CAF50;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #45a049;
}

</style>
