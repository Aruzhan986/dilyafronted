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

<style>
.orders-dashboard {
  max-width: 1100px; 
  margin: 50px auto;
  padding: 50px; 
  background: linear-gradient(145deg, #81d4fa, #4fc3f7); 
  border-radius: 30px; 
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2); 
  text-align: center;
  color: #fff; 
}

.dashboard-title {
  font-size: 32px; 
  margin-bottom: 40px; 
}

.orders-content {
  display: grid;
  grid-template-columns: repeat(6, minmax(120px, 1fr)); 
  text-align: center;
  overflow-x: auto;
}

.table-header, .order-row {
  display: contents;
}

.header-cell, .order-cell {
  padding: 18px; 
  border: 2px solid #fff; 
}

.table-header .header-cell {
  background-color: #0288d1; 
  font-weight: 600; 
}

.table-body .order-cell {
  background-color: rgba(255, 255, 255, 0.8); 
}

@media screen and (max-width: 768px) {
  .orders-content {
    grid-template-columns: repeat(3, 1fr); 
  }

  .header-cell, .order-cell {
    padding: 12px;
  }
}
</style>
