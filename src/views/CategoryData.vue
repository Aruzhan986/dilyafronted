<template>
  <div class="custom-category-management-interface">
    <h1 class="custom-interface-title">Управление Категориями</h1>
    <div v-if="isAdmin" class="custom-category-addition-area">
      <input type="text" v-model="newCategoryName" placeholder="Название категории" class="custom-input-style">
      <button @click="addCategory" class="custom-btn-style custom-add-category-btn">Добавить Категорию</button>
    </div>
    <div class="custom-category-display-grid">
      <div v-for="category in categories" :key="category.id" class="custom-category-card">
        <h3>{{ category.name }}</h3>
        <div v-if="isAdmin" class="custom-card-actions">
          <button @click="startEditCategory(category)" class="custom-btn-style custom-edit-category-btn">Изменить</button>
          <button @click="deleteCategory(category.id)" class="custom-btn-style custom-delete-category-btn">Удалить</button>
        </div>
        <div v-if="selectedCategory === category.id" class="custom-category-editing-area">
          <input type="text" v-model="selectedCategory.name" class="custom-input-style">
          <button @click="confirmEditCategory" class="custom-btn-style custom-confirm-edit-btn">Сохранить</button>
          <button @click="cancelEditCategory" class="custom-btn-style custom-cancel-edit-btn">Отмена</button>
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
  .custom-category-management-interface {
    max-width: 800px;
    margin: auto;
    padding: 40px;
    background-color: #f7f7f7;
    border-radius: 20px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    text-align: center;
  }
  
  .custom-interface-title {
    color: #333;
    font-size: 26px;
    margin-bottom: 30px;
  }
  
  .custom-category-addition-area {
    display: flex;
    flex-direction: column;
    gap: 15px;
    margin-bottom: 25px;
  }
  
  .custom-input-style {
    padding: 10px;
    border-radius: 8px;
    border: 1px solid #ddd;
  }
  
  .custom-btn-style {
    padding: 10px 20px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s;
    color: white;
  }
  
  .custom-add-category-btn { background-color: #673ab7; }
.custom-edit-category-btn { background-color: #03a9f4; }
.custom-delete-category-btn { background-color: #f44336; }
.custom-confirm-edit-btn { background-color: #4caf50; }
.custom-cancel-edit-btn { background-color: #9e9e9e; }


.custom-btn-style {
  padding: 12px 24px;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  transition: transform 0.2s ease-in-out, background-color 0.2s ease;
  color: white;
  font-size: 16px;
  margin: 5px;
  outline: none;
  text-transform: uppercase;
  font-weight: bold;
}

.custom-btn-style:hover {
  transform: translateY(-3px);
}

.custom-add-category-btn:hover { background-color: #5e35b1; }
.custom-edit-category-btn:hover { background-color: #039be5; }
.custom-delete-category-btn:hover { background-color: #e53935; }
.custom-confirm-edit-btn:hover { background-color: #43a047; }
.custom-cancel-edit-btn:hover { background-color: #757575; }
</style>