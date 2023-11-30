<template>
  <div class="category-management">
    <h1>Категории</h1>
    <div v-if="isAdmin" class="input-container">
      <input type="text" v-model="newCategoryName" placeholder="Название новой категории" class="input-field">
      <button @click="addCategory" class="add-btn">Добавить Категорию</button>
    </div>
    <ul class="category-list">
      <li v-for="category in categories" :key="category.id" class="category-item">
        {{ category.name }}
        <div v-if="isAdmin" class="button-group">
          <button @click="startEditCategory(category)" class="edit-btn">Изменить</button>
          <button @click="deleteCategory(category.id)" class="delete-btn">Удалить</button>
        </div>
      </li>
    </ul>
    <div v-if="selectedCategory" class="edit-container">
      <input type="text" v-model="selectedCategory.name" class="input-field">
      <button @click="confirmEditCategory" class="save-btn">Сохранить изменения</button>
      <button @click="cancelEditCategory" class="cancel-btn">Отменить</button>
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
  .category-management {
    max-width: 600px;
    margin: auto;
    padding: 20px;
    background: #f5f5f5;
    border-radius: 8px;
  }
  
  .input-container, .edit-container {
    margin-bottom: 20px;
  }
  
  .input-field {
    padding: 8px;
    margin-right: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  button {
    padding: 8px 15px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .add-btn, .save-btn {
    background-color: #4CAF50;
    color: white;
  }
  
  .edit-btn {
    background-color: #ffc107;
    color: black;
  }
  
  .delete-btn {
    background-color: #f44336;
    color: white;
  }
  
  .cancel-btn {
    background-color: #9e9e9e;
    color: black;
  }
  
  .category-list {
    list-style: none;
    padding: 0;
  }
  
  .category-item {
    background: #fff;
    margin-bottom: 10px;
    padding: 10px;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }
  
  .button-group {
    display: flex;
    gap: 10px;
  }
  </style>