<template>
  <div class="category-management-interface">
    <h1 class="interface-title">Управление Категориями</h1>
    <div v-if="isAdmin" class="category-creation-form">
      <input type="text" v-model="newCategoryName" placeholder="Введите название категории" class="input-field">
      <button @click="addCategory" class="creation-btn">Добавить Категорию</button>
    </div>
    <div class="category-list">
      <div v-for="category in categories" :key="category.id" class="category-item">
        <span>{{ category.name }}</span>
        <div v-if="isAdmin" class="action-buttons">
          <button @click="startEditCategory(category)" class="edit-btn">Редактировать</button>
          <button @click="deleteCategory(category.id)" class="delete-btn">Удалить</button>
        </div>
        <div v-if="selectedCategory === category.id" class="edit-form">
          <input type="text" v-model="selectedCategory.name" class="input-field">
          <button @click="confirmEditCategory" class="save-btn">Сохранить</button>
          <button @click="cancelEditCategory" class="cancel-btn">Отмена</button>
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
  .category-management-interface {
    max-width: 800px;
    margin: auto;
    padding: 40px;
    background-color: #fff;
    border-radius: 20px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  }
  
  .interface-title {
    text-align: center;
    color: #424242;
    font-size: 28px;
    margin-bottom: 30px;
  }
  
  .category-creation-form {
    display: flex;
    justify-content: center;
    gap: 15px;
    margin-bottom: 20px;
  }
  
  .input-field {
    padding: 12px;
    border-radius: 10px;
    border: 1px solid #ccc;
    flex-grow: 1;
  }
  
  .creation-btn, .edit-btn, .delete-btn, .save-btn, .cancel-btn {
    padding: 10px 20px;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    transition: background-color 0.3s;
    color: white;
  }
  
  .creation-btn { background-color: #4caf50; }
  .edit-btn { background-color: #ff9800; }
  .delete-btn { background-color: #f44336; }
  .save-btn { background-color: #4caf50; }
  .cancel-btn { background-color: #78909c; }
  
  .category-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 20px;
  }
  
  .category-item {
    background-color: #f0f4f7;
    padding: 20px;
    border-radius: 15px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
    text-align: center;
  }
  
  .action-buttons {
    display: flex;
    gap: 10px;
    justify-content: center;
    margin-top: 10px;
  }
  
  .edit-form {
    margin-top: 15px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  </style>
  