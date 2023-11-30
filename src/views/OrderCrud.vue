<template>
  <div class="order-overview-container">
    <h1 class="overview-heading">Обзор Заказов</h1>
    <div class="order-table">
      <div class="table-header">
        <div class="header-item">ID</div>
        <div class="header-item">Дата</div>
        <div class="header-item">Клиент</div>
        <div class="header-item">Продукт</div>
        <div class="header-item">Цена</div>
        <div class="header-item">Категория</div>
      </div>
      <div class="table-body">
        <div class="table-row" v-for="order in orders" :key="order.order_id">
          <div class="row-item">{{ order.order_id }}</div>
          <div class="row-item">{{ order.order_date }}</div>
          <div class="row-item">{{ order.client.client_name }}</div>
          <div class="row-item">{{ order.product.product_name }}</div>
          <div class="row-item">{{ order.product.product_price }}</div>
          <div class="row-item">{{ order.product.category.category_name }}</div>
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
.order-overview-container {
  max-width: 1000px;
  margin: 40px auto;
  padding: 30px;
  background-color: #ffffff;
  border-radius: 20px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.overview-heading {
  color: #2e3c48;
  font-size: 28px;
  margin-bottom: 30px;
}

.order-table {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  text-align: center;
  overflow-x: auto;
}

.table-header, .table-row {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
}

.header-item, .row-item {
  padding: 15px;
  border: 1px solid #e0e0e0;
}

.table-header .header-item {
  background-color: #5c6bc0;
  color: white;
  font-weight: bold;
}

.table-body .row-item {
  background-color: #f8f9fa;
}

@media screen and (max-width: 768px) {
  .order-table {
    grid-template-columns: repeat(3, 1fr);
  }
  .header-item, .row-item {
    padding: 10px;
  }
}
</style>
