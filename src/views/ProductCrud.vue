<template>
  <div class="product-management-interface">
    <h1 class="management-title">Управление Продуктами</h1>
    <div v-if="isAdmin" class="product-creation-area">
      <div class="input-group">
        <input type="text" v-model="newProduct.name" placeholder="Название продукта" class="product-input">
        <input type="number" v-model="newProduct.quantity" placeholder="Количество" class="product-input">
        <input type="number" v-model="newProduct.price" placeholder="Цена" class="product-input">
      </div>
      <div class="select-group">
        <select v-model="newProduct.category_id" class="product-select">
          <option v-for="category in categories" :value="category.id" :key="category.id">{{ category.name }}</option>
        </select>
        <button @click="addProduct" class="add-product-btn">Добавить</button>
      </div>
    </div>
    <div class="products-display">
      <div v-for="product in products" :key="product.id" class="product-card">
        <div class="card-details">
          <h3>{{ product.name }}</h3>
          <p>Количество: {{ product.quantity }}</p>
          <p>Цена: ${{ product.price }}</p>
        </div>
        <div v-if="isAdmin" class="card-actions">
          <button @click="startEditProduct(product)" class="edit-product-btn">Редактировать</button>
          <button @click="deleteProduct(product.id)" class="delete-product-btn">Удалить</button>
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
<style scoped>
.product-management-interface {
  max-width: 800px;
  margin: auto;
  padding: 40px;
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  text-align: center;
}

.management-title {
  color: #37474f;
  font-size: 26px;
  margin-bottom: 30px;
}

.product-creation-area {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 30px;
}

.input-group {
  display: flex;
  gap: 10px;
}

.select-group {
  display: flex;
  align-items: center;
  gap: 10px;
}

.product-input, .product-select {
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #cfd8dc;
  flex-grow: 1;
}

.add-product-btn {
  padding: 10px 20px;
  background-color: #42a5f5;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.products-display {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

.product-card {
  background: #eceff1;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.card-details h3 {
  color: #3949ab;
  margin-bottom: 10px;
}

.card-actions {
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-top: 15px;
}

.edit-product-btn, .delete-product-btn {
  padding: 8px 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  color: white;
}

.edit-product-btn { background-color: #ff9800; }
.delete-product-btn { background-color: #f44336; }

@media (max-width: 600px) {
  .input-group, .select-group {
    flex-direction: column;
  }
  .product-input, .product-select {
    flex-basis: 100%;
  }
}
</style>

  
  