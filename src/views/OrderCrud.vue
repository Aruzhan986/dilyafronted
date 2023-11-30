<template>
  <div class="orders-dashboard">
    <h1 class="dashboard-title">Заказы</h1>
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

<style>
.orders-dashboard {
  max-width: 1100px;
  margin: 50px auto;
  padding: 40px;
  background: #f5f5f5;
  border-radius: 20px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  text-align: center;
  color: #333;
}

.dashboard-title {
  font-size: 28px;
  margin-bottom: 30px;
}

.orders-content {
  display: grid;
  grid-template-columns: repeat(6, minmax(100px, 1fr));
  text-align: center;
  overflow-x: auto;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
}

.header-cell,
.order-cell {
  padding: 16px;
  border: 2px solid transparent;
  font-weight: bold;
}

.table-header .header-cell {
  background-color: #78909c;
  color: #fff;
  border-bottom: 2px solid #455a64;
}

.table-body .order-cell {
  background-color: #eceff1;
}

.order-row:nth-child(even) .order-cell {
  background-color: #cfd8dc;
}

@media screen and (max-width: 768px) {
  .orders-content {
    grid-template-columns: repeat(3, 1fr);
  }

  .header-cell,
  .order-cell {
    padding: 12px;
  }
}
</style>
