<template>
  <div class="category-management-interface">
    <h1 class="interface-title">Управление Категориями</h1>
    <div v-if="isAdmin" class="category-addition-area">
      <input type="text" v-model="newCategoryName" placeholder="Название категории" class="input-style">
      <button @click="addCategory" class="btn-style add-category-btn">Добавить Категорию</button>
    </div>
    <div class="category-display-grid">
      <div v-for="category in categories" :key="category.id" class="category-card">
        <h3>{{ category.name }}</h3>
        <div v-if="isAdmin" class="card-actions">
          <button @click="startEditCategory(category)" class="btn-style edit-category-btn">Изменить</button>
          <button @click="deleteCategory(category.id)" class="btn-style delete-category-btn">Удалить</button>
        </div>
        <div v-if="selectedCategory === category.id" class="category-editing-area">
          <input type="text" v-model="selectedCategory.name" class="input-style">
          <button @click="confirmEditCategory" class="btn-style confirm-edit-btn">Сохранить</button>
          <button @click="cancelEditCategory" class="btn-style cancel-edit-btn">Отмена</button>
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
  .category-management-interface {
    max-width: 800px;
    margin: auto;
    padding: 40px;
    background-color: #f7f7f7;
    border-radius: 20px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    text-align: center;
  }
  
  .interface-title {
    color: #333;
    font-size: 26px;
    margin-bottom: 30px;
  }
  
  .category-addition-area {
    display: flex;
    gap: 15px;
    margin-bottom: 25px;
  }
  
  .input-style {
    padding: 10px;
    border-radius: 8px;
    border: 1px solid #ddd;
    flex-grow: 1;
  }
  
  .btn-style {
    padding: 10px 20px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s;
    color: white;
  }
  
  .add-category-btn { background-color: #4caf50; }
  .edit-category-btn { background-color: #ff9800; }
  .delete-category-btn { background-color: #f44336; }
  .confirm-edit-btn { background-color: #4caf50; }
  .cancel-edit-btn { background-color: #9e9e9e; }
  
  .category-display-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 20px;
  }
  
  .category-card {
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    text-align: center;
  }
  
  .card-actions {
    display: flex;
    gap: 10px;
    justify-content: center;
    margin-top: 15px;
  }
  
  .category-editing-area {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  </style>
  