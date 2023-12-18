<template>
    <div class="purchase-management-interface">
      <h1>Управление заказами</h1>

      <div class="purchase-form">
        <input type="number" v-model="selectedPurchase.item_id" placeholder="ID товара" class="input-field">
        <input type="number" v-model="selectedPurchase.customer_id" placeholder="ID клиента" class="input-field">
        <input type="date" v-model="selectedPurchase.purchase_date" placeholder="Дата покупки" class="input-field">
        <button @click="selectedPurchase.purchase_id ? updatePurchase() : addPurchase()" class="submit-btn">
          {{ selectedPurchase.purchase_id ? 'Обновить заказ' : 'Добавить заказ' }}
        </button>
      </div>

      <div class="purchases-display">
        <div v-for="purchase in purchases" :key="purchase.purchase_id" class="purchase-card">
          <div class="card-details">
            <h3>Заказ №{{ purchase.purchase_id }}</h3>
            <p>Товар: {{ purchase.item_id }} - Клиент: {{ purchase.customer_id }}</p>
            <p>Дата покупки: {{ purchase.purchase_date }}</p>
          </div>
          <div class="card-actions">
            <button @click="editPurchase(purchase)" class="edit-purchase-btn">Редактировать</button>
            <button @click="deletePurchase(purchase.purchase_id)" class="delete-purchase-btn">Удалить</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        purchases: [],
        selectedPurchase: {
          purchase_id: null,
          item_id: null,
          customer_id: null,
          purchase_date: ''
        }
      };
    },
    created() {
      this.fetchPurchases();
    },
    methods: {
      async fetchPurchases() {
        try {
          const response = await this.$http.get('/purchase');
          this.purchases = response.data;
        } catch (error) {
          console.error('Error fetching purchases:', error);
        }
      },
      convertDateToISO(dateStr) {
      const parts = dateStr.split(".");
      return `${parts[2]}-${parts[1]}-${parts[0]}`;
    },

    async addPurchase() {
  const formData = new FormData();
  formData.append('item_id', this.selectedPurchase.item_id);
  formData.append('customer_id', this.selectedPurchase.customer_id);
  formData.append('purchase_date', '2023-12-18 00:00:00');

      try {
        await this.$http.post('/purchase', formData);
        this.fetchPurchases();
        this.resetSelectedPurchase();
      } catch (error) {
        console.error('Error adding purchase:', error);
      }
    },

    async updatePurchase() {
      const formData = new FormData();
      formData.append('item_id', this.selectedPurchase.item_id);
      formData.append('customer_id', this.selectedPurchase.customer_id);
      formData.append('purchase_date', this.convertDateToISO(this.selectedPurchase.purchase_date));

      try {
        await this.$http.put(`/purchase/${this.selectedPurchase.purchase_id}`, formData);
        this.fetchPurchases();
        this.resetSelectedPurchase();
      } catch (error) {
        console.error('Error updating purchase:', error);
      }
    },
      async deletePurchase(id) {
        try {
          await this.$http.delete(`/purchase/${id}`);
          this.fetchPurchases();
        } catch (error) {
          console.error('Error deleting purchase:', error);
        }
      },
      editPurchase(purchase) {
        this.selectedPurchase = { ...purchase };
      },
      resetSelectedPurchase() {
        this.selectedPurchase = { purchase_id: null, item_id: null, customer_id: null, purchase_date: '' };
      }
    }
  };
  </script>
  
  <style scoped>
  .purchase-management-interface {
    max-width: 800px;
    margin: auto;
    padding: 40px;
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    text-align: center;
    color: #333;
  }
  
  .purchase-form {
    display: flex;
    flex-direction: column;
    gap: 15px;
    margin-bottom: 20px;
  }
  
  .input-field {
    width: 100%;
    padding: 12px;
    border: 1px solid #ddd;
    border-radius: 5px;
    background-color: #f8f8f8;
    color: #333;
  }
  
  .submit-btn {
    padding: 10px 20px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .submit-btn:hover {
    background-color: #0056b3;
  }
  
  .purchases-display {
    margin-top: 20px;
  }
  
  .purchase-card {
    background-color: #f2f2f2;
    padding: 15px;
    border-radius: 5px;
    margin-bottom: 10px;
  }
  
  .card-details {
    margin-bottom: 10px;
  }
  
  .card-actions {
    display: flex;
    justify-content: space-around;
  }
  
  .edit-purchase-btn, .delete-purchase-btn {
    padding: 5px 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .edit-purchase-btn {
    background-color: #ffc107;
    color: #333;
  }
  
  .delete-purchase-btn {
    background-color: #dc3545;
    color: #fff;
  }
  </style>
  