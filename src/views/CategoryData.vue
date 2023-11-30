<template>
  <div class="category-control-panel">
    <h1 class="control-title">Управление Категориями</h1>
    <div v-if="isAdmin" class="new-category-section">
      <input type="text" v-model="newCategoryName" placeholder="Новая категория" class="category-input">
      <button @click="addCategory" class="button add-btn">Добавить</button>
    </div>
    <div class="categories-grid">
      <div v-for="category in categories" :key="category.id" class="category-box">
        <h2>{{ category.name }}</h2>
        <div v-if="isAdmin" class="category-actions">
          <button @click="startEditCategory(category)" class="button edit-btn">Изменить</button>
          <button @click="deleteCategory(category.id)" class="button delete-btn">Удалить</button>
        </div>
        <div v-if="selectedCategory === category.id" class="edit-category">
          <input type="text" v-model="selectedCategory.name" class="category-input">
          <button @click="confirmEditCategory" class="button save-btn">Сохранить</button>
          <button @click="cancelEditCategory" class="button cancel-btn">Отмена</button>
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
        newCategoryName: '',
        isAdmin: false,
        selectedCategory: null,
      };
    },
    created() {
      this.checkUserRoleAndLoadCategories();
    },
    methods: {
      async checkUserRoleAndLoadCategories() {
        const token = localStorage.getItem('authToken');
        if (!token) return;
  
        try {
          const rolesResponse = await this.$http.get('/roles', {
  headers: { 'Authorization': `Bearer ${localStorage.getItem('authToken')}` }
})

          this.isAdmin = rolesResponse.data.some(role => role.name === 'Admin');
          this.loadCategories();
        } catch (error) {
          console.error('Ошибка при проверке роли пользователя:', error);
        }
      },
      async loadCategories() {
        try {
          const response = await this.$http.get('/category/categories');
          this.categories = response.data;
        } catch (error) {
          console.error('Ошибка загрузки категорий:', error);
        }
      },
      async addCategory() {
        const token = localStorage.getItem('authToken');
        try {
          await this.$http.post('/category/categories', {
            name: this.newCategoryName
          }, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          this.loadCategories(); 
          this.newCategoryName = '';
        } catch (error) {
          console.error('Ошибка добавления категории:', error);
        }
      },
      startEditCategory(category) {
        this.selectedCategory = { ...category };
      },
      async confirmEditCategory() {
        const token = localStorage.getItem('authToken');
        try {
          await this.$http.put(`/category/categories/${this.selectedCategory.id}`, {
            name: this.selectedCategory.name
          }, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          this.loadCategories(); 
          this.selectedCategory = null;
        } catch (error) {
          console.error('Ошибка редактирования категории:', error);
        }
      },
      cancelEditCategory() {
        this.selectedCategory = null;
      },
      async deleteCategory(id) {
        const token = localStorage.getItem('authToken');
        try {
          await this.$http.delete(`/category/categories/${id}`, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          this.loadCategories();
        } catch (error) {
          console.error('Ошибка удаления категории:', error);
        }
      },
    },
  };
  </script>
  <style>
  .category-control-panel {
    max-width: 900px;
    margin: 50px auto;
    padding: 50px;
    background: #e8eaf6;
    border-radius: 25px;
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
    text-align: center;
  }
  
  .control-title {
    font-size: 32px;
    margin-bottom: 40px;
    color: #3f51b5;
  }
  
  .new-category-section {
    display: flex;
    gap: 20px;
    margin-bottom: 30px;
  }
  
  .category-input {
    padding: 10px;
    border-radius: 8px;
    border: 1px solid #c5cae9;
    flex-grow: 1;
  }
  
  .button {
    padding: 10px 20px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s;
    color: white;
  }
  
  .add-btn { background-color: #9fa8da; }
  .edit-btn { background-color: #7986cb; }
  .delete-btn { background-color: #5c6bc0; }
  .save-btn { background-color: #3f51b5; }
  .cancel-btn { background-color: #303f9f; }
  
  .categories-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 20px;
  }
  
  .category-box {
    background: #fff;
    padding: 20px;
    border-radius: 15px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  }
  
  .category-actions {
    display: flex;
    gap: 10px;
    justify-content: center;
    margin-top: 15px;
  }
  
  .edit-category {
    margin-top: 20px;
    display: flex;
    gap: 10px;
    flex-direction: column;
  }
  </style>
  