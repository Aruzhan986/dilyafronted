<template>
  <div class="categories-management-area">
    <h1 class="management-title">Управление Категориями</h1>
    <div v-if="isAdmin" class="add-category-section">
      <input type="text" v-model="newCategoryName" placeholder="Название новой категории" class="category-input">
      <button @click="addCategory" class="add-category-btn">Добавить</button>
    </div>
    <div class="categories-display">
      <div v-for="category in categories" :key="category.id" class="category-card">
        <span>{{ category.name }}</span>
        <div v-if="isAdmin" class="category-actions">
          <button @click="startEditCategory(category)" class="edit-category-btn">Изменить</button>
          <button @click="deleteCategory(category.id)" class="delete-category-btn">Удалить</button>
        </div>
        <div v-if="selectedCategory === category.id" class="edit-category-section">
          <input type="text" v-model="selectedCategory.name" class="category-input">
          <button @click="confirmEditCategory" class="save-changes-btn">Сохранить</button>
          <button @click="cancelEditCategory" class="cancel-changes-btn">Отменить</button>
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
  <style scoped>
  .categories-management-area {
    max-width: 800px;
    margin: auto;
    padding: 30px;
    background: #e3f2fd;
    border-radius: 15px;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  }
  
  .management-title {
    text-align: center;
    color: #2c3e50;
    font-size: 24px;
    margin-bottom: 20px;
  }
  
  .add-category-section {
    display: flex;
    gap: 10px;
    justify-content: center;
    margin-bottom: 20px;
  }
  
  .category-input {
    padding: 10px;
    border-radius: 6px;
    border: 1px solid #90a4ae;
    flex-grow: 1;
  }
  
  .add-category-btn, .edit-category-btn, .delete-category-btn, .save-changes-btn, .cancel-changes-btn {
    padding: 10px 20px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .add-category-btn { background-color: #4CAF50; color: white; }
  .edit-category-btn { background-color: #ffca28; color: black; }
  .delete-category-btn { background-color: #f44336; color: white; }
  .save-changes-btn { background-color: #4caf50; color: white; }
  .cancel-changes-btn { background-color: #78909c; color: white; }
  
  .categories-display {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 20px;
  }
  
  .category-card {
    background: #fff;
    padding: 15px;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    text-align: center;
  }
  
  .category-actions {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-top: 10px;
  }
  
  .edit-category-section {
    margin-top: 15px;
    display: flex;
    gap: 10px;
    justify-content: center;
  }
  </style>
  