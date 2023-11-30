<template>
  <div class="orders-dashboard">
    <h1 class="dashboard-title">Обзор Заказов</h1>
    <div class="orders-content">
      <div class="table-header">
        <div class="header-cell">ID</div>
        <div class="header-cell">Дата</div>
        <div class="header-cell">Клиент</div>
        <div class="header-cell">Продукт</div>
        <div class="header-cell">Цена</div>
        <div class="header-cell">Категория</div>
      </div>
      <div class="table-body">
        <div class="order-row" v-for="order in orders" :key="order.order_id">
          <div class="order-cell">{{ order.order_id }}</div>
          <div class="order-cell">{{ order.order_date }}</div>
          <div class="order-cell">{{ order.client.client_name }}</div>
          <div class="order-cell">{{ order.product.product_name }}</div>
          <div class="order-cell">{{ order.product.product_price }}</div>
          <div class="order-cell">{{ order.product.category.category_name }}</div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      orders: [],
    };
  },
  created() {
    this.fetchOrders();
  },
  methods: {
    async fetchOrders() {
      try {
        const response = await this.$http.get('/order/orders');
        this.orders = response.data.orders;
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    },
  },
};
</script>

<style scoped>
.orders-dashboard {
  max-width: 1000px;
  margin: auto;
  padding: 40px;
  background: #eceff1;
  border-radius: 25px;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
  text-align: center;
}

.dashboard-title {
  color: #1a237e;
  font-size: 30px;
  margin-bottom: 35px;
}

.orders-content {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  text-align: center;
  overflow-x: auto;
}

.table-header, .order-row {
  display: contents;
}

.header-cell, .order-cell {
  padding: 15px;
  border: 1px solid #b0bec5;
}

.table-header .header-cell {
  background-color: #3949ab;
  color: white;
  font-weight: bold;
}

.table-body .order-cell {
  background-color: #f5f5f5;
}

@media screen and (max-width: 768px) {
  .orders-content {
    grid-template-columns: repeat(3, 1fr);
  }

  .header-cell, .order-cell {
    padding: 10px;
  }
}
</style>
