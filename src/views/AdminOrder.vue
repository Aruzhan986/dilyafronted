<template>
  <div>
  <h1>Заказы</h1>
  <table>
    <thead>
      <tr>
        <th>ID заказа</th>
        <th>Дата заказа</th>
        <th>Клиент</th>
        <th>Продукт</th>
        <th>Цена</th>
        <th>Категория</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="order in orders" :key="order.order_id">
        <td>{{ order.order_id }}</td>
        <td>{{ order.order_date }}</td>
        <td>{{ order.client.client_name }}</td>
        <td>{{ order.product.product_name }}</td>
        <td>{{ order.product.product_price }}</td>
        <td>{{ order.product.category.category_name }}</td>
      </tr>
    </tbody>
  </table>
</div>
</template>

<script>
export default {
  data() {
    return {
      categories: [],
      orders: [],
      newCategoryName: '',
      isAdmin: false,
      selectedCategory: null,
    };
  },
  created() {
    this.checkUserRoleAndLoadCategories();
    this.fetchOrders();
  },
  methods: {
    async checkUserRoleAndLoadCategories() {
      const token = localStorage.getItem('authToken');
      if (!token) return;

      try {
        const rolesResponse = await this.$http.get('/roles', {
          headers: { 'Authorization': `Bearer ${token}` }
        });

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
        await this.$http.post('/category/categories', { name: this.newCategoryName }, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        this.loadCategories();
        this.newCategoryName = '';
      } catch (error) {
        console.error('Ошибка добавления категории:', error);
      }
    },
    async fetchOrders() {
try {
  const response = await this.$http.get('/order/orders');
  this.orders = response.data.orders;
      } catch (error) {
        console.error('Ошибка загрузки заказов:', error);
      }
},

  },
};
</script>