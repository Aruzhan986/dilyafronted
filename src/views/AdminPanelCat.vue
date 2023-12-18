<template>
    <div class="category-management-interface">
      <h1>Управление категориями</h1>
      <div class="category-creation-area">
        <input type="text" v-model="newCategory.category_name" placeholder="Название категории" class="category-input">
        <button @click="addCategory" class="add-category-btn">Добавить категорию</button>
      </div>
      <div class="categories-display">
        <div v-for="category in categories" :key="category.category_id" class="category-card">
          <div class="card-details">
            <h3>{{ category.category_name }}</h3>
          </div>
          <div class="card-actions">
            <button @click="startEditCategory(category)" class="edit-category-btn">Редактировать</button>
            <button @click="deleteCategory(category.category_id)" class="delete-category-btn">Удалить</button>
            <button @click="goToOtherPage" class="other-page-btn">Перейти на другую страницу</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        categories: [],
        newCategory: {
          category_name: ''
        },
        selectedCategory: null
      };
    },
    created() {
      this.fetchCategories();
    },
    methods: {
      async fetchCategories() {
        try {
          const response = await this.$http.get('/product_categories');
          this.categories = response.data;
        } catch (error) {
          console.error('Error loading categories:', error);
        }
      },
      async addCategory() {
        try {
          await this.$http.post('/product_categories', this.newCategory);
          this.fetchCategories();
          this.newCategory = { category_name: '' };
        } catch (error) {
          console.error('Error adding category:', error);
        }
      },
      startEditCategory(category) {
        this.selectedCategory = { ...category };
      },
      async updateCategory() {
        try {
          await this.$http.put(`/product_categories/${this.selectedCategory.category_id}`, this.selectedCategory);
          this.fetchCategories();
          this.selectedCategory = null;
        } catch (error) {
          console.error('Error updating category:', error);
        }
      },
      async deleteCategory(id) {
        try {
          await this.$http.delete(`/product_categories/${id}`);
          this.fetchCategories();
        } catch (error) {
          console.error('Error deleting category:', error);
        }
      },
      goToOtherPage() {
      this.$router.push('/customer'); 
    },
    }
  };
  </script>
  
  <style scoped>
  .category-management-interface {
    max-width: 600px;
    margin: auto;
    padding: 40px;
    background: #fff; 
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    text-align: center;
    color: #333;
  }
  
  .category-creation-area {
    display: flex;
    flex-direction: column;
    gap: 15px;
    margin-bottom: 20px;
  }
  
  .category-input {
    width: 100%;
    padding: 12px;
    border: 1px solid #ddd; 
    border-radius: 5px;
    background-color: #f8f8f8; 
    color: #333; 
  }
  
  .add-category-btn, .edit-category-btn, .delete-category-btn, .other-page-btn {
    padding: 10px 15px;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    transition: background-color 0.3s;
    background-color: #007bff; 
    color: #fff;
    margin: 5px;
  }
  
  .add-category-btn:hover, .edit-category-btn:hover, .delete-category-btn:hover, .other-page-btn:hover {
    background-color: #0056b3;
  }
  
  .categories-display {
    margin-top: 20px;
  }
  
  .category-card {
    background-color: #f2f2f2; 
    padding: 10px;
    border-radius: 5px;
    margin-bottom: 10px;
  }
  
  .card-actions {
    display: flex;
    justify-content: space-around;
    margin-top: 10px;
  }
  </style>
  