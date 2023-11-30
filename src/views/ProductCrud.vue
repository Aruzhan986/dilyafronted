<template>
  <div class="product-management">
    <h1>Product Management</h1>
    <div v-if="isAdmin" class="input-container form-card">
      <div class="form-header">Add New Product</div>
      <input type="text" v-model="newProduct.name" placeholder="Product Name" class="input-field">
      <input type="number" v-model="newProduct.quantity" placeholder="Quantity" class="input-field">
      <input type="number" v-model="newProduct.price" placeholder="Price" class="input-field">
      <select v-model="newProduct.category_id" class="select-field">
        <option v-for="category in categories" :value="category.id" :key="category.id">{{ category.name }}</option>
      </select>
      <button @click="addProduct" class="btn add-btn">Add Product</button>
    </div>
    <div class="product-list">
      <div v-for="product in products" :key="product.id" class="product-item form-card">
        <span>{{ product.name }} - {{ product.quantity }} - {{ product.price }}</span>
        <div v-if="isAdmin" class="button-group">
          <button @click="startEditProduct(product)" class="btn edit-btn">Edit</button>
          <button @click="deleteProduct(product.id)" class="btn delete-btn">Delete</button>
        </div>
      </div>
    </div>
    <div v-if="selectedProduct" class="edit-container form-card">
      <div class="form-header">Edit Product</div>
      <input type="text" v-model="selectedProduct.name" class="input-field">
      <input type="number" v-model="selectedProduct.quantity" class="input-field">
      <input type="number" v-model="selectedProduct.price" class="input-field">
      <select v-model="selectedProduct.category_id" class="select-field">
        <option v-for="category in categories" :value="category.id" :key="category.id">{{ category.name }}</option>
      </select>
      <button @click="confirmEditProduct" class="btn save-btn">Save Changes</button>
      <button @click="cancelEditProduct" class="btn cancel-btn">Cancel</button>
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
  background: #f9f9f9;
  border-radius: 8px;
}

.form-card {
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.form-header {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 15px;
}

.input-field,
.select-field {
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  width: calc(100% - 22px); /* Adjust width for padding */
}

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s;
  display: block;
  width: 100%;
  text-align: center;
}

.add-btn { background-color: #4CAF50; color: white; }
.edit-btn { background-color: #ffc107; color: black; }
.delete-btn { background-color: #f44336; color: white; }
.save-btn { background-color: #4CAF50; color: white; }
.cancel-btn { background-color: #9e9e9e; color: black; }

.product-list {
  padding: 0;
}

.product-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.button-group {
  display: flex;
  gap: 10px;
}

  </style>