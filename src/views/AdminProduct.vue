<template>
  <div class="product-management">
    <h1>Products</h1>
    <div v-if="isAdmin" class="input-container">
      <input type="text" v-model="newProduct.name" placeholder="Product Name" class="input-field">
      <input type="number" v-model="newProduct.quantity" placeholder="Quantity" class="input-field">
      <input type="number" v-model="newProduct.price" placeholder="Price" class="input-field">
      <select v-model="newProduct.category_id" class="select-field">
        <option v-for="category in categories" :value="category.id" :key="category.id">{{ category.name }}</option>
      </select>
      <button @click="addProduct" class="add-btn">Add Product</button>
    </div>
    <ul class="product-list">
      <li v-for="product in products" :key="product.id" class="product-item">
        {{ product.name }} - {{ product.quantity }} - {{ product.price }}
        <div v-if="isAdmin" class="button-group">
          <button @click="startEditProduct(product)" class="edit-btn">Edit</button>
          <button @click="deleteProduct(product.id)" class="delete-btn">Delete</button>
        </div>
      </li>
    </ul>
    <div v-if="selectedProduct" class="edit-container">
      <input type="text" v-model="selectedProduct.name" class="input-field">
      <input type="number" v-model="selectedProduct.quantity" class="input-field">
      <input type="number" v-model="selectedProduct.price" class="input-field">
      <select v-model="selectedProduct.category_id" class="select-field">
        <option v-for="category in categories" :value="category.id" :key="category.id">{{ category.name }}</option>
      </select>
      <button @click="confirmEditProduct" class="save-btn">Save Changes</button>
      <button @click="cancelEditProduct" class="cancel-btn">Cancel</button>
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
  .product-management {
    max-width: 800px;
    margin: auto;
    padding: 20px;
    background: #f5f5f5;
    border-radius: 8px;
  }
  
  .input-container, .edit-container {
    margin-bottom: 20px;
  }
  
  .input-field, .select-field {
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
  
  .product-list {
    list-style: none;
    padding: 0;
  }
  
  .product-item {
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