<template>
  <div class="orders-overview">
    <h1 class="overview-title">Обзор Заказов</h1>
    <div class="orders-table">
      <div class="table-row table-header">
        <div class="header-cell">ID</div>
        <div class="header-cell">Дата</div>
        <div class="header-cell">Клиент</div>
        <div class="header-cell">Продукт</div>
        <div class="header-cell">Цена</div>
        <div class="header-cell">Категория</div>
      </div>
      <div class="table-row" v-for="order in orders" :key="order.order_id">
        <div class="cell">{{ order.order_id }}</div>
        <div class="cell">{{ order.order_date }}</div>
        <div class="cell">{{ order.client.client_name }}</div>
        <div class="cell">{{ order.product.product_name }}</div>
        <div class="cell">{{ order.product.product_price }}</div>
        <div class="cell">{{ order.product.category.category_name }}</div>
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

<style>
.orders-overview {
  max-width: 1000px;
  margin: auto;
  padding: 20px;
  background: #fff;
  border-radius: 15px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
}

.overview-title {
  text-align: center;
  color: #2c3e50;
  font-size: 24px;
  margin-bottom: 30px;
}

.orders-table {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  text-align: center;
}

.table-row {
  display: contents;
}

.header-cell, .cell {
  padding: 10px;
  border: 1px solid #e0e0e0;
}

.table-header {
  background-color: #1976d2;
  color: white;
}

.cell {
  background-color: #f5f5f5;
}

@media screen and (max-width: 768px) {
  .orders-table {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>

