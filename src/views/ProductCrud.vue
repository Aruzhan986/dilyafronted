<template>
  <div class="product-dashboard">
    <h1 class="dashboard-title">Управление Продуктами</h1>
    <div v-if="isAdmin" class="add-product-form">
      <input type="text" v-model="newProduct.name" placeholder="Название продукта" class="input-field">
      <input type="number" v-model="newProduct.quantity" placeholder="Количество" class="input-field">
      <input type="number" v-model="newProduct.price" placeholder="Цена" class="input-field">
      <select v-model="newProduct.category_id" class="select-field">
        <option v-for="category in categories" :value="category.id" :key="category.id">{{ category.name }}</option>
      </select>
      <button @click="addProduct" class="add-btn">Добавить Продукт</button>
    </div>
    <div class="product-list">
      <div v-for="product in products" :key="product.id" class="product-card">
        <div class="card-content">
          <h3>{{ product.name }}</h3>
          <p>Количество: {{ product.quantity }}</p>
          <p>Цена: ${{ product.price }}</p>
          <div v-if="isAdmin" class="card-actions">
            <button @click="startEditProduct(product)" class="edit-btn">Редактировать</button>
            <button @click="deleteProduct(product.id)" class="delete-btn">Удалить</button>
          </div>
        </div>
        <div v-if="selectedProduct === product.id" class="edit-form">
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
<style scoped>
.product-dashboard {
  max-width: 900px;
  margin: 40px auto;
  padding: 30px;
  background-color: #eceff1;
  border-radius: 20px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.dashboard-title {
  color: #263238;
  font-size: 26px;
  text-align: center;
  margin-bottom: 20px;
}

.add-product-form {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 30px;
}

.input-field, .select-field {
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #b0bec5;
  flex: 1 1 200px;
}

.add-btn {
  background-color: #4caf50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.product-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

.product-card {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.card-content h3 {
  margin-top: 0;
  color: #3949ab;
}

.card-actions {
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-top: 15px;
}

.edit-btn, .delete-btn {
  padding: 8px 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  color: white;
}

.edit-btn { background-color: #ff9800; }
.delete-btn { background-color: #f44336; }

@media (max-width: 600px) {
  .add-product-form, .product-list {
    flex-direction: column;
  }
  .input-field, .select-field {
    flex-basis: 100%;
  }
}
</style>

  
  