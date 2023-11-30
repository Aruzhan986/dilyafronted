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
<style>
.product-management-interface {
  max-width: 850px;
  margin: auto;
  padding: 50px;
  background-color: #ffd54f;
  border-radius: 15px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  text-align: center;
}

.management-title {
  color: #424242;
  font-size: 32px;
  margin-bottom: 20px;
}

.product-creation-area {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 30px;
}

.input-group,
.select-group {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  justify-content: center;
}

.product-input,
.product-select {
  padding: 12px;
  border-radius: 8px;
  border: 2px solid #f57f17;
  flex-grow: 1;
  background-color: #fff;
}

.add-product-btn {
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
  background-color: #ff8f00;
  color: #fff;
}

.products-display {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

.product-card {
  background-color: #fffde7;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.card-details h3 {
  margin-bottom: 10px;
}

.card-actions {
  display: flex;
  gap: 15px;
  justify-content: center;
}

.edit-product-btn,
.delete-product-btn {
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.edit-product-btn {
  background-color: #ff6f00;
  color: #fff;
}

.delete-product-btn {
  background-color: #e65100;
  color: #fff;
}
</style>


  
  