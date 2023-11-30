<template>
  <div class="custom-category-management">
    <h1 class="custom-heading">Управление категориями</h1>
    <div v-if="isAdmin" class="custom-input-container">
      <input type="text" v-model="newCategoryName" placeholder="Введите название новой категории" class="custom-input-field">
      <button @click="addCategory" class="custom-add-btn">Добавить категорию</button>
    </div>
    <ul class="custom-category-list">
      <li v-for="category in categories" :key="category.id" class="custom-category-item">
        <div class="custom-category-info">
          <span class="custom-category-name">{{ category.name }}</span>
          <div v-if="isAdmin" class="custom-button-group">
            <button @click="startEditCategory(category)" class="custom-edit-btn">Изменить</button>
            <button @click="deleteCategory(category.id)" class="custom-delete-btn">Удалить</button>
          </div>
        </div>
        <div v-if="selectedCategory === category.id" class="custom-edit-container">
          <input type="text" v-model="category.name" class="custom-edit-input">
          <div class="custom-edit-btn-group">
            <button @click="confirmEditCategory(category.id)" class="custom-save-btn">Сохранить</button>
            <button @click="cancelEditCategory(category.id)" class="custom-cancel-btn">Отменить</button>
          </div>
        </div>
      </li>
    </ul>
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
 .custom-category-management {
   max-width: 800px;
   margin: auto;
   padding: 20px;
   background: #f5f5f5;
   border-radius: 10px;
   font-family: Arial, sans-serif;
 }
 
 .custom-heading {
   text-align: center;
   margin-bottom: 20px;
   color: #333333;
   font-size: 24px;
 }
 
 .custom-input-container {
   margin-bottom: 20px;
   display: flex;
   align-items: center;
 }
 
 .custom-input-field {
   flex: 1;
   padding: 10px;
   margin-right: 10px;
   border: 1px solid #ccc;
   border-radius: 6px;
 }
 
 button {
   padding: 10px 15px;
   border: none;
   border-radius: 6px;
   cursor: pointer;
   transition: background-color 0.3s;
   margin-top: 10px;
 }
 
 .custom-add-btn,
 .custom-save-btn {
   background-color: #4CAF50;
   color: white;
 }
 
 .custom-edit-btn {
   background-color: #ffc107;
   color: black;
 }
 
 .custom-delete-btn {
   background-color: #f44336;
   color: white;
 }
 
 .custom-cancel-btn {
   background-color: #9e9e9e;
   color: black;
 }
 
 .custom-category-list {
   list-style: none;
   padding: 0;
 }
 
 .custom-category-item {
   background: #ffffff;
   margin-bottom: 15px;
   padding: 12px;
   border-radius: 8px;
   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
 }
 
 .custom-category-info {
   display: flex;
   justify-content: space-between;
   align-items: center;
 }
 
 .custom-category-name {
   font-weight: bold;
   font-size: 16px;
 }
 
 .custom-button-group {
   display: flex;
   gap: 10px;
 }
 
 .custom-edit-container {
   margin-top: 10px;
 }
 
 .custom-edit-input {
   width: 60%;
   padding: 8px;
   margin-bottom: 10px;
   border: 1px solid #ccc;
   border-radius: 6px;
 }
 
 .custom-edit-btn-group {
   display: flex;
   gap: 10px;
   justify-content: center;
 }
 </style>