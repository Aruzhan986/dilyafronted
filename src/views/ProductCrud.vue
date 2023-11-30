<template>
  <div class="product-admin-dashboard">
    <h1 class="dashboard-heading">Управление Продуктами</h1>
    <div v-if="isAdmin" class="add-product-area">
      <input type="text" v-model="newProduct.name" placeholder="Название продукта" class="product-input">
      <input type="number" v-model="newProduct.quantity" placeholder="Количество" class="product-input">
      <input type="number" v-model="newProduct.price" placeholder="Цена" class="product-input">
      <select v-model="newProduct.category_id" class="product-select">
        <option v-for="category in categories" :value="category.id" :key="category.id">{{ category.name }}</option>
      </select>
      <button @click="addProduct" class="btn add-product-btn">Добавить Продукт</button>
    </div>
    <div class="products-list">
      <div v-for="product in products" :key="product.id" class="product-item">
        <div class="product-info">
          <span>{{ product.name }} - {{ product.quantity }} - ${{ product.price }}</span>
          <div v-if="isAdmin" class="product-options">
            <button @click="startEditProduct(product)" class="btn edit-btn">Редактировать</button>
            <button @click="deleteProduct(product.id)" class="btn delete-btn">Удалить</button>
          </div>
        </div>
        <div v-if="selectedProduct === product.id" class="product-edit-form">
          <input type="text" v-model="selectedProduct.name" class="product-input">
          <input type="number" v-model="selectedProduct.quantity" class="product-input">
          <input type="number" v-model="selectedProduct.price" class="product-input">
          <select v-model="selectedProduct.category_id" class="product-select">
            <option v-for="category in categories" :value="category.id" :key="category.id">{{ category.name }}</option>
          </select>
          <button @click="confirmEditProduct" class="btn save-btn">Сохранить</button>
          <button @click="cancelEditProduct" class="btn cancel-btn">Отменить</button>
        </div>
      </div>
    </div>
  </div>
</template>



  <script>
  export default {
  data() {
    return {
      products: [],
      categories: [],
      newProduct: {
        name: '',
        quantity: 0,
        price: 0,
        category_id: null
      },
      isAdmin: false,
      selectedProduct: null,
    };
  },
  created() {
    this.checkUserRoleAndLoadData();
  },
  methods: {
    async checkUserRoleAndLoadData() {
      const token = localStorage.getItem('authToken');
      if (!token) return;
  
      try {
        const rolesResponse = await this.$http.get('/roles', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
  
        this.isAdmin = rolesResponse.data.some(role => role.name === 'Admin');
        this.loadProducts();
        this.loadCategories();
      } catch (error) {
        console.error('Error checking user role:', error);
      }
    },
    async loadProducts() {
      try {
        const response = await this.$http.get('/product/products');
        this.products = response.data;
      } catch (error) {
        console.error('Error loading products:', error);
      }
    },
    async loadCategories() {
      try {
        const response = await this.$http.get('/category/categories');
        this.categories = response.data;
      } catch (error) {
        console.error('Error loading categories:', error);
      }
    },
    async addProduct() {
      const token = localStorage.getItem('authToken');
      try {
        await this.$http.post('/product/products', this.newProduct, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        this.loadProducts();
        this.newProduct = { name: '', quantity: 0, price: 0, category_id: null };
      } catch (error) {
        console.error('Error adding product:', error);
      }
    },
    startEditProduct(product) {
      this.selectedProduct = { ...product };
    },
    async confirmEditProduct() {
    const token = localStorage.getItem('authToken');
    try {
        await this.$http.put(`/product/products/${this.selectedProduct.id}`, this.selectedProduct, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        this.loadProducts();
        this.selectedProduct = null;
    } catch (error) {
        console.error('Error editing product:', error);
        if (error.response) {
            console.log(error.response.data); 
        }
    }
},

    cancelEditProduct() {
      this.selectedProduct = null;
    },
    async deleteProduct(id) {
      const token = localStorage.getItem('authToken');
      try {
        await this.$http.delete(`/product/products/${id}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        this.loadProducts();
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    },
  },
  };
  </script>
  <style>
  .product-admin-dashboard {
    max-width: 900px;
    margin: auto;
    padding: 40px;
    background-color: #f5f5f5;
    border-radius: 20px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
  
  .dashboard-heading {
    text-align: center;
    color: #424242;
    font-size: 28px;
    margin-bottom: 30px;
  }
  
  .add-product-area {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    justify-content: center;
    margin-bottom: 20px;
  }
  
  .product-input, .product-select {
    padding: 10px;
    border-radius: 8px;
    border: 1px solid #cfd8dc;
    flex: 1 1 200px;
  }
  
  .btn {
    padding: 10px 20px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s;
    color: white;
  }
  
  .add-product-btn { background-color: #4caf50; }
  .edit-btn { background-color: #ff9800; }
  .delete-btn { background-color: #f44336; }
  .save-btn { background-color: #4caf50; }
  .cancel-btn { background-color: #78909c; }
  
  .products-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
  }
  
  .product-item {
    background-color: white;
    padding: 15px;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    text-align: center;
  }
  
  .product-info {
    margin-bottom: 10px;
  }
  
  .product-options {
    display: flex;
    gap: 10px;
    justify-content: center;
  }
  </style>
  
  