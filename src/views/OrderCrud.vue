<template>
  <div class="order-overview-container">
    <h1 class="order-overview-title">Orders Overview</h1>
    <div class="responsive-table">
      <div class="table-header">
        <div class="header-item">ID</div>
        <div class="header-item">Date</div>
        <div class="header-item">Client</div>
        <div class="header-item">Product</div>
        <div class="header-item">Price</div>
        <div class="header-item">Category</div>
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

<style>
.order-overview-container {
  max-width: 1000px;
  margin: auto;
  padding: 20px;
  background: #e3f2fd;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.order-overview-title {
  color: #1e88e5;
  text-align: center;
  font-size: 24px;
  margin-bottom: 30px;
}

.responsive-table {
  display: block;
  overflow-x: auto;
}

.table-header, .table-row {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  text-align: center;
}

.header-item, .row-item {
  padding: 10px;
  border: 1px solid #90caf9;
}

.table-header .header-item {
  background-color: #42a5f5;
  color: white;
  font-weight: bold;
}

.table-body .table-row:nth-child(odd) {
  background-color: #e3f2fd;
}

@media screen and (max-width: 768px) {
  .table-header, .table-row {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>

