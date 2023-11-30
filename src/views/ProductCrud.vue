<template>
  <div class="product-management-container">
    <h1 class="management-title">Product Management</h1>
    <div v-if="isAdmin" class="add-product-section">
      <div class="add-product-form">
        <div class="form-field">
          <input type="text" v-model="newProduct.name" placeholder="Product Name">
          <input type="number" v-model="newProduct.quantity" placeholder="Quantity">
          <input type="number" v-model="newProduct.price" placeholder="Price">
          <select v-model="newProduct.category_id">
            <option v-for="category in categories" :value="category.id" :key="category.id">{{ category.name }}</option>
          </select>
          <button @click="addProduct" class="action-btn">Add Product</button>
        </div>
      </div>
    </div>
    <div class="product-display-area">
      <div v-for="product in products" :key="product.id" class="product-card">
        <div class="product-details">
          <span>{{ product.name }} - Qty: {{ product.quantity }} - ${{ product.price }}</span>
          <div v-if="isAdmin" class="product-actions">
            <button @click="startEditProduct(product)" class="edit-action">Edit</button>
            <button @click="deleteProduct(product.id)" class="delete-action">Delete</button>
          </div>
        </div>
        <div v-if="selectedProduct === product.id" class="edit-product-form">
          <div class="form-field">
            <input type="text" v-model="selectedProduct.name">
            <input type="number" v-model="selectedProduct.quantity">
            <input type="number" v-model="selectedProduct.price">
            <select v-model="selectedProduct.category_id">
              <option v-for="category in categories" :value="category.id" :key="category.id">{{ category.name }}</option>
            </select>
            <button @click="confirmEditProduct" class="save-action">Save</button>
            <button @click="cancelEditProduct" class="cancel-action">Cancel</button>
          </div>
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
  .product-management-container {
    max-width: 800px;
    margin: auto;
    padding: 30px;
    background: #e3f2fd;
    border-radius: 15px;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  }
  
  .management-title {
    color: #1e88e5;
    text-align: center;
    font-size: 24px;
    margin-bottom: 20px;
  }
  
  .add-product-section {
    background: #fff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
  }
  
  .form-field {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    align-items: center;
    justify-content: space-between;
  }
  
  .add-product-section input, .add-product-section select {
    flex: 1 1 200px;
    padding: 10px;
    border-radius: 6px;
    border: 1px solid #b0bec5;
  }
  
  .action-btn {
    background-color: #1e88e5;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
  }
  
  .product-display-area {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }
  
  .product-card {
    background: #fff;
    padding: 15px;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .product-details {
    margin-bottom: 15px;
  }
  
  .product-actions {
    display: flex;
    gap: 10px;
  }
  
  .edit-action, .delete-action, .save-action, .cancel-action {
    padding: 8px 15px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
  }
  
  .edit-action { background-color: #ffca28; }
  .delete-action { background-color: #f44336; color: white; }
  .save-action { background-color: #4caf50; color: white; }
  .cancel-action { background-color: #78909c; }
  
  @media (max-width: 600px) {
    .product-display-area {
      grid-template-columns: 1fr;
    }
  
    .form-field {
      flex-direction: column;
    }
  
    .add-product-section input, .add-product-section select {
      flex-basis: 100%;
    }
  }
  </style>
  