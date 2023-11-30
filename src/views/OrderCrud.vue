<template>
  <div class="orders-container">
    <h1>Orders Overview</h1>
    <div class="table-container">
      <table class="order-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Date</th>
            <th>Client</th>
            <th>Product</th>
            <th>Price</th>
            <th>Category</th>
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
  .orders-container {
  max-width: 1000px;
  margin: auto;
  padding: 20px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.table-container {
  overflow-x: auto; 
}

.order-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.order-table th,
.order-table td {
  border: 1px solid #dddddd;
  padding: 15px;
  text-align: left;
  font-size: 14px;
}

.order-table th {
  background-color: #4CAF50;
  color: white;
  font-size: 16px;
}

.order-table tbody tr:nth-child(odd) {
  background-color: #f2f2f2;
}


@media screen and (max-width: 600px) {
  .order-table th, 
  .order-table td {
    display: block;
    width: 100%;
  }

  .order-table th {
    text-align: right;
    padding-left: 50%;
  }

  .order-table td {
    text-align: right;
    padding-left: 50%;
    padding-top: 20px;
    border-top: 1px solid #ddd;
  }

  .order-table td:first-child {
    border-top: none;
  }
}

</style>
