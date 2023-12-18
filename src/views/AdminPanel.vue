<template>
    <div class="item-management-interface">
      <h1 class="management-title">Управление товарами</h1>
      <div v-if="isAdmin" class="item-creation-area">
        <div class="input-group">
          <input type="text" v-model="newItem.item_name" placeholder="Название товара" class="item-input">
          <input type="number" v-model="newItem.stock_quantity" placeholder="Количество" class="item-input">
          <input type="number" v-model="newItem.unit_price" placeholder="Цена" class="item-input">
          <input type="file" @change="onFileChange" class="item-input">
          <select v-model="newItem.product_category_id" class="item-select">
            <option disabled value="">Выберите категорию</option>
            <option v-for="category in categories" :value="category.category_id" :key="category.category_id">
              {{ category.name }}
            </option>
          </select>
        </div>
        <button @click="addItem" class="add-item-btn">Добавить</button>
        <button v-if="selectedItem" @click="updateItem" class="edit-item-btn">Сохранить изменения</button>
        <button @click="goToOtherPage" class="other-page-btn">Перейти на другую страницу</button>
      </div>
      <div class="items-display">
        <div v-for="item in items" :key="item.item_id" class="item-card">
          <div class="card-details">
            <h3>{{ item.item_name }}</h3>
            <p>Категория: {{ getCategoryName(item.product_category_id) }}</p>
            <p>Количество: {{ item.stock_quantity }}</p>
            <p>Цена: тг{{ item.unit_price }}</p>
          </div>
          <div v-if="isAdmin" class="card-actions">
            <button @click="startEditItem(item)" class="edit-item-btn">Редактировать</button>
            <button @click="deleteItem(item.item_id)" class="delete-item-btn">Удалить</button>
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
        categories: [],
        newItem: {
          item_name: '',
          stock_quantity: 0,
          unit_price: 0,
          product_category_id: null,
          image: null
        },
        isAdmin: true, 
        selectedItem: null,
      };
    },
    created() {
      this.loadItems();
      this.loadCategories();
    },
    methods: {
      async loadItems() {
        try {
          const response = await this.$http.get('/item');
          this.items = response.data;
        } catch (error) {
          console.error('Error loading items:', error);
        }
      },
      async loadCategories() {
        try {
          const response = await this.$http.get('/product_categories');
          this.categories = response.data;
        } catch (error) {
          console.error('Error loading categories:', error);
        }
      },
      getCategoryName(categoryId) {
        const category = this.categories.find(cat => cat.category_id === categoryId);
        return category ? category.name : 'Неизвестная категория';
      },
      getImagePath(imagePath) {
        return `http://localhost:8000/storage/image_path/${imagePath}`;
      },
      onFileChange(e) {
        this.newItem.image = e.target.files[0];
      },
      async addItem() {
        const formData = new FormData();
        Object.keys(this.newItem).forEach(key => {
          formData.append(key, this.newItem[key]);
        });
  
        try {
          await this.$http.post('/item', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
          this.loadItems();
          this.newItem = { item_name: '', stock_quantity: 0, unit_price: 0, product_category_id: null, image: null };
        } catch (error) {
          console.error('Error adding item:', error);
        }
      },
      startEditItem(item) {
        this.selectedItem = { ...item };
      },
      async updateItem() {
        const formData = new FormData();
        Object.keys(this.selectedItem).forEach(key => {
          formData.append(key, this.selectedItem[key]);
        });
  
        try {
          await this.$http.put(`/item/${this.selectedItem.item_id}`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
          this.loadItems();
          this.selectedItem = null;
        } catch (error) {
          console.error('Error updating item:', error);
        }
      },
      async deleteItem(id) {
        try {
          await this.$http.delete(`/item/${id}`);
          this.loadItems();
        } catch (error) {
          console.error('Error deleting item:', error);
        }
      },
      goToOtherPage() {
      this.$router.push('/categories'); 
    },
    },
  };
  </script>
  
  <style scoped>
  .item-management-interface {
    max-width: 800px;
    margin: auto;
    padding: 40px;
    background: #fff; 
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    text-align: center;
    color: #333; 
  }
  
  .management-title {
    color: #333;
    font-size: 32px;
    margin-bottom: 25px;
  }
  
  .item-creation-area {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  
  .input-group {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  
  .item-input, .item-select {
    width: 100%;
    padding: 12px;
    border: 1px solid #ddd; 
    border-radius: 5px;
    background-color: #f8f8f8; 
    color: #333; 
  }
  
  .add-item-btn, .edit-item-btn, .other-page-btn, .delete-item-btn {
    padding: 10px 15px;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    transition: background-color 0.3s;
    background-color: #007bff; 
    color: #fff;
    margin-top: 10px;
  }
  
  .add-item-btn:hover, .edit-item-btn:hover, .other-page-btn:hover, .delete-item-btn:hover {
    background-color: #0056b3;
  }
  
  .items-display {
    margin-top: 20px;
  }
  
  .item-card {
    background-color: #f2f2f2; 
    padding: 10px;
    border-radius: 5px;
    margin-bottom: 10px;
  }
  
  .card-details {
    margin-bottom: 10px;
  }
  
  .item-image {
    max-width: 100%;
    height: auto;
    border-radius: 5px;
  }
  
  .card-actions {
    display: flex;
    justify-content: space-around;
  }
  
  .edit-item-btn {
    background-color: #ffc107; 
    color: #333;
  }
  
  .delete-item-btn {
    background-color: #dc3545; 
    color: #fff;
  }
  </style>
  